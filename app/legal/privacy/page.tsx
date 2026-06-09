import AppHeader from "@/app/components/AppHeader"
import LegalFooter from "@/app/components/LegalFooter"

export default function PrivacyPage() {
  return <main style={{ minHeight: "100vh", background: "#f8fafc" }}><AppHeader title="プライバシーポリシー" /><section style={{ maxWidth: 840, margin: "0 auto", padding: 20 }}><h1>プライバシーポリシー</h1><div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 18, padding: 20, lineHeight: 1.9 }}>
    <p>株式会社アウトインプラスは、JLPT PASS N3・N2 Japanese Study Appにおいて取得する個人情報を適切に取り扱います。</p>
    <h2>取得する情報</h2><p>氏名または表示名、メールアドレス、企業コード、学習履歴、決済状態、AI機能利用に必要な入力内容等を取得する場合があります。</p>
    <h2>利用目的</h2><p>本人確認、学習機能提供、企業管理画面での学習状況表示、決済確認、問い合わせ対応、サービス改善のために利用します。</p>
    <h2>外部サービス</h2><p>認証・データ保存にFirebase、決済にKOMOJU、AI機能にOpenAI API等を利用する場合があります。カード情報は当社では保持しません。</p>
    <h2>お問い合わせ</h2><p>support@outin-plus.com までご連絡ください。</p>
  </div><LegalFooter /></section></main>
}
