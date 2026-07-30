import { NextRequest, NextResponse } from "next/server"
import { adminAuth, adminDb } from "@/app/lib/firebaseAdmin"
import { Timestamp } from "firebase-admin/firestore"
import { isCompanyAccount } from "@/app/lib/companyAccount"

export const runtime = "nodejs"

const BASE_PRICE_YEN = 500
const AI_ADDON_PRICE_YEN = 500
const ALLOWED_MONTHS = [1, 3, 6] as const

type AllowedMonth = (typeof ALLOWED_MONTHS)[number]

function normalizeMonths(value: unknown): AllowedMonth {
  const n = Number(value)
  return ALLOWED_MONTHS.includes(n as AllowedMonth) ? (n as AllowedMonth) : 1
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const idToken = body?.idToken
    const method = body?.method === "konbini" ? "konbini" : "credit_card"
    const months = normalizeMonths(body?.months)
    const aiAddon = body?.aiAddon === true
    const amount = (BASE_PRICE_YEN + (aiAddon ? AI_ADDON_PRICE_YEN : 0)) * months

    if (!idToken) return NextResponse.json({ error: "ログイン情報がありません" }, { status: 401 })

    const decoded = await adminAuth().verifyIdToken(idToken)
    const uid = decoded.uid
    const firestore = adminDb()
    const userRef = firestore.collection("users").doc(uid)
    const userSnapshot = await userRef.get()
    if (!userSnapshot.exists) {
      return NextResponse.json({ error: "ユーザー情報が見つかりません" }, { status: 404 })
    }
    if (isCompanyAccount(userSnapshot.data())) {
      return NextResponse.json(
        { error: "企業契約ユーザーは個人向けプランを購入できません" },
        { status: 403 },
      )
    }

    const origin = req.nextUrl.origin
    const secret = process.env.KOMOJU_SECRET_KEY
    if (!secret) return NextResponse.json({ error: "KOMOJU_SECRET_KEY が未設定です" }, { status: 500 })

    const lineItems = [
      {
        name: `JLPT PASS N3・N2 基本プラン ${months}ヶ月`,
        amount: BASE_PRICE_YEN * months,
        quantity: 1,
      },
    ]

    if (aiAddon) {
      lineItems.push({
        name: `AI会話・AIスピーキング追加 ${months}ヶ月`,
        amount: AI_ADDON_PRICE_YEN * months,
        quantity: 1,
      })
    }

    const payload = {
      amount,
      currency: "JPY",
      payment_types: [method],
      return_url: `${origin}/plans?checkout=success`,
      cancel_url: `${origin}/plans?checkout=cancel`,
      external_order_num: `jlpt-n3-n2-${uid}-${Date.now()}`,
      metadata: {
        uid,
        app: "JLPT PASS N3・N2",
        plan: "paid",
        months: String(months),
        aiAddon: aiAddon ? "true" : "false",
      },
      line_items: lineItems,
    }

    const res = await fetch("https://komoju.com/api/v1/sessions", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${secret}:`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json()
    if (!res.ok) {
      console.error("KOMOJU checkout error", data)
      return NextResponse.json({ error: "KOMOJU決済ページの作成に失敗しました" }, { status: 500 })
    }

    await userRef.set({
      billing: {
        accountType: "personal",
        method: method === "konbini" ? "komoju_konbini" : "komoju_card",
        status: "pending",
        currentPlan: "paid",
        komojuSessionId: data?.id ?? null,
        currentPeriodEnd: null,
        purchasedMonths: months,
        aiAddonSelected: aiAddon,
        aiConversationEnabled: false,
        aiSpeakingEnabled: false,
      },
      updatedAt: Timestamp.now(),
    }, { merge: true })

    return NextResponse.json({ url: data?.url ?? data?.session_url })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "決済開始に失敗しました" }, { status: 500 })
  }
}
