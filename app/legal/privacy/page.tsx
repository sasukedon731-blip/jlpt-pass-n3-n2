import LegalPage, { LegalSection, legalStyles } from "@/app/components/LegalPage"

export const metadata = {
  title: "プライバシーポリシー | JLPT PASS N3・N2",
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="プライバシーポリシー"
      lead="株式会社アウトインプラスは、本サービスで取得する情報を適切に管理します。"
    >
      <p style={legalStyles.lead}>
        株式会社アウトインプラス（以下「当社」といいます。）は、「JLPT PASS N3・N2 Japanese Study App」（以下「本サービス」といいます。）において取得する個人情報および利用情報を、以下の方針に基づき取り扱います。
      </p>

      <LegalSection title="1. 取得する情報">
        <ul style={legalStyles.ul}>
          <li>氏名、表示名、メールアドレス、ログインID、認証情報</li>
          <li>企業コード、企業名、企業契約に紐づく利用者情報</li>
          <li>学習履歴、回答履歴、正答率、進捗、バッジ、最終学習日、AI機能の利用履歴</li>
          <li>決済状態、購入プラン、利用期間、決済識別子、コンビニ決済の入金確認状態</li>
          <li>お問い合わせ内容、連絡履歴</li>
          <li>端末情報、ブラウザ情報、アクセス日時、エラー情報、Cookieまたは類似技術により取得される情報</li>
          <li>AI会話・AIスピーキングの利用に必要な入力文、音声、文字起こし、評価結果、生成結果</li>
        </ul>
      </LegalSection>

      <LegalSection title="2. 利用目的">
        <ul style={legalStyles.ul}>
          <li>本人確認、ログイン、アカウント管理のため</li>
          <li>学習教材、確認テスト、ゲーム、マイページ、AI会話、AIスピーキング等を提供するため</li>
          <li>無料体験、有料プラン、AI追加オプション、企業契約の利用権限を判定するため</li>
          <li>KOMOJUを通じた決済確認、入金確認、購入履歴管理、返金判断を行うため</li>
          <li>企業管理画面において、企業契約ユーザーの学習状況、成績、進捗等を表示するため</li>
          <li>お問い合わせ、本人確認、障害対応、重要なお知らせに対応するため</li>
          <li>不正利用、規約違反、セキュリティ事故を防止するため</li>
          <li>教材、機能、AI品質、ユーザー体験、サービス運営を改善するため</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. 外部サービスの利用">
        <p style={legalStyles.p}>本サービスでは、認証・データ保存にFirebase、決済にKOMOJU、AI会話・AIスピーキング等にOpenAI APIその他の外部AI関連サービスを利用する場合があります。</p>
        <p style={legalStyles.p}>クレジットカード情報は当社では保持せず、KOMOJU Checkout上で処理されます。外部サービスの利用に際し、サービス提供に必要な範囲で情報が送信・保存・処理される場合があります。</p>
      </LegalSection>

      <LegalSection title="4. 企業契約における情報共有">
        <p style={legalStyles.p}>企業コードを用いて登録したユーザーについては、企業管理者が、学習状況、進捗、正答率、最終学習日、利用状況等を確認できる場合があります。企業契約ユーザーは、この範囲で情報が企業管理者に共有されることに同意するものとします。</p>
      </LegalSection>

      <LegalSection title="5. 第三者提供">
        <p style={legalStyles.p}>当社は、法令に基づく場合、本人の同意がある場合、決済・認証・AI処理等のサービス提供に必要な範囲で外部サービスを利用する場合、事業承継その他正当な理由がある場合を除き、個人情報を第三者に提供しません。</p>
      </LegalSection>

      <LegalSection title="6. 安全管理">
        <p style={legalStyles.p}>当社は、取得した情報について、不正アクセス、紛失、漏えい、改ざん等を防止するため、合理的な安全管理措置を講じます。ただし、インターネット通信の性質上、完全な安全性を保証するものではありません。</p>
      </LegalSection>

      <LegalSection title="7. 保存期間">
        <p style={legalStyles.p}>当社は、利用目的の達成に必要な期間、法令上必要な期間、決済・お問い合わせ・不正利用対応に必要な期間、情報を保存します。不要となった情報は、合理的な方法により削除または匿名化します。</p>
      </LegalSection>

      <LegalSection title="8. 開示・訂正・削除等の請求">
        <p style={legalStyles.p}>ユーザーは、法令に基づき、当社が保有する本人情報の開示、訂正、利用停止、削除等を請求できます。本人確認のうえ、合理的な範囲で対応します。</p>
      </LegalSection>

      <LegalSection title="9. お問い合わせ窓口">
        <p style={legalStyles.p}>株式会社アウトインプラス</p>
        <p style={legalStyles.p}>メール：support@outin-plus.com</p>
        <p style={legalStyles.p}>電話：03-6820-3675</p>
      </LegalSection>

      <LegalSection title="10. 改定">
        <p style={legalStyles.p}>当社は、法令、外部サービス、サービス内容の変更等に応じて、本ポリシーを改定する場合があります。重要な変更がある場合は、本サービス上での表示その他適切な方法により通知します。</p>
      </LegalSection>

      <p style={legalStyles.note}>制定日：2026年6月28日</p>
    </LegalPage>
  )
}
