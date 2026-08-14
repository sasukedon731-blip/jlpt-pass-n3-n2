export const CHECKOUT_PLANS = ["standard", "standard_ai"] as const
export const CHECKOUT_MONTHS = [1, 3, 6] as const

export type CheckoutPlan = (typeof CHECKOUT_PLANS)[number]
export type CheckoutMonths = (typeof CHECKOUT_MONTHS)[number]

export type CheckoutSelection = {
  plan: CheckoutPlan
  months: CheckoutMonths
  aiAddon: boolean
  amount: number
}

const BASE_PRICE_YEN = 500
const AI_ADDON_PRICE_YEN = 500

export function parseCheckoutSelection(value: unknown): CheckoutSelection | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null

  const input = value as Record<string, unknown>
  if (!CHECKOUT_PLANS.includes(input.plan as CheckoutPlan)) return null
  if (
    typeof input.months !== "number" ||
    !Number.isInteger(input.months) ||
    !CHECKOUT_MONTHS.includes(input.months as CheckoutMonths)
  ) {
    return null
  }

  const plan = input.plan as CheckoutPlan
  const months = input.months as CheckoutMonths
  const aiAddon = plan === "standard_ai"
  const amount = (BASE_PRICE_YEN + (aiAddon ? AI_ADDON_PRICE_YEN : 0)) * months

  return { plan, months, aiAddon, amount }
}
