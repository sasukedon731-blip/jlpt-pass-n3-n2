"use client"

import { useEffect, useMemo, useState } from "react"
import type { CSSProperties } from "react"
import { useRouter } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"

import AppHeader from "@/app/components/AppHeader"
import BillingStatusCard from "@/app/components/billing/BillingStatusCard"
import CheckoutResultNotice from "@/app/components/billing/CheckoutResultNotice"
import KonbiniGuideNotice from "@/app/components/billing/KonbiniGuideNotice"
import PendingPaymentNotice from "@/app/components/billing/PendingPaymentNotice"
import CompanyContractCard from "@/app/components/billing/CompanyContractCard"
import TrialStatusCard, { type TrialProfile } from "@/app/components/billing/TrialStatusCard"
import LegalFooter from "@/app/components/LegalFooter"
import { db } from "@/app/lib/firebase"
import type { BillingLike } from "@/app/lib/billingAccess"
import { isCompanyAccount } from "@/app/lib/companyAccount"
import { useAuth } from "@/app/lib/useAuth"

const BASE_PRICE_YEN = 500
const AI_ADDON_PRICE_YEN = 500
const PERIODS = [
  { months: 1, label: "30日" },
  { months: 3, label: "90日" },
  { months: 6, label: "180日" },
] as const

