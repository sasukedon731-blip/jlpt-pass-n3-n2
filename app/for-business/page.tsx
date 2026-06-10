"use client"

import Link from "next/link"
import AppHeader from "@/app/components/AppHeader"
import LegalFooter from "@/app/components/LegalFooter"

const features = [
  ["N3・N2に特化", "販売名はN3・N2向けと明確にし、個人学習と企業導入の両方に対応します。"],
  ["N5・N4も復習", "AI会話とゲームでは、基礎固めとしてN5・N4の要素も残しています。"],
  ["企業管理画面", "学習回数、平均正答率、最終学習日、進行中教材、バッジ数を確認できます。"],
]

export default function ForBusinessPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#fff", color: "#0f172a" }}>
      <AppHeader title="法人向け" />

      <section style={{ borderBottom: "1px solid #e2e8f0", background: "linear-gradient(180deg,#f8fafc,#fff)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 34, alignItems: "center" }}>
            <div>
              <div style={pill}>FOR COMPANIES</div>
              <h1 style={{ margin: "18px 0 14px", fontSize: "clamp(34px,6vw,56px)", lineHeight: 1.08, letterSpacing: "-.04em" }}>
                外国人材のN3・N2学習を、企業側で見える化。
              </h1>
              <p style={{ margin: 0, maxWidth: 650, color: "#475569", fontSize: 17, lineHeight: 1.9 }}>
                JLPT PASS N3・N2は、学習者がスマホで学び、企業担当者が学習状況を確認できる日本語学習アプリです。企業コード登録ユーザーは最初から企業契約扱いで、個人決済は不要です。
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                <Link href="/contact" style={primaryLink}>お問い合わせ</Link>
                <Link href="/company/login" style={subLink}>管理画面ログイン</Link>
              </div>
            </div>

            <div style={{ border: "1px solid #e2e8f0", borderRadius: 28, padding: 20, background: "#f8fafc", boxShadow: "0 18px 45px rgba(15,23,42,.08)" }}>
              <div style={{ border: "1px solid #e2e8f0", borderRadius: 24, padding: 20, background: "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <div>
                    <p style={{ margin: 0, fontSize: 12, fontWeight: 900, color: "#94a3b8", letterSpacing: ".14em" }}>DASHBOARD</p>
                    <h2 style={{ margin: "8px 0 0", fontSize: 23 }}>企業管理画面</h2>
                  </div>
                  <span style={{ height: 28, padding: "6px 10px", borderRadius: 999, background: "#ecfdf5", color: "#047857", fontSize: 12, fontWeight: 900 }}>CSV対応</span>
                </div>
                <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
                  {[["Nguyen Van A", "学習中", "86%", "今日"], ["Tran Thi B", "7日以上未学習", "63%", "8日前"], ["Pham C", "未学習", "—", "—"]].map(([name, status, score, last]) => (
                    <div key={name} style={{ display: "grid", gridTemplateColumns: "1.2fr .9fr .5fr .7fr", gap: 8, alignItems: "center", padding: "12px 10px", borderRadius: 16, background: "#f8fafc", border: "1px solid #e2e8f0", fontSize: 13 }}>
                      <b>{name}</b><span>{status}</span><b>{score}</b><span style={{ color: "#64748b" }}>{last}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "52px 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: 32, margin: 0 }}>企業利用でできること</h2>
        <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
          {features.map(([title, text]) => <InfoCard key={title} title={title} text={text} />)}
        </div>
      </section>

      <section style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "52px 20px" }}>
          <h2 style={{ textAlign: "center", fontSize: 32, margin: 0 }}>導入の流れ</h2>
          <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14 }}>
            {["お問い合わせ", "ご案内・お見積", "企業コード発行", "利用開始"].map((title, i) => (
              <div key={title} style={{ padding: 20, borderRadius: 22, border: "1px solid #e2e8f0", background: "#fff", textAlign: "center" }}>
                <div style={{ margin: "0 auto 12px", display: "grid", placeItems: "center", width: 42, height: 42, borderRadius: 999, background: "#0f172a", color: "#fff", fontWeight: 900 }}>{i + 1}</div>
                <b>{title}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 920, margin: "0 auto", padding: "56px 20px", textAlign: "center" }}>
        <h2 style={{ margin: 0, fontSize: 32 }}>まずは導入イメージをご相談ください。</h2>
        <p style={{ margin: "16px auto 0", maxWidth: 620, color: "#475569", lineHeight: 1.8 }}>
          利用人数、学習目的、運用方法に合わせてご案内します。
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 24 }}>
          <a href="mailto:support@outin-plus.com?subject=JLPT PASS N3・N2 導入相談" style={primaryLink}>メールで問い合わせる</a>
          <Link href="/contact" style={subLink}>お問い合わせページへ</Link>
          <Link href="/company/login" style={subLink}>企業管理画面へ</Link>
        </div>
      </section>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 20px 20px" }}><LegalFooter /></div>
    </main>
  )
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return <div style={{ padding: 22, borderRadius: 24, border: "1px solid #e2e8f0", background: "#fff" }}><h3 style={{ margin: 0, fontSize: 19 }}>{title}</h3><p style={{ margin: "10px 0 0", color: "#475569", lineHeight: 1.8, fontSize: 14 }}>{text}</p></div>
}
const pill: React.CSSProperties = { display: "inline-flex", padding: "8px 12px", borderRadius: 999, border: "1px solid #e2e8f0", background: "#fff", color: "#475569", fontWeight: 900, fontSize: 12, letterSpacing: ".12em" }
const primaryLink: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 50, padding: "0 18px", borderRadius: 16, border: "none", background: "#0f172a", color: "#fff", fontWeight: 900, textDecoration: "none" }
const subLink: React.CSSProperties = { ...primaryLink, background: "#fff", color: "#0f172a", border: "1px solid #cbd5e1" }
