import { readFile } from "node:fs/promises"
import test, { after, before } from "node:test"

import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from "@firebase/rules-unit-testing"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore"

const projectId = "demo-jlpt-pass-n3-n2"
let environment
let allowed = 0
let denied = 0

const profiles = {
  learnerA: { uid: "learner-a", role: "learner", companyCode: "COMPANY-A", accountType: "company", companyName: "A社", billing: { accountType: "company" }, createdAt: "seed" },
  learnerB: { uid: "learner-b", role: "learner", companyCode: "COMPANY-B", accountType: "company", companyName: "B社", billing: { accountType: "company" }, createdAt: "seed" },
  personal: { uid: "personal", role: "user", companyCode: null, accountType: "personal", companyName: null, billing: { accountType: "personal", status: "trialing" }, createdAt: "seed" },
  companyAdminA: { uid: "company-admin-a", role: "company_admin", companyCode: "COMPANY-A", accountType: "company", companyName: "A社", billing: { accountType: "company" }, createdAt: "seed" },
  companyAdminB: { uid: "company-admin-b", role: "company_admin", companyCode: "COMPANY-B", accountType: "company", companyName: "B社", billing: { accountType: "company" }, createdAt: "seed" },
  admin: { uid: "admin", role: "admin", companyCode: null, accountType: "personal", companyName: null, billing: { accountType: "personal" }, createdAt: "seed" },
}

function dbFor(uid) {
  return environment.authenticatedContext(uid).firestore()
}

async function permit(operation) {
  await assertSucceeds(operation)
  allowed += 1
}

async function reject(operation) {
  await assertFails(operation)
  denied += 1
}

before(async () => {
  environment = await initializeTestEnvironment({
    projectId,
    firestore: { rules: await readFile("firestore.rules", "utf8") },
  })
  await environment.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore()
    await Promise.all([
      setDoc(doc(db, "companies", "COMPANY-A"), { name: "A社", inviteEnabled: true }),
      setDoc(doc(db, "companies", "COMPANY-B"), { name: "B社", inviteEnabled: true }),
      setDoc(doc(db, "companies", "INACTIVE"), { name: "停止企業", inviteEnabled: false }),
      ...Object.values(profiles).map((profile) => setDoc(doc(db, "users", profile.uid), profile)),
      setDoc(doc(db, "users", "learner-a", "results", "exam-1"), { quizType: "japanese-n3", score: 8, total: 10, createdAt: "2026-07-26T00:00:00Z" }),
      setDoc(doc(db, "users", "learner-a", "progress", "japanese-n3"), { quizType: "japanese-n3", totalSessions: 2, updatedAt: "2026-07-26T00:00:00Z" }),
      setDoc(doc(db, "users", "learner-b", "results", "exam-1"), { quizType: "japanese-n2", score: 7, total: 10, createdAt: "2026-07-26T00:00:00Z" }),
      setDoc(doc(db, "users", "learner-b", "progress", "japanese-n2"), { quizType: "japanese-n2", totalSessions: 1, updatedAt: "2026-07-26T00:00:00Z" }),
    ])
  })
})

after(async () => {
  console.log(`RULES_SUMMARY allowed=${allowed} denied=${denied} total=${allowed + denied}`)
  await environment.cleanup()
})

test("未認証ユーザーはusersを取得できない", async () => {
  await reject(getDoc(doc(environment.unauthenticatedContext().firestore(), "users", "learner-a")))
})

test("本人は自分のusersを取得できる", async () => {
  await permit(getDoc(doc(dbFor("learner-a"), "users", "learner-a")))
})

test("本人は他人のusersを取得できない", async () => {
  await reject(getDoc(doc(dbFor("learner-a"), "users", "learner-b")))
})

test("同一企業company_adminは学習者を取得できる", async () => {
  await permit(getDoc(doc(dbFor("company-admin-a"), "users", "learner-a")))
})

test("別企業company_adminは学習者を取得できない", async () => {
  await reject(getDoc(doc(dbFor("company-admin-a"), "users", "learner-b")))
})

test("company_adminは自社where付きusers queryを実行できる", async () => {
  const db = dbFor("company-admin-a")
  await permit(getDocs(query(collection(db, "users"), where("companyCode", "==", "COMPANY-A"))))
})

test("company_adminは別企業where付きusers queryを実行できない", async () => {
  const db = dbFor("company-admin-a")
  await reject(getDocs(query(collection(db, "users"), where("companyCode", "==", "COMPANY-B"))))
})

