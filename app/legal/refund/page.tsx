import Link from "next/link"

import LegalPage, { LegalSection, legalStyles } from "@/app/components/LegalPage"

export const metadata = {
  title: "返金ポリシー | JLPT PASS N3・N2",
}

export default function RefundPage() {
  return (
    <LegalPage
      title="返金ポリシー"
      lead="決済完了後の返金・キャンセルに関する方針です。"
    >
      <p style={legalStyles.lead}>
        JLPT PASS N3・N2は、オンラインで提供されるデジタル学習サービスです。サービスの性質上、決済完了後のお客様都合による返金、返品、キャンセルは原則としてお受けしておりません。
      </p>

      <LegalSection title="1. 原則として返金できない場合">
        <ul style={legalStyles.ul}>
          <li>購入後に利用しなかった、または利用頻度が少なかった場合</li>
          <li>学習成果、試験結果、AI出力内容が期待と異なった場合</li>
          <li>ユーザーの端末、通信環境、ブラウザ設定に起因して利用できなかった場合</li>
          <li>購入期間の途中で利用を停止した場合の日割り返金</li>
          <li>企業契約対象外の個人購入を、事前確認なく行った場合</li>
        </ul>
      </LegalSection>

      <LegalSection title="2. 返金を検討する場合">
        <p style={legalStyles.p}>以下に該当する可能性がある場合は、個別に確認のうえ、返金または利用期間調整等を検討します。</p>
        <ul style={legalStyles.ul}>
          <li>同一ユーザーによる明らかな二重決済</li>
          <li>当社側の重大なシステム障害により、購入した有料機能が相当期間利用できなかった場合</li>
          <li>決済完了後、当社の設定不備により利用権限が反映されなかった場合</li>
          <li>法令上、返金対応が必要と判断される場合</li>
          <li>その他、当社が返金相当と判断した場合</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. コンビニ決済について">
        <p style={legalStyles.p}>コンビニ決済は、外部決済サービスの案内に従って支払いを行う方式です。入金前のキャンセルや支払期限切れについては、決済画面または通知をご確認ください。入金確認後に利用権限が反映されます。</p>
      </LegalSection>

      <LegalSection title="4. 自動更新・解約について">
        <p style={legalStyles.p}>本サービスは30日・90日・180日の期間利用型プランであり、原則として自動更新はありません。利用期間終了後に継続利用する場合は、再度購入してください。詳しくは<Link href="/cancel" style={{ color: "#2563eb", fontWeight: 900 }}>利用期限・再購入について</Link>をご確認ください。</p>
      </LegalSection>

      <LegalSection title="5. お問い合わせ方法">
        <p style={legalStyles.p}>返金確認を希望する場合は、以下の情報を添えて support@outin-plus.com までご連絡ください。</p>
        <ul style={legalStyles.ul}>
          <li>登録メールアドレス</li>
          <li>購入日時</li>
          <li>購入プラン</li>
          <li>決済番号または支払情報</li>
          <li>返金確認を希望する理由</li>
        </ul>
      </LegalSection>

      <p style={legalStyles.note}>返金可否の判断には、決済状況、利用状況、障害発生状況等の確認が必要です。確認結果により、ご希望に添えない場合があります。</p>
    </LegalPage>
  )
}
