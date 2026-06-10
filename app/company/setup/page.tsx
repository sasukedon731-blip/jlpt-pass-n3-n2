import Link from "next/link"
import AppHeader from "@/app/components/AppHeader"
import LegalFooter from "@/app/components/LegalFooter"

const adminUser = `{
  "role": "company_admin",
  "accountType": "company",
  "companyCode": "OUTIN001",
  "companyName": "株式会社サンプル",
  "billing": {
    "accountType": "company",
    "method": "company_code",
    "status": "company",
    "currentPlan": "company"
  }
}`
const companyDoc = `{
  "name": "株式会社サンプル",
  "inviteCode": "OUTIN001",
  "inviteEnabled": true,
  "status": "active"
}`

export default function CompanySetupPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", color: "#0f172a" }}>
      <AppHeader title="企業設定メモ" />
      <section style={{ maxWidth: 980, margin: "0 auto", padding: 20 }}>
        <h1>企業管理画面の設定メモ</h1>
        <p style={{ color: "#64748b", lineHeight: 1.8 }}>Firebase Consoleで企業管理者ユーザーと企業コードを作ると、企業ログインと学習者一覧が使えます。</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
          <Block title="users/{uid} 企業管理者" code={adminUser} />
          <Block title="companies/{companyCode}" code={companyDoc} />
        </div>
        <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/company" style={linkBtn}>企業管理画面へ</Link>
          <Link href="/company/login" style={linkBtn}>企業ログインへ</Link>
          <Link href="/home" style={linkBtn}>学習TOPへ</Link>
        </div>
        <LegalFooter />
      </section>
    </main>
  )
}
function Block({ title, code }: { title: string; code: string }) { return <div style={{ padding: 20, borderRadius: 22, border: "1px solid #e2e8f0", background: "#fff" }}><h2 style={{ marginTop: 0 }}>{title}</h2><pre style={{ overflowX: "auto", whiteSpace: "pre-wrap", borderRadius: 16, background: "#0f172a", color: "#e2e8f0", padding: 16, lineHeight: 1.6 }}>{code}</pre></div> }
const linkBtn: React.CSSProperties = { padding: "12px 16px", borderRadius: 16, border: "1px solid #cbd5e1", background: "#fff", color: "#0f172a", fontWeight: 900, textDecoration: "none" }
