import LegalPage, { LegalSection, legalStyles } from "@/app/components/LegalPage"

export const metadata = {
  title: "利用規約 | JLPT PASS N3・N2",
}

export default function TermsPage() {
  return (
    <LegalPage
      title="利用規約"
      lead="本規約は、JLPT PASS N3・N2 Japanese Study Appの利用条件を定めるものです。"
    >
      <p style={legalStyles.lead}>
        本規約は、株式会社アウトインプラス（以下「当社」といいます。）が提供する「JLPT PASS N3・N2 Japanese Study App」（以下「本サービス」といいます。）の利用条件を定めるものです。ユーザーは、本サービスを利用することにより、本規約に同意したものとみなされます。
      </p>

      <LegalSection title="第1条（本サービスの内容）">
        <p style={legalStyles.p}>本サービスは、日本語能力試験N3・N2レベルの学習教材、確認テスト、復習ゲーム、マイページ、AI会話、AIスピーキング、企業コードログイン等を提供するオンライン学習サービスです。</p>
        <p style={legalStyles.p}>当社は、学習効果の向上、機能改善、審査対応、運営上の必要に応じて、サービス内容、表示、教材、料金、提供条件を変更する場合があります。</p>
      </LegalSection>

      <LegalSection title="第2条（アカウント登録）">
        <p style={legalStyles.p}>ユーザーは、正確な情報を用いて登録し、登録情報に変更がある場合は速やかに更新または当社へ連絡するものとします。</p>
        <p style={legalStyles.p}>アカウント、パスワード、企業コード等の管理責任はユーザーにあります。第三者による不正利用が疑われる場合は、速やかに当社へ連絡してください。</p>
      </LegalSection>

      <LegalSection title="第3条（無料体験・有料プラン・企業契約）">
        <ul style={legalStyles.ul}>
          <li>一般ユーザーは、登録後1日間、対象機能を無料で体験できます。</li>
          <li>有料プランは、30日・90日・180日の期間利用型プランです。原則として自動更新はありません。</li>
          <li>企業コードを用いて登録したユーザーは、当該企業の契約範囲内で企業契約ユーザーとして利用できます。</li>
          <li>企業契約が終了した場合、企業コードユーザーの利用権限が停止または変更される場合があります。</li>
          <li>AI会話・AIスピーキングは、購入内容または企業契約の範囲内で利用できます。</li>
        </ul>
      </LegalSection>

      <LegalSection title="第4条（決済）">
        <p style={legalStyles.p}>本サービスの決済はKOMOJU Checkoutを利用し、クレジットカード決済およびコンビニ決済に対応します。カード情報は当社のサーバーでは保持しません。</p>
        <p style={legalStyles.p}>コンビニ決済の場合、入金確認後に利用権限が反映されます。支払期限、支払方法、支払番号等はKOMOJUの画面または通知に従ってください。</p>
      </LegalSection>

      <LegalSection title="第5条（禁止事項）">
        <ul style={legalStyles.ul}>
          <li>教材、問題、解説、画面、AI出力内容等の無断転載、複製、販売、再配布</li>
          <li>アカウント、企業コード、ログイン情報の貸与、譲渡、共有、第三者利用</li>
          <li>不正アクセス、リバースエンジニアリング、過度なアクセス、システム妨害</li>
          <li>虚偽情報の登録、なりすまし、決済情報の不正利用</li>
          <li>AI機能に対して、法令違反、差別、暴力、性的表現、個人情報の不適切入力、その他不適切な内容を入力する行為</li>
          <li>その他、当社が不適切と判断する行為</li>
        </ul>
      </LegalSection>

      <LegalSection title="第6条（AI機能の利用）">
        <p style={legalStyles.p}>AI会話・AIスピーキングの回答、添削、評価、音声認識結果等は学習補助を目的とするものであり、正確性、完全性、特定目的への適合性を保証するものではありません。</p>
        <p style={legalStyles.p}>ユーザーは、AI機能に個人番号、健康情報、金融情報、パスワード、機密情報、第三者の個人情報等を入力しないものとします。</p>
        <p style={legalStyles.p}>AI機能は、外部AIサービスの仕様、障害、利用制限、法令対応等により、一時的に利用できない場合があります。</p>
      </LegalSection>

      <LegalSection title="第7条（企業管理機能）">
        <p style={legalStyles.p}>企業契約に基づく管理者は、所属学習者の学習状況、進捗、成績、最終学習日等を確認できる場合があります。企業コードユーザーは、この範囲で学習状況が企業管理者に表示されることに同意するものとします。</p>
      </LegalSection>

      <LegalSection title="第8条（知的財産権）">
        <p style={legalStyles.p}>本サービスに含まれる教材、問題、解説、デザイン、プログラム、ロゴ、文章、画像、音声その他一切のコンテンツに関する権利は、当社または正当な権利者に帰属します。</p>
      </LegalSection>

      <LegalSection title="第9条（利用停止・契約解除）">
        <p style={legalStyles.p}>当社は、ユーザーが本規約に違反した場合、不正利用が疑われる場合、決済の不備がある場合、その他運営上必要がある場合、事前通知なく利用停止、権限変更、アカウント削除等を行うことがあります。</p>
      </LegalSection>

      <LegalSection title="第10条（免責事項）">
        <p style={legalStyles.p}>当社は、本サービスに事実上または法律上の瑕疵がないこと、学習成果、試験合格、AI出力の正確性、端末・通信環境における完全な動作を保証しません。</p>
        <p style={legalStyles.p}>当社の責めに帰すべき事由がある場合を除き、本サービスの利用により発生した損害について、当社は責任を負いません。</p>
      </LegalSection>

      <LegalSection title="第11条（規約変更）">
        <p style={legalStyles.p}>当社は、必要に応じて本規約を変更できます。重要な変更がある場合は、本サービス上での表示その他適切な方法により通知します。</p>
      </LegalSection>

      <LegalSection title="第12条（準拠法・管轄）">
        <p style={legalStyles.p}>本規約は日本法に準拠します。本サービスに関して紛争が生じた場合、当社所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。</p>
      </LegalSection>

      <p style={legalStyles.note}>制定日：2026年6月28日</p>
    </LegalPage>
  )
}
