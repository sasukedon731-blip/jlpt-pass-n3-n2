"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AppHeader from "@/app/components/AppHeader"
import LegalFooter from "@/app/components/LegalFooter"
import { useAuth } from "@/app/lib/useAuth"

const PRICE = 980

export default function PlansPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [method, setMethod] = useState<"card" | "konbini">("card")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const startCheckout = async () => {
    if (!user) { router.push("/login"); return }
    setSaving(true); setError("")
    try {
      const idToken = await user.getIdToken()
      const res = await fetch("/api/komoju/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, method }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? "決済開始に失敗しました")
      if (data?.url) window.location.href = data.url
      else throw new Error("決済URLが取得できませんでした")
    } catch (e: any) {
      setError(e?.message ?? "決済開始に失敗しました")
    } finally {
      setSaving(false)
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <AppHeader title="プラン" />
      <section style={{ maxWidth: 880, margin: "0 auto", padding: 20 }}>
        <div style={{ margin: "18px 0 22px" }}>
          <div style={{ fontSize: 13, color: "#2563eb", fontWeight: 900 }}>JLPT PASS N3・N2</div>
          <h1 style={{ margin: "8px 0", fontSize: 32 }}>有料プラン</h1>
          <p style={{ color: "#64748b", lineHeight: 1.8 }}>個人ユーザーは1日無料体験後、有料プラン購入でN3・N2・ゲーム・AI会話・AIスピークを継続利用できます。</p>
        </div>

        <section style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 26, padding: 22, boxShadow: "0 18px 40px rgba(15,23,42,.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <h2 style={{ margin: 0 }}>JLPT PASS N3・N2 有料プラン</h2>
              <p style={{ color: "#64748b", lineHeight: 1.8 }}>N3・N2学習 / ゲーム / AI会話 / AIスピーク / マイページ</p>
            </div>
            <div style={{ fontSize: 34, fontWeight: 950 }}>¥{PRICE.toLocaleString("ja-JP")}</div>
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
            {saving ? "決済ページを作成中..." : "KOMOJUで購入する"}
          </button>

          <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.8 }}>カード情報は当アプリでは保持せず、KOMOJU Checkout上で処理されます。コンビニ決済は入金確認後に反映されます。</p>
        </section>
        <LegalFooter />
      </section>
    </main>
  )
}

const methodBox: React.CSSProperties = { padding: "12px 14px", borderRadius: 14, border: "1px solid #cbd5e1", background: "#fff", fontWeight: 800 }
const activeMethod: React.CSSProperties = { ...methodBox, border: "2px solid #2563eb", background: "#eff6ff" }
