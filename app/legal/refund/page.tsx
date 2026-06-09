import AppHeader from "@/app/components/AppHeader"
import LegalFooter from "@/app/components/LegalFooter"

export default function RefundPage() {
  return <main style={{ minHeight: "100vh", background: "#f8fafc" }}><AppHeader title="返金ポリシー" /><section style={{ maxWidth: 840, margin: "0 auto", padding: 20 }}><h1>返金ポリシー</h1><div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 18, padding: 20, lineHeight: 1.9 }}>
    <p>JLPT PASS N3・N2 Japanese Study Appは、デジタル学習サービスの性質上、決済完了後の返金は原則として承っておりません。</p>
    <p>ただし、二重決済、当社側の重大なシステム障害、その他当社が返金相当と判断した場合は、個別に確認のうえ対応します。</p>
    <p>コンビニ決済は入金後に利用権限が反映されます。入金前のキャンセルはKOMOJUの画面・案内に従ってください。</p>
    <p>お問い合わせ：support@outin-plus.com</p>
  </div><LegalFooter /></section></main>
}