export default function PlansPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [method, setMethod] = useState<"card" | "konbini">("card")
  const [months, setMonths] = useState<1 | 3 | 6>(1)
  const [aiAddon, setAiAddon] = useState(false)
  const [checkoutStatus, setCheckoutStatus] = useState<string | null>(null)
  const [billing, setBilling] = useState<BillingLike | null>(null)
  const [trialProfile, setTrialProfile] = useState<TrialProfile | null>(null)
  const [billingLoading, setBillingLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const baseTotal = BASE_PRICE_YEN * months
  const aiTotal = aiAddon ? AI_ADDON_PRICE_YEN * months : 0
  const total = useMemo(() => baseTotal + aiTotal, [baseTotal, aiTotal])
  const isCompany = isCompanyAccount(trialProfile)
  const isPendingPayment = billing?.status === "pending"
  const showPurchaseForm = !billingLoading && !isCompany

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setCheckoutStatus(params.get("checkout"))
  }, [])

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      if (loading) return
      if (!user?.uid) {
        setBilling(null)
        setTrialProfile(null)
        setBillingLoading(false)
        return
      }

      setBillingLoading(true)
      try {
        const snap = await getDoc(doc(db, "users", user.uid))
        const data = snap.exists() ? snap.data() : null
        const nextBilling = data?.billing && typeof data.billing === "object" ? (data.billing as BillingLike) : null
        if (!cancelled) {
          setBilling(nextBilling)
          setTrialProfile(data as TrialProfile | null)
        }
      } catch (e) {
        console.error(e)
        if (!cancelled) setBilling(null)
      } finally {
        if (!cancelled) setBillingLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [loading, user?.uid])

  const startCheckout = async () => {
    if (!user) {
      router.push("/login")
      return
    }
    setSaving(true)
    setError("")
    try {
      const idToken = await user.getIdToken()
      const res = await fetch("/api/komoju/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken,
          method,
          plan: aiAddon ? "standard_ai" : "standard",
          months,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? "決済開始に失敗しました")
      if (data?.url) window.location.href = data.url
      else throw new Error("決済URLを取得できませんでした")
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "決済開始に失敗しました")
    } finally {
      setSaving(false)
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <AppHeader title="プラン" />
      <section style={{ maxWidth: 920, margin: "0 auto", padding: 20 }}>
        <div style={{ margin: "18px 0 22px" }}>
          <div style={{ fontSize: 13, color: "#2563eb", fontWeight: 900 }}>JLPT PASS N3・N2</div>
          <h1 style={{ margin: "8px 0", fontSize: 32 }}>プランを選択</h1>
          <p style={{ color: "#64748b", lineHeight: 1.8 }}>
            基本プランは30日500円です。90日・180日も選択できます。AI会話・AIスピーキングを使う場合はAI追加オプションを選択してください。
            企業コード登録ユーザーは企業契約扱いのため、支払い不要です。
          </p>
        </div>

        <div style={{ display: "grid", gap: 16 }}>
          {billingLoading ? (
            <section style={card}>
              <div style={{ fontWeight: 900 }}>お支払い状況を確認中...</div>
              <div style={{ marginTop: 8, color: "#64748b", fontSize: 14 }}>
                コンビニ決済から戻った場合は、現在の支払い状態を確認しています。
              </div>
            </section>
          ) : null}

          {!billingLoading && isCompany ? <CompanyContractCard /> : null}
          {!billingLoading && trialProfile && !isCompany ? <TrialStatusCard profile={trialProfile} /> : null}

          {!billingLoading && !isCompany && isPendingPayment ? (
            <>
              <PendingPaymentNotice billing={billing} />
              <BillingStatusCard billing={billing} plansHref="/plans" />
            </>
          ) : null}

          {showPurchaseForm && !isPendingPayment && checkoutStatus ? (
            <CheckoutResultNotice checkout={checkoutStatus} showAiCta={aiAddon} />
          ) : null}

          {showPurchaseForm ? (
            <>
              <KonbiniGuideNotice />

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
                <section style={card}>
                  <h2 style={{ marginTop: 0 }}>利用期間</h2>
                  <div style={{ display: "grid", gap: 10 }}>
                    {PERIODS.map((p) => (
                      <button key={p.months} onClick={() => setMonths(p.months)} style={months === p.months ? activeOption : option}>
                        <span style={{ fontWeight: 950 }}>{p.label}</span>
                        <span>¥{(BASE_PRICE_YEN * p.months).toLocaleString("ja-JP")}</span>
                      </button>
                    ))}
                  </div>
                </section>

                <section style={card}>
                  <h2 style={{ marginTop: 0 }}>AI追加</h2>
                  <button onClick={() => setAiAddon(false)} style={!aiAddon ? activeOption : option}>
                    <span style={{ fontWeight: 950 }}>AIなし</span>
                    <span>基本学習＋ゲーム</span>
                  </button>
                  <button onClick={() => setAiAddon(true)} style={{ ...(aiAddon ? activeOption : option), marginTop: 10 }}>
                    <span style={{ fontWeight: 950 }}>AI会話・AIスピーキングを追加</span>
                    <span>+¥{(AI_ADDON_PRICE_YEN * months).toLocaleString("ja-JP")}</span>
                  </button>
                  <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.7 }}>
                    AI追加は30日500円です。選択した利用期間に合わせて計算されます。
                  </p>
                </section>
              </div>

              <section style={card}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                  <div>
                    <h2 style={{ margin: 0 }}>お支払い内容</h2>
                    <p style={{ color: "#64748b", lineHeight: 1.8 }}>
                      N3・N2学習 / ゲーム / マイページ{aiAddon ? " / AI会話 / AIスピーキング" : ""}
                    </p>
                    <p style={{ margin: 0, color: "#334155", fontWeight: 800 }}>
                      基本 ¥{baseTotal.toLocaleString("ja-JP")} {aiAddon ? `・AI ¥${aiTotal.toLocaleString("ja-JP")}` : ""}
                    </p>
                  </div>
                  <div style={{ fontSize: 36, fontWeight: 950 }}>¥{total.toLocaleString("ja-JP")}</div>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
                  <label style={method === "card" ? activeMethod : methodBox}>
                    <input type="radio" checked={method === "card"} onChange={() => setMethod("card")} /> カード決済
                  </label>
                  <label style={method === "konbini" ? activeMethod : methodBox}>
                    <input type="radio" checked={method === "konbini"} onChange={() => setMethod("konbini")} /> コンビニ決済
                  </label>
                </div>

                {error && <p style={{ color: "#dc2626", fontWeight: 800 }}>{error}</p>}

                <button disabled={loading || saving} onClick={startCheckout} style={{ marginTop: 20, width: "100%", padding: "14px 16px", borderRadius: 16, border: "none", background: "#2563eb", color: "#fff", fontWeight: 950, cursor: "pointer" }}>
                  {saving ? "決済ページを作成中..." : "購入する"}
                </button>

                <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.8 }}>
                  カード情報は当アプリでは保持せず、安全な決済画面で処理されます。コンビニ決済は入金確認後に反映されます。
                </p>
              </section>
            </>
          ) : null}
        </div>

        <LegalFooter />
      </section>
    </main>
  )
}

const card: CSSProperties = { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 26, padding: 22, boxShadow: "0 18px 40px rgba(15,23,42,.08)" }
const option: CSSProperties = { width: "100%", display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", padding: "13px 14px", borderRadius: 16, border: "1px solid #cbd5e1", background: "#fff", color: "#0f172a", cursor: "pointer" }
const activeOption: CSSProperties = { ...option, border: "2px solid #2563eb", background: "#eff6ff" }
const methodBox: CSSProperties = { padding: "12px 14px", borderRadius: 14, border: "1px solid #cbd5e1", background: "#fff", fontWeight: 800 }
const activeMethod: CSSProperties = { ...methodBox, border: "2px solid #2563eb", background: "#eff6ff" }
