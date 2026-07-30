export type CompanyAccountLike = {
  accountType?: unknown
  plan?: unknown
  companyCode?: unknown
  billing?: {
    accountType?: unknown
    method?: unknown
  } | null
}

export function isCompanyAccount(userData?: CompanyAccountLike | null): boolean {
  if (!userData) return false
  const companyCode =
    typeof userData.companyCode === "string" ? userData.companyCode.trim() : ""
  return (
    userData.accountType === "company" ||
    userData.plan === "company" ||
    companyCode.length > 0 ||
    userData.billing?.accountType === "company" ||
    userData.billing?.method === "company_contract"
  )
}

export function buildCompanyBilling(aiEnabled: boolean) {
  return {
    accountType: "company" as const,
    method: "company_contract" as const,
    status: "active" as const,
    currentPlan: "company" as const,
    currentPeriodEnd: null,
    aiConversationEnabled: aiEnabled,
    aiSpeakingEnabled: aiEnabled,
  }
}

export class CompanyPurchaseForbiddenError extends Error {
  constructor() {
    super("企業契約ユーザーは個人向けプランを購入できません")
    this.name = "CompanyPurchaseForbiddenError"
  }
}

export async function runForPersonalAccount<T>(
  userData: CompanyAccountLike | null | undefined,
  operation: () => Promise<T>,
): Promise<T> {
  if (isCompanyAccount(userData)) throw new CompanyPurchaseForbiddenError()
  return operation()
}
