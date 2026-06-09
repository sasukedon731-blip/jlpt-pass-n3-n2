export type BillingLike = Partial<{
  accountType: "personal" | "company"
  status: "trialing" | "pending" | "active" | "past_due" | "canceled" | "expired"
  currentPlan: "trial" | "paid" | "company"
  currentPeriodEnd: any
  trialEndAt: any
  method: "komoju_card" | "komoju_konbini" | "company_code" | "manual"
  aiConversationEnabled: boolean
  aiSpeakingEnabled: boolean
  aiConversationExpiresAt: any
  aiSpeakingExpiresAt: any
}>

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

export function isBillingActive(billing?: BillingLike | null) {
  if (!billing) return false
  if (billing.accountType === "company") return true
  if (billing.status === "trialing") {
    const end = toDate(billing.trialEndAt)
    return !!end && end.getTime() > Date.now()
  }
  if (billing.status !== "active") return false
  const end = toDate(billing.currentPeriodEnd)
  return !end || end.getTime() > Date.now()
}

export function canUseAiConversation(billing?: BillingLike | null) {
  if (!isBillingActive(billing)) return false
  return billing?.accountType === "company" || billing?.aiConversationEnabled === true
}

export function canUseAiSpeaking(billing?: BillingLike | null) {
  if (!isBillingActive(billing)) return false
  return billing?.accountType === "company" || billing?.aiSpeakingEnabled === true
}

export function getBillingDaysLeft(billing?: BillingLike | null) {
  const end = toDate(billing?.accountType === "company" ? null : billing?.currentPeriodEnd ?? billing?.trialEndAt)
  if (!end) return billing?.accountType === "company" ? 9999 : 0
  const diff = end.getTime() - Date.now()
  return diff <= 0 ? 0 : Math.ceil(diff / 86400000)
}

export function getAiConversationDaysLeft(billing?: BillingLike | null) {
  if (billing?.accountType === "company") return 9999
  return getBillingDaysLeft(billing)
}

export function getBillingEndDate(billing?: BillingLike | null) {
  return toDate(billing?.currentPeriodEnd ?? billing?.trialEndAt)
}

export function getAiConversationEndDate(billing?: BillingLike | null) {
  return toDate(billing?.aiConversationExpiresAt ?? billing?.currentPeriodEnd)
}

export function getBillingViewState(billing?: BillingLike | null) {
  if (!billing) return "none" as const
  if (billing.accountType === "company") return "active" as const
  if (billing.status === "pending") return "pending" as const
  if (billing.status === "past_due") return "past_due" as const
  if (billing.status === "canceled") return "canceled" as const
  if (isBillingActive(billing)) return "active" as const
  return "expired" as const
}

export function getPlanLabel(plan?: string | null) {
  switch (plan) {
    case "company": return "企業契約"
    case "paid": return "有料プラン"
    case "trial": return "1日無料体験"
    default: return "未契約"
  }
}

export function formatDateJP(date?: Date | null) {
  if (!date) return "-"
  return date.toLocaleDateString("ja-JP")
}
