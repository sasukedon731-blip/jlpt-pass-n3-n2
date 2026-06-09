"use client"

import { db } from "@/app/lib/firebase"
import type { QuizType } from "@/app/data/types"
import {
  buildEntitledQuizTypes,
  normalizeSelectedForPlan,
  type PlanId,
} from "@/app/lib/plan"
import { Timestamp, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"

export type UserPlanState = {
  devUnlockAll?: boolean
  plan: PlanId
  entitledQuizTypes: QuizType[]
  selectedQuizTypes: QuizType[]
  nextChangeAllowedAt: Date | null
  displayName: string
  schemaVersion: number
}

function toDateOrNull(v: any): Date | null {
  if (!v) return null
  if (v instanceof Date) return v
  if (typeof v?.toDate === "function") return v.toDate()
  if (typeof v?.seconds === "number") return new Date(v.seconds * 1000)
  const d = new Date(v)
  return Number.isNaN(d.getTime()) ? null : d
}

function coercePlan(data: any): PlanId {
  const accountType = data?.billing?.accountType ?? data?.accountType
  if (accountType === "company") return "company"
  const p = data?.billing?.currentPlan ?? data?.plan
  if (p === "paid" || p === "company" || p === "trial") return p
  return "trial"
}

export async function loadUserPlanState(uid: string): Promise<UserPlanState> {
  const ref = doc(db, "users", uid)
  const snap = await getDoc(ref)
  const data = snap.exists() ? (snap.data() as any) : {}
  const devUnlockAll = data?.devUnlockAll === true
  const plan = devUnlockAll ? "paid" : coercePlan(data)
  const entitled = buildEntitledQuizTypes(plan)
  const rawSelected = Array.isArray(data?.selectedQuizTypes) ? (data.selectedQuizTypes as QuizType[]) : []
  const selected = normalizeSelectedForPlan(rawSelected, entitled, plan)

  return {
    plan,
    entitledQuizTypes: entitled,
    selectedQuizTypes: selected,
    nextChangeAllowedAt: toDateOrNull(data?.nextChangeAllowedAt),
    displayName: typeof data?.displayName === "string" ? data.displayName : "",
    schemaVersion: typeof data?.schemaVersion === "number" ? data.schemaVersion : 4,
    devUnlockAll,
  }
}

// 後方互換名。読み込み時にFirestoreへ課金情報を自動修復書き込みしない。
export const loadAndRepairUserPlanState = loadUserPlanState

export async function saveSelectedQuizTypesWithLock(params: {
  uid: string
  selectedQuizTypes: QuizType[]
}): Promise<{ saved: QuizType[]; nextChangeAllowedAt: Date | null }> {
  const state = await loadUserPlanState(params.uid)
  const normalized = normalizeSelectedForPlan(params.selectedQuizTypes, state.entitledQuizTypes, state.plan)
  const ref = doc(db, "users", params.uid)
  await setDoc(ref, { selectedQuizTypes: normalized, updatedAt: serverTimestamp() }, { merge: true })
  return { saved: normalized, nextChangeAllowedAt: state.nextChangeAllowedAt }
}

export async function saveIndustryWithLock(params: {
  uid: string
  industry: string
}): Promise<{ saved: string; nextChangeAllowedAt: Date | null; locked: boolean }> {
  const ref = doc(db, "users", params.uid)
  await setDoc(ref, { industry: params.industry, updatedAt: serverTimestamp() }, { merge: true })
  return { saved: params.industry, nextChangeAllowedAt: null, locked: false }
}

export async function savePlanAndNormalizeSelected(params: {
  uid: string
  plan: PlanId
}): Promise<UserPlanState> {
  const ref = doc(db, "users", params.uid)
  const snap = await getDoc(ref)
  const data = snap.exists() ? (snap.data() as any) : {}
  const entitled = buildEntitledQuizTypes(params.plan)
  const selected = normalizeSelectedForPlan(data?.selectedQuizTypes ?? [], entitled, params.plan)

  await setDoc(
    ref,
    {
      plan: params.plan,
      schemaVersion: 4,
      selectedQuizTypes: selected,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  )

  return {
    plan: params.plan,
    entitledQuizTypes: entitled,
    selectedQuizTypes: selected,
    nextChangeAllowedAt: toDateOrNull(data?.nextChangeAllowedAt),
    displayName: typeof data?.displayName === "string" ? data.displayName : "",
    schemaVersion: 4,
    devUnlockAll: false,
  }
}

export function trialEndTimestampFromNow(days = 1) {
  return Timestamp.fromDate(new Date(Date.now() + days * 24 * 60 * 60 * 1000))
}