test("company_adminはwhereなしusers listを実行できない", async () => {
  await reject(getDocs(collection(dbFor("company-admin-a"), "users")))
})

test("adminはusers listを実行できる", async () => {
  await permit(getDocs(collection(dbFor("admin"), "users")))
})

test("本人はresultsを読み書きできる", async () => {
  const db = dbFor("learner-a")
  await permit(getDocs(collection(db, "users", "learner-a", "results")))
  await permit(setDoc(doc(db, "users", "learner-a", "results", "exam-owner"), { quizType: "japanese-n3", score: 9, total: 10, createdAt: "2026-07-27T00:00:00Z" }))
})

test("同一企業company_adminはresultsを読める", async () => {
  await permit(getDocs(collection(dbFor("company-admin-a"), "users", "learner-a", "results")))
})

test("別企業company_adminはresultsを読めない", async () => {
  await reject(getDocs(collection(dbFor("company-admin-a"), "users", "learner-b", "results")))
})

test("本人はprogressを読み書きできる", async () => {
  const db = dbFor("learner-a")
  await permit(getDocs(collection(db, "users", "learner-a", "progress")))
  await permit(setDoc(doc(db, "users", "learner-a", "progress", "japanese-n2"), { quizType: "japanese-n2", totalSessions: 1, updatedAt: "2026-07-27T00:00:00Z" }))
})

test("同一企業company_adminはprogressを読める", async () => {
  await permit(getDocs(collection(dbFor("company-admin-a"), "users", "learner-a", "progress")))
})

test("別企業company_adminはprogressを読めない", async () => {
  await reject(getDocs(collection(dbFor("company-admin-a"), "users", "learner-b", "progress")))
})

for (const [label, patch] of [
  ["role", { role: "admin" }],
  ["companyCode", { companyCode: "COMPANY-B" }],
  ["companyId", { companyId: "other" }],
  ["companyName", { companyName: "改ざん企業" }],
  ["accountType", { accountType: "personal" }],
  ["billing", { billing: { accountType: "personal", status: "active" } }],
  ["uid", { uid: "other" }],
  ["createdAt", { createdAt: "changed" }],
]) {
  test(`本人による保護フィールド${label}変更を拒否する`, async () => {
    await reject(updateDoc(doc(dbFor("learner-a"), "users", "learner-a"), patch))
  })
}

test("本人は通常フィールドを更新できる", async () => {
  await permit(updateDoc(doc(dbFor("learner-a"), "users", "learner-a"), { displayName: "学習者A" }))
})

test("認証済みユーザーは有効企業をgetできる", async () => {
  await permit(getDoc(doc(dbFor("personal"), "companies", "COMPANY-A")))
})

test("認証済みユーザーは無効企業をgetできない", async () => {
  await reject(getDoc(doc(dbFor("personal"), "companies", "INACTIVE")))
})

test("一般ユーザーはcompanies listを実行できない", async () => {
  await reject(getDocs(collection(dbFor("personal"), "companies")))
})

test("company_adminはcompanies listを実行できない", async () => {
  await reject(getDocs(collection(dbFor("company-admin-a"), "companies")))
})

test("adminはcompanies listを実行できる", async () => {
  await permit(getDocs(collection(dbFor("admin"), "companies")))
})

test("個人ユーザー登録用users createを許可する", async () => {
  const db = dbFor("new-personal")
  await permit(setDoc(doc(db, "users", "new-personal"), { uid: "new-personal", role: "user", companyCode: null, accountType: "personal", billing: { accountType: "personal", status: "trialing" }, createdAt: "new" }))
})

test("有効企業コードでのusers createを許可する", async () => {
  const db = dbFor("new-company")
  await permit(setDoc(doc(db, "users", "new-company"), { uid: "new-company", role: "user", companyCode: "COMPANY-A", companyName: "A社", accountType: "company", billing: { accountType: "company", status: "active" }, createdAt: "new" }))
})

test("無効企業コードでのusers createを拒否する", async () => {
  const db = dbFor("new-inactive")
  await reject(setDoc(doc(db, "users", "new-inactive"), { uid: "new-inactive", role: "user", companyCode: "INACTIVE", companyName: "停止企業", accountType: "company", billing: { accountType: "company", status: "active" }, createdAt: "new" }))
})

test("存在しない企業コードでのusers createを拒否する", async () => {
  const db = dbFor("new-missing")
  await reject(setDoc(doc(db, "users", "new-missing"), { uid: "new-missing", role: "user", companyCode: "MISSING", companyName: "不存在", accountType: "company", billing: { accountType: "company", status: "active" }, createdAt: "new" }))
})
