import AppHeader from "@/app/components/AppHeader"
import LegalFooter from "@/app/components/LegalFooter"

export default function ContactPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <AppHeader title="お問い合わせ" />
      <section style={{ maxWidth: 760, margin: "0 auto", padding: 20 }}>
        <h1>お問い合わせ</h1>
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, padding: 20, lineHeight: 1.9 }}>
          <p>JLPT PASS N3・N2 Japanese Study App に関するお問い合わせは、以下へご連絡ください。</p>
          <p><b>メール：</b>support@outin-plus.com</p>
          <p><b>電話：</b>03-6820-3675</p>
          <p><b>運営会社：</b>株式会社アウトインプラス</p>
        </div>
        <LegalFooter />
      </section>
    </main>
  )
}
