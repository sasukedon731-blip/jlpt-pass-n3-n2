export const CHECKOUT_PLANS = ["standard", "standard_ai"] as const
export const CHECKOUT_DAYS = [30, 90, 180] as const

export type CheckoutPlan = (typeof CHECKOUT_PLANS)[number]
export type CheckoutDays = (typeof CHECKOUT_DAYS)[number]

export type CheckoutSelection = {
  plan: CheckoutPlan
  days: CheckoutDays
  months: 1 | 3 | 6
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
    typeof input.days !== "number" ||
    !Number.isInteger(input.days) ||
    !CHECKOUT_DAYS.includes(input.days as CheckoutDays)
  ) {
    return null
  }

  const plan = input.plan as CheckoutPlan
  const days = input.days as CheckoutDays
  const months = (days / 30) as 1 | 3 | 6
  const aiAddon = plan === "standard_ai"
  const amount = (BASE_PRICE_YEN + (aiAddon ? AI_ADDON_PRICE_YEN : 0)) * months

  return { plan, days, months, aiAddon, amount }
}
