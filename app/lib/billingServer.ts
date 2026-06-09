import { adminDb } from "@/app/lib/firebaseAdmin"
import { buildEntitledQuizTypes } from "@/app/lib/plan"
import type { QuizType } from "@/app/data/types"

export type BillingStatus = "trialing" | "pending" | "active" | "past_due" | "canceled" | "expired"
export type BillingMethod = "komoju_card" | "komoju_konbini" | "company_code" | "manual"
export type PlanId = "trial" | "paid" | "company"

export type BillingPatch = Partial<{
  accountType: "personal" | "company"
  method: BillingMethod
  status: BillingStatus
  currentPlan: PlanId
  currentPeriodEnd: any
  komojuSessionId: string | null
  komojuPaymentId: string | null
  updatedAt: any
  aiConversationEnabled: boolean
  aiSpeakingEnabled: boolean
}>

export async function patchUserBilling(uid: string, patch: BillingPatch) {
  const ref = adminDb().collection("users").doc(uid)
  const snap = await ref.get()
  const current = snap.exists ? (snap.data() as any) : {}
  await ref.set({ billing: { ...(current.billing ?? {}), ...patch }, updatedAt: new Date() }, { merge: true })
}

export async function setUserBillingMerge(uid: string, patch: BillingPatch) {
  const plan = patch.accountType === "company" ? "company" : patch.currentPlan ?? "paid"
  const selectedQuizTypes = buildEntitledQuizTypes(plan) as QuizType[]
  await adminDb().collection("users").doc(uid).set({
    plan,
    selectedQuizTypes,
    billing: patch,
    updatedAt: new Date(),
  }, { merge: true })
}

export async function setUserIndustryMerge(uid: string, industry: string) {
  await adminDb().collection("users").doc(uid).set({ industry, updatedAt: new Date() }, { merge: true })
}
