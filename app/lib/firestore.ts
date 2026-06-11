"use client"

import { db } from "@/app/lib/firebase"
import { doc, getDoc, setDoc, serverTimestamp, Timestamp } from "firebase/firestore"
import { buildEntitledQuizTypes } from "@/app/lib/plan"

export type UserRole = "admin" | "user" | "company_admin"

type EnsureParams = { uid: string; email?: string | null; displayName?: string | null }

export async function ensureUserProfile(params: EnsureParams) {
  const { uid } = params
  const email = params.email ?? null
  const displayName = params.displayName ?? null
  const ref = doc(db, "users", uid)
  const snap = await getDoc(ref)

  if (!snap.exists()) {
    const selectedQuizTypes = buildEntitledQuizTypes("trial")
    await setDoc(ref, {
      uid,
      email,
      displayName,
      role: "user" as UserRole,
      plan: "trial",
      selectedQuizTypes,
      schemaVersion: 4,
      billing: {
        accountType: "personal",
        method: "manual",
        status: "trialing",
        currentPlan: "trial",
        trialStartAt: serverTimestamp(),
        trialEndAt: Timestamp.fromDate(new Date(Date.now() + 24 * 60 * 60 * 1000)),
        currentPeriodEnd: null,
        aiConversationEnabled: false,
        aiSpeakingEnabled: false,
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    return
  }

  const data = snap.data() as any
  const patch: Record<string, any> = { uid }
  if (email && !data?.email) patch.email = email
  if (displayName && !data?.displayName) patch.displayName = displayName
  if (Object.keys(patch).length > 1) {
    patch.updatedAt = serverTimestamp()
    await setDoc(ref, patch, { merge: true })
  }
}

export async function getUserRole(uid: string): Promise<UserRole> {
  const snap = await getDoc(doc(db, "users", uid))
  if (!snap.exists()) return "user"
  const role = (snap.data() as any)?.role
  return role === "admin" || role === "company_admin" ? role : "user"
}
