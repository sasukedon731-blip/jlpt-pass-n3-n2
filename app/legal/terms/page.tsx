import AppHeader from "@/app/components/AppHeader"
import LegalFooter from "@/app/components/LegalFooter"

export default function TermsPage() {
  return <main style={{ minHeight: "100vh", background: "#f8fafc" }}><AppHeader title="利用規約" /><section style={{ maxWidth: 840, margin: "0 auto", padding: 20 }}><h1>利用規約</h1><div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 18, padding: 20, lineHeight: 1.9 }}>
    <p>本規約は、株式会社アウトインプラスが提供する「JLPT PASS N3・N2 Japanese Study App」の利用条件を定めるものです。</p>
    <h2>利用範囲</h2><p>ユーザーは、JLPT N3・N2学習、ゲーム、AI会話、AIスピーク等の機能を、購入プランまたは企業契約の範囲内で利用できます。</p>
    <h2>禁止事項</h2><p>アカウントの不正利用、教材・問題・AI出力内容の無断転載、システムへの不正アクセス、その他当社が不適切と判断する行為を禁止します。</p>
    <h2>AI機能</h2><p>AIの回答は学習補助を目的とするもので、正確性・完全性を保証するものではありません。</p>
    <h2>企業契約</h2><p>企業コード登録ユーザーは、企業契約の範囲で利用できます。企業契約終了時には利用できなくなる場合があります。</p>
  </div><LegalFooter /></section></main>
}
