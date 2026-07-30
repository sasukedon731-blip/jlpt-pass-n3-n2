import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

import {
  buildCompanyBilling,
  CompanyPurchaseForbiddenError,
  isCompanyAccount,
  runForPersonalAccount,
} from "../app/lib/companyAccount"

test("top-level accountType companyを企業契約と判定する", () => {
  assert.equal(isCompanyAccount({ accountType: "company" }), true)
})

test("top-level plan companyを企業契約と判定する", () => {
  assert.equal(isCompanyAccount({ plan: "company" }), true)
})

test("有効なcompanyCodeを持つユーザーを企業契約と判定する", () => {
  assert.equal(isCompanyAccount({ companyCode: "OUTIN001" }), true)
  assert.equal(isCompanyAccount({ companyCode: "   " }), false)
})

test("billing.accountType companyを企業契約と判定する", () => {
  assert.equal(isCompanyAccount({ billing: { accountType: "company" } }), true)
})

test("billing.method company_contractを企業契約と判定する", () => {
  assert.equal(isCompanyAccount({ billing: { method: "company_contract" } }), true)
})

test("企業ユーザーではSession・注文・billing更新処理を開始しない", async () => {
  const sideEffects = { session: 0, order: 0, billing: 0 }
  await assert.rejects(
    () =>
      runForPersonalAccount(
        { accountType: "company", plan: "company", companyCode: "OUTIN001" },
        async () => {
          sideEffects.session += 1
          sideEffects.order += 1
          sideEffects.billing += 1
        },
      ),
    CompanyPurchaseForbiddenError,
  )
  assert.deepEqual(sideEffects, { session: 0, order: 0, billing: 0 })
})

test("個人ユーザーは従来どおりcheckout処理へ進める", async () => {
  let called = 0
  const result = await runForPersonalAccount(
    {
      accountType: "personal",
      plan: "trial",
      companyCode: null,
      billing: { accountType: "personal", method: "manual" },
    },
    async () => {
      called += 1
      return "checkout-created"
    },
  )
  assert.equal(result, "checkout-created")
  assert.equal(called, 1)
})

test("企業登録用billingはcompany_contract・activeで個人期限を持たない", () => {
  assert.deepEqual(buildCompanyBilling(true), {
    accountType: "company",
    method: "company_contract",
    status: "active",
    currentPlan: "company",
    currentPeriodEnd: null,
    aiConversationEnabled: true,
    aiSpeakingEnabled: true,
  })
})

test("checkout routeの企業判定はKOMOJU Session作成・billing更新より前にある", async () => {
  const source = await readFile("app/api/komoju/checkout/route.ts", "utf8")
  const guard = source.indexOf("if (isCompanyAccount(userSnapshot.data()))")
  const session = source.indexOf('fetch("https://komoju.com/api/v1/sessions"')
  const billingWrite = source.indexOf("await userRef.set(")
  assert.ok(guard >= 0)
  assert.ok(session > guard)
  assert.ok(billingWrite > guard)
})

test("Webhookの企業判定はbilling更新より前にある", async () => {
  const source = await readFile("app/api/komoju/webhook/route.ts", "utf8")
  const guard = source.indexOf("isCompanyAccount(userSnapshot.data())")
  const billingWrite = source.indexOf("await userRef.set(")
  assert.ok(guard >= 0)
  assert.ok(billingWrite > guard)
})

test("登録処理は共通の企業billing生成関数を使用する", async () => {
  const register = await readFile("app/(public)/register/page.tsx", "utf8")
  assert.match(register, /billing:\s*companyData\s*\?\s*buildCompanyBilling\(true\)/)
})
