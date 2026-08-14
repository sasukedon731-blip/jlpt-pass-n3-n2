import assert from "node:assert/strict"
import test from "node:test"

import { parseCheckoutSelection } from "../app/lib/checkoutPricing"

const validCases = [
  { plan: "standard", days: 30, months: 1, amount: 500 },
  { plan: "standard", days: 90, months: 3, amount: 1500 },
  { plan: "standard", days: 180, months: 6, amount: 3000 },
  { plan: "standard_ai", days: 30, months: 1, amount: 1000 },
  { plan: "standard_ai", days: 90, months: 3, amount: 3000 },
  { plan: "standard_ai", days: 180, months: 6, amount: 6000 },
] as const

for (const expected of validCases) {
  test(`${expected.plan} ${expected.days}日の金額は${expected.amount}円`, () => {
    const result = parseCheckoutSelection(expected)
    assert.equal(result?.amount, expected.amount)
    assert.equal(result?.plan, expected.plan)
    assert.equal(result?.days, expected.days)
    assert.equal(result?.months, expected.months)
  })
}

const invalidPlans: unknown[] = [undefined, null, "", "paid", "STANDARD", 0, [], {}]
for (const plan of invalidPlans) {
  test(`不正なplan ${JSON.stringify(plan)}を拒否する`, () => {
    assert.equal(parseCheckoutSelection({ plan, days: 30 }), null)
  })
}

const invalidDays: unknown[] = [undefined, null, 0, -1, 1, 1.5, 29, 31, 365, "30", [], {}]
for (const days of invalidDays) {
  test(`不正なdays ${JSON.stringify(days)}を拒否する`, () => {
    assert.equal(parseCheckoutSelection({ plan: "standard", days }), null)
  })
}

test("利用者が送ったamountを信用せず料金表から決定する", () => {
  assert.equal(parseCheckoutSelection({ plan: "standard_ai", days: 180, amount: 1 })?.amount, 6000)
})

test("配列やnullなど不正なbodyを拒否する", () => {
  for (const body of [null, undefined, [], "", 1]) {
    assert.equal(parseCheckoutSelection(body), null)
  }
})
