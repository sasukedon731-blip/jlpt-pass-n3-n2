import { quizzes } from "@/app/data/quizzes"
import type { QuizType } from "@/app/data/types"

export type PlanId = "trial" | "paid" | "company"
export type BillingStatus = "trialing" | "pending" | "active" | "past_due" | "canceled" | "expired"
export type BillingMethod = "komoju_card" | "komoju_konbini" | "company_code" | "manual"
export type AccountType = "personal" | "company"

export const PERSONAL_PLAN_PRICE_YEN = 980
export const TRIAL_DAYS = 1

export function buildEntitledQuizTypes(_plan: PlanId): QuizType[] {
  return Object.keys(quizzes) as QuizType[]
}

export function normalizeSelectedForPlan(
  selected: QuizType[],
  entitled: QuizType[],
  _plan: PlanId
): QuizType[] {
  const uniq = Array.from(new Set(selected)).filter((q) => entitled.includes(q))
  return uniq.length ? uniq : entitled
}

function toDate(value: any): Date | null {
  if (!value) return null
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value
  if (typeof value?.toDate === "function") {
    const d = value.toDate()
    return d instanceof Date && !Number.isNaN(d.getTime()) ? d : null
  }
  if (typeof value?.seconds === "number") return new Date(value.seconds * 1000)
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? null : d
}

export function getBillingStatus(userDoc: any): BillingStatus {
  const s = userDoc?.billing?.status
  if (["trialing", "pending", "active", "past_due", "canceled", "expired"].includes(s)) return s
  return "expired"
}

export function getEffectivePlanId(userDoc: any): PlanId {
  const accountType = userDoc?.billing?.accountType ?? userDoc?.accountType
  if (accountType === "company") return "company"
  const p = userDoc?.billing?.currentPlan ?? userDoc?.plan
  if (p === "paid" || p === "company" || p === "trial") return p
  return "trial"
}

export function isAccessActive(userDoc: any): boolean {
  if (!userDoc) return false
  const billing = userDoc.billing ?? {}
  const accountType = billing.accountType ?? userDoc.accountType
  if (accountType === "company") return true

  const status = getBillingStatus(userDoc)
  if (status === "active") {
    const end = toDate(billing.currentPeriodEnd)
    return !end || end.getTime() > Date.now()
  }
  if (status === "trialing") {
    const end = toDate(billing.trialEndAt)
    return !!end && end.getTime() > Date.now()
  }
  return false
}

export function getAccessLabel(userDoc: any): string {
  const billing = userDoc?.billing ?? {}
  if ((billing.accountType ?? userDoc?.accountType) === "company") return "企業契約"
  const status = getBillingStatus(userDoc)
  if (status === "trialing") return "1日無料体験中"
  if (status === "active") return "有料プラン"
  if (status === "pending") return "支払い確認待ち"
  return "未契約"
}
