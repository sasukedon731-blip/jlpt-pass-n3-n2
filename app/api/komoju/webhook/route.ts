import { NextRequest, NextResponse } from "next/server"
import { Timestamp } from "firebase-admin/firestore"
import { adminDb } from "@/app/lib/firebaseAdmin"

export const runtime = "nodejs"

function addDays(days: number) {
  return Timestamp.fromDate(new Date(Date.now() + days * 24 * 60 * 60 * 1000))
}

export async function POST(req: NextRequest) {
  try {
    const event = await req.json()
    const type = event?.type ?? event?.event
    const object = event?.data?.object ?? event?.object ?? event?.data
    const uid = object?.metadata?.uid

    if (!uid) return NextResponse.json({ ok: true, skipped: "no uid" })

    const paid = type === "payment.captured" || type === "payment.succeeded" || type === "session.completed" || object?.status === "captured" || object?.status === "completed"
    if (!paid) return NextResponse.json({ ok: true, ignored: type ?? object?.status ?? "unknown" })

    await adminDb().collection("users").doc(uid).set({
      plan: "paid",
      billing: {
        accountType: "personal",
        status: "active",
        currentPlan: "paid",
        currentPeriodEnd: addDays(30),
        komojuPaymentId: object?.id ?? null,
        aiConversationEnabled: true,
        aiSpeakingEnabled: true,
      },
      updatedAt: Timestamp.now(),
    }, { merge: true })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "webhook failed" }, { status: 500 })
  }
}
