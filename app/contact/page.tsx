import Link from "next/link"

import LegalPage, { LegalSection, legalStyles } from "@/app/components/LegalPage"

export const metadata = {
  title: "お問い合わせ | JLPT PASS N3・N2",
}

export default function ContactPage() {
  return (
    <LegalPage
      title="お問い合わせ"
      lead="JLPT PASS N3・N2に関するお問い合わせ窓口です。"
    >
      <p style={legalStyles.lead}>
        アカウント、決済、コンビニ支払い、企業コード、AI会話・AIスピーキング、学習機能、返金確認等については、以下の窓口までご連絡ください。
      </p>

      <LegalSection title="お問い合わせ先">
        <p style={legalStyles.p}><b>運営会社：</b>株式会社アウトインプラス</p>
        <p style={legalStyles.p}><b>メール：</b><a href="mailto:support@outin-plus.com?subject=JLPT%20PASS%20N3%E3%83%BBN2%E3%81%AE%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B" style={{ color: "#2563eb", fontWeight: 900 }}>support@outin-plus.com</a></p>
        <p style={legalStyles.p}><b>電話：</b>03-6820-3675</p>
        <p style={legalStyles.p}><b>所在地：</b>東京都渋谷区道玄坂1-10-8 渋谷道玄坂東急ビル2F-C</p>
      </LegalSection>

      <LegalSection title="ご連絡時に記載いただきたい内容">
        <ul style={legalStyles.ul}>
          <li>登録メールアドレス</li>
          <li>お問い合わせ内容（アカウント、決済、企業コード、AI機能、学習機能など）</li>
          <li>決済に関するお問い合わせの場合は、購入日時、購入プラン、決済番号または支払情報</li>
          <li>不具合に関するお問い合わせの場合は、利用端末、ブラウザ、発生日時、表示されたエラー内容</li>
        </ul>
      </LegalSection>

      <LegalSection title="関連ページ">
        <p style={legalStyles.p}><Link href="/legal/tokushoho" style={{ color: "#2563eb", fontWeight: 900 }}>特定商取引法に基づく表記</Link></p>
        <p style={legalStyles.p}><Link href="/legal/terms" style={{ color: "#2563eb", fontWeight: 900 }}>利用規約</Link></p>
        <p style={legalStyles.p}><Link href="/legal/privacy" style={{ color: "#2563eb", fontWeight: 900 }}>プライバシーポリシー</Link></p>
        <p style={legalStyles.p}><Link href="/legal/refund" style={{ color: "#2563eb", fontWeight: 900 }}>返金ポリシー</Link></p>
      </LegalSection>

      <p style={legalStyles.note}>メールでのお問い合わせを優先して確認します。内容により、回答までお時間をいただく場合があります。</p>
    </LegalPage>
  )
}
