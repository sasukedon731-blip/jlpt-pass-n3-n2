import assert from "node:assert/strict"
import test from "node:test"

import { parseCheckoutSelection } from "../app/lib/checkoutPricing"

const validCases = [
  { plan: "standard", months: 1, amount: 500 },
  { plan: "standard", months: 3, amount: 1500 },
  { plan: "standard", months: 6, amount: 3000 },
  { plan: "standard_ai", months: 1, amount: 1000 },
  { plan: "standard_ai", months: 3, amount: 3000 },
  { plan: "standard_ai", months: 6, amount: 6000 },
] as const

for (const expected of validCases) {
  test(`${expected.plan} ${expected.months}ヶ月の金額は${expected.amount}円`, () => {
    const result = parseCheckoutSelection(expected)
    assert.equal(result?.amount, expected.amount)
    assert.equal(result?.plan, expected.plan)
    assert.equal(result?.months, expected.months)
  })
}

const invalidPlans: unknown[] = [undefined, null, "", "paid", "STANDARD", 0, [], {}]
for (const plan of invalidPlans) {
  test(`不正なplan ${JSON.stringify(plan)}を拒否する`, () => {
    assert.equal(parseCheckoutSelection({ plan, months: 1 }), null)
  })
}

const invalidMonths: unknown[] = [undefined, null, 0, -1, 1.5, 29, 30, 31, 365, "1", [], {}]
for (const months of invalidMonths) {
  test(`不正なmonths ${JSON.stringify(months)}を拒否する`, () => {
    assert.equal(parseCheckoutSelection({ plan: "standard", months }), null)
  })
}

test("利用者が送ったamountを信用せず料金表から決定する", () => {
  assert.equal(parseCheckoutSelection({ plan: "standard_ai", months: 6, amount: 1 })?.amount, 6000)
})

test("配列やnullなど不正なbodyを拒否する", () => {
  for (const body of [null, undefined, [], "", 1]) {
    assert.equal(parseCheckoutSelection(body), null)
  }
})
