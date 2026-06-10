"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"

import AppHeader from "@/app/components/AppHeader"
import LegalFooter from "@/app/components/LegalFooter"
import { auth } from "@/app/lib/firebase"
import { useAuth } from "@/app/lib/useAuth"

export default function HomePage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg,#eff6ff,#f8fafc 45%,#eef2ff)", color: "#0f172a" }}>
      <AppHeader />

      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "44px 20px 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 28, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", padding: "8px 12px", borderRadius: 999, background: "#dbeafe", color: "#1d4ed8", fontWeight: 900, fontSize: 13 }}>
              JLPT PASS N3・N2
            </div>
            <h1 style={{ fontSize: "clamp(34px,6vw,64px)", lineHeight: 1.05, margin: "18px 0 12px", letterSpacing: "-.04em" }}>
              Japanese Study App
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.9, color: "#475569", maxWidth: 640 }}>
              N3・N2学習、N5〜N2の復習ゲーム、AI会話、AIスピークをひとつにまとめた学習アプリです。個人は1日無料体験、企業コード登録ユーザーは支払い不要で利用できます。
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
              {loading ? null : user ? (
                <>
                  <button onClick={() => router.push("/home")} style={primaryBtn}>アプリを開く</button>
                  <button onClick={() => router.push("/mypage")} style={subBtn}>マイページ</button>
                  <button onClick={async () => { await signOut(auth); router.push("/") }} style={subBtn}>ログアウト</button>
                </>
              ) : (
                <>
                  <Link href="/register" style={primaryLink}>個人で無料体験</Link>
                  <Link href="/login" style={subLink}>ログイン</Link>
                </>
              )}
            </div>
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            <TopCard
              href={user ? "/home" : "/register"}
              badge="PERSONAL"
              icon="👤"
              title="個人で利用する"
              text="1日無料体験から始められます。N3・N2学習、AI、ゲーム、マイページを利用できます。"
              cta={user ? "学習TOPへ" : "無料体験を始める"}
            />
            <TopCard
              href="/for-business"
              badge="FOR BUSINESS"
              icon="🏢"
              title="企業で導入する"
              text="企業コードで学習者を紐づけ、企業管理画面で学習回数・正答率・最終学習日を確認できます。"
              cta="法人向けページへ"
            />
          </div>
        </div>

        <section style={{ marginTop: 34, background: "rgba(255,255,255,.82)", border: "1px solid rgba(148,163,184,.25)", borderRadius: 28, padding: 22, boxShadow: "0 24px 60px rgba(15,23,42,.08)" }}>
          <h2 style={{ margin: "0 0 14px", fontSize: 22 }}>入っている機能</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
            <Feature href="/select-mode?type=japanese-n3" icon="📘" title="N3学習" />
            <Feature href="/select-mode?type=japanese-n2" icon="📙" title="N2学習" />
            <Feature href="/game" icon="🎮" title="N5〜N2ゲーム" />
            <Feature href="/conversation" icon="💬" title="AI会話" />
            <Feature href="/speaking" icon="🎙️" title="AIスピーク" />
            <Feature href="/company/login" icon="🏢" title="企業管理" />
          </div>
        </section>

        <LegalFooter />
      </section>
    </main>
  )
}

function TopCard({ href, badge, icon, title, text, cta }: { href: string; badge: string; icon: string; title: string; text: string; cta: string }) {
  return (
    <Link href={href} style={{ display: "block", padding: 22, borderRadius: 26, border: "1px solid #dbe3ef", background: "rgba(255,255,255,.92)", textDecoration: "none", color: "#0f172a", boxShadow: "0 18px 40px rgba(15,23,42,.10)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <span style={{ fontSize: 32 }}>{icon}</span>
        <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: ".16em", color: "#64748b" }}>{badge}</span>
      </div>
      <h2 style={{ margin: "14px 0 8px", fontSize: 24 }}>{title}</h2>
      <p style={{ margin: 0, color: "#475569", lineHeight: 1.75, fontSize: 14 }}>{text}</p>
      <div style={{ marginTop: 16, fontWeight: 900, color: "#2563eb" }}>{cta} →</div>
    </Link>
  )
}

function Feature({ href, icon, title }: { href: string; icon: string; title: string }) {
  return <Link href={href} style={{ padding: 16, borderRadius: 18, border: "1px solid #e2e8f0", background: "#fff", textDecoration: "none", color: "#0f172a", fontWeight: 900 }}><div style={{ fontSize: 24 }}>{icon}</div><div style={{ marginTop: 8 }}>{title}</div></Link>
}

const primaryBtn: React.CSSProperties = { padding: "13px 18px", borderRadius: 16, border: "none", background: "#2563eb", color: "#fff", fontWeight: 900, cursor: "pointer" }
const subBtn: React.CSSProperties = { padding: "13px 18px", borderRadius: 16, border: "1px solid #cbd5e1", background: "#fff", color: "#0f172a", fontWeight: 900, cursor: "pointer" }
const primaryLink: React.CSSProperties = { ...primaryBtn, textDecoration: "none", display: "inline-flex" }
const subLink: React.CSSProperties = { ...subBtn, textDecoration: "none", display: "inline-flex" }
