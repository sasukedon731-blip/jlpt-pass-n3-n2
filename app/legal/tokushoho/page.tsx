import Link from "next/link"

import LegalPage, { LegalRow, legalStyles } from "@/app/components/LegalPage"

export const metadata = {
  title: "特定商取引法に基づく表記 | JLPT PASS N3・N2",
}

export default function TokushohoPage() {
  return (
    <LegalPage
      title="特定商取引法に基づく表記"
      lead="JLPT PASS N3・N2 Japanese Study Appの販売条件・提供条件を表示しています。"
    >
      <LegalRow label="販売事業者">株式会社アウトインプラス</LegalRow>
      <LegalRow label="運営責任者">高野 倫之</LegalRow>
      <LegalRow label="所在地">東京都渋谷区道玄坂1-10-8 渋谷道玄坂東急ビル2F-C</LegalRow>
      <LegalRow label="電話番号">03-6820-3675</LegalRow>
      <LegalRow label="メールアドレス">support@outin-plus.com</LegalRow>
      <LegalRow label="サービス名">JLPT PASS N3・N2 Japanese Study App</LegalRow>
      <LegalRow label="サービス内容">
        日本語能力試験N3・N2レベルの学習教材、確認テスト、復習ゲーム、マイページ、AI会話、AIスピーキング、企業コードログイン機能を提供するオンライン学習サービスです。
      </LegalRow>
      <LegalRow label="販売価格">
        基本プランは500円（税込）です。利用期間は30日・90日・180日から選択できます。AI会話・AIスピーキング等の追加機能を選択した場合は、購入画面に表示される金額が適用されます。
      </LegalRow>
      <LegalRow label="販売価格以外の必要料金">
        インターネット接続に必要な通信料、パケット通信料、端末利用に伴う費用はお客様のご負担となります。コンビニ決済に手数料が発生する場合は、決済画面に表示されます。
      </LegalRow>
      <LegalRow label="支払方法">KOMOJU Checkoutによるクレジットカード決済・コンビニ決済</LegalRow>
      <LegalRow label="支払時期">
        クレジットカード決済は購入手続き時に決済されます。コンビニ決済は購入手続き後、KOMOJUの画面または通知に表示される支払期限までにお支払いください。
      </LegalRow>
      <LegalRow label="サービス提供時期">
        クレジットカード決済は決済完了後、コンビニ決済は入金確認後、通常速やかに利用権限が反映されます。通信状況または外部決済サービスの処理状況により、反映まで時間を要する場合があります。
      </LegalRow>
      <LegalRow label="利用期間">
        購入画面で選択した利用期間（30日・90日・180日）中に利用できます。利用期間終了後は有料機能の利用権限が停止し、継続利用する場合は再購入が必要です。
      </LegalRow>
      <LegalRow label="無料体験">
        一般ユーザーは登録後1日間、対象機能を無料で体験できます。無料体験の範囲、期間、利用条件はサービス内の表示に従います。企業コードユーザーは企業契約扱いとなるため、個人決済は不要です。
      </LegalRow>
      <LegalRow label="自動更新">
        本サービスは期間利用型の買い切りプランであり、原則として自動更新はありません。利用期間終了後に継続利用する場合は、お客様ご自身で再購入してください。
      </LegalRow>
      <LegalRow label="返品・返金・キャンセル">
        デジタルサービスの性質上、決済完了後のお客様都合による返品、返金、キャンセルはお受けできません。ただし、二重決済、当社側の重大な不具合、法令上必要な場合、その他当社が相当と判断した場合は個別に確認のうえ対応します。詳細は<Link href="/legal/refund" style={{ color: "#2563eb", fontWeight: 900 }}>返金ポリシー</Link>をご確認ください。
      </LegalRow>
      <LegalRow label="中途解約">
        利用期間中に利用を停止した場合でも、日割り計算による返金は行いません。自動更新はないため、解約手続きは不要です。
      </LegalRow>
      <LegalRow label="動作環境">
        スマートフォン、タブレット、PCの最新版ブラウザ（Google Chrome、Safari、Microsoft Edge等）での利用を推奨します。PWAとしてホーム画面追加に対応しています。
      </LegalRow>
      <LegalRow label="個人情報の取扱い">
        個人情報の取扱いについては<Link href="/legal/privacy" style={{ color: "#2563eb", fontWeight: 900 }}>プライバシーポリシー</Link>をご確認ください。
      </LegalRow>
      <LegalRow label="お問い合わせ">
        本サービスに関するお問い合わせは、メール（support@outin-plus.com）または<Link href="/contact" style={{ color: "#2563eb", fontWeight: 900 }}>お問い合わせページ</Link>よりご連絡ください。
      </LegalRow>

      <p style={legalStyles.note}>
        掲載内容は、サービス内容、料金体系、決済方法、関連法令、外部サービスの仕様変更等に応じて改定する場合があります。
      </p>
    </LegalPage>
  )
}
