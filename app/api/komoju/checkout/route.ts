import { NextRequest, NextResponse } from "next/server"
import { getAuth } from "firebase-admin/auth"
import { Timestamp } from "firebase-admin/firestore"
import { adminDb } from "@/app/lib/firebaseAdmin"

export const runtime = "nodejs"

const PRICE_YEN = 980

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const idToken = body?.idToken
    const method = body?.method === "konbini" ? "konbini" : "credit_card"
    if (!idToken) return NextResponse.json({ error: "ログイン情報がありません" }, { status: 401 })

    const decoded = await getAuth().verifyIdToken(idToken)
    const uid = decoded.uid
    const origin = req.nextUrl.origin
    const secret = process.env.KOMOJU_SECRET_KEY
    if (!secret) return NextResponse.json({ error: "KOMOJU_SECRET_KEY が未設定です" }, { status: 500 })

    const payload = {
      amount: PRICE_YEN,
      currency: "JPY",
      payment_types: [method],
      return_url: `${origin}/plans?checkout=success`,
      cancel_url: `${origin}/plans?checkout=cancel`,
      external_order_num: `jlpt-n3-n2-${uid}-${Date.now()}`,
      metadata: {
        uid,
        app: "JLPT PASS N3・N2",
        plan: "paid",
      },
      line_items: [
        {
          name: "JLPT PASS N3・N2 Japanese Study App",
          amount: PRICE_YEN,
          quantity: 1,
        },
      ],
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

    await adminDb().collection("users").doc(uid).set({
      billing: {
        accountType: "personal",
        method: method === "konbini" ? "komoju_konbini" : "komoju_card",
        status: "pending",
        currentPlan: "paid",
        komojuSessionId: data?.id ?? null,
        currentPeriodEnd: null,
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
