"use client"

import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"

import AppHeader from "@/app/components/AppHeader"
import LegalFooter from "@/app/components/LegalFooter"
import { auth } from "@/app/lib/firebase"
import { useAuth } from "@/app/lib/useAuth"

export default function AppHomePage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  async function handleLogout() {
    await signOut(auth)
    router.push("/")
  }

  if (loading) {
    return <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#f8fafc" }}>読み込み中...</main>
  }

  if (!user) {
    router.replace("/login")
    return null
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", color: "#0f172a" }}>
      <AppHeader title="学習TOP" />
      <section style={{ maxWidth: 980, margin: "0 auto", padding: 20 }}>
        <div style={{ textAlign: "center", padding: "26px 0 18px" }}>
          <div style={{ display: "inline-flex", padding: "8px 12px", borderRadius: 999, background: "#dbeafe", color: "#1d4ed8", fontWeight: 900, fontSize: 13 }}>JLPT PASS N3・N2</div>
          <h1 style={{ margin: "14px 0 8px", fontSize: "clamp(30px,5vw,48px)", letterSpacing: "-.03em" }}>Japanese Study App</h1>
          <p style={{ margin: 0, color: "#64748b" }}>{user.displayName || user.email} さん、今日も一歩進めよう。</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
          <HomeCard icon="📘" title="N3学習" text="文法・語彙・読解を学ぶ" onClick={() => router.push("/select-mode?type=japanese-n3")} />
          <HomeCard icon="📙" title="N2学習" text="より高い日本語力へ" onClick={() => router.push("/select-mode?type=japanese-n2")} />
          <HomeCard icon="🎮" title="ゲーム" text="N5〜N2を復習" onClick={() => router.push("/game")} />
          <HomeCard icon="💬" title="AI会話" text="会話練習をする" onClick={() => router.push("/conversation")} />
          <HomeCard icon="🎙️" title="AIスピーキング" text="発話練習をする" onClick={() => router.push("/speaking")} />
          <HomeCard icon="👤" title="マイページ" text="履歴と進捗を確認" onClick={() => router.push("/mypage")} />
        </div>

        <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={() => router.push("/plans")} style={subBtn}>プランを見る</button>
          <button onClick={() => router.push("/for-business")} style={subBtn}>企業向けページ</button>
          <button onClick={handleLogout} style={dangerBtn}>ログアウト</button>
        </div>

        <LegalFooter />
      </section>
    </main>
  )
}

function HomeCard({ icon, title, text, onClick }: { icon: string; title: string; text: string; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ textAlign: "left", padding: 20, borderRadius: 24, border: "1px solid #e2e8f0", background: "#fff", color: "#0f172a", cursor: "pointer", boxShadow: "0 12px 30px rgba(15,23,42,.06)" }}>
      <div style={{ fontSize: 30 }}>{icon}</div>
      <div style={{ marginTop: 12, fontSize: 19, fontWeight: 900 }}>{title}</div>
      <div style={{ marginTop: 6, fontSize: 13, lineHeight: 1.7, color: "#64748b" }}>{text}</div>
    </button>
  )
}

const subBtn: React.CSSProperties = { padding: "12px 16px", borderRadius: 16, border: "1px solid #cbd5e1", background: "#fff", color: "#0f172a", fontWeight: 900, cursor: "pointer" }
const dangerBtn: React.CSSProperties = { ...subBtn, borderColor: "#fecaca", color: "#dc2626" }
