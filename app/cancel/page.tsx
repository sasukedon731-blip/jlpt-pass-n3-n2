import type React from "react"
import Link from "next/link"

import LegalPage, { LegalSection, legalStyles } from "@/app/components/LegalPage"

export const metadata = {
  title: "利用期限・再購入について | JLPT PASS N3・N2",
}

export default function CancelPage() {
  return (
    <LegalPage
      title="利用期限・再購入について"
      lead="本サービスは、月額サブスクリプションではなく期間利用型の買い切りプランです。"
    >
      <p style={legalStyles.lead}>
        JLPT PASS N3・N2は、30日・90日・180日から利用期間を選択して購入する期間利用型サービスです。原則として自動更新はありません。
      </p>

      <div style={legalStyles.note}>
        <b>このページの要点</b>
        <ul style={{ ...legalStyles.ul, marginBottom: 0 }}>
          <li>自動更新はありません。</li>
          <li>解約手続きは不要です。</li>
          <li>利用期間が終わると、有料機能は停止します。</li>
          <li>継続したい場合は、プランページから再購入してください。</li>
          <li>企業コードユーザーは、企業契約が有効な範囲で利用できます。</li>
        </ul>
      </div>

      <LegalSection title="利用期間が終わったらどうなるか">
        <p style={legalStyles.p}>購入した30日・90日・180日の利用期間が終了すると、N3・N2学習、復習ゲーム、AI会話、AIスピーキング等の有料機能は、購入内容に応じて利用できなくなります。</p>
        <p style={legalStyles.p}>無料体験または無料で使える範囲がある場合は、その範囲のみ利用できます。</p>
      </LegalSection>

      <LegalSection title="途中で利用をやめたい場合">
        <p style={legalStyles.p}>本サービスは月額課金の自動更新サービスではないため、サブスクリプションの解約手続きはありません。購入済みの利用期間が終了しても、自動で追加請求されることはありません。</p>
        <p style={legalStyles.p}>利用期間中にお客様都合で利用を停止した場合でも、日割り返金は行いません。詳しくは返金ポリシーをご確認ください。</p>
      </LegalSection>

      <LegalSection title="再度使いたい場合">
        <p style={legalStyles.p}>利用期間終了後に継続利用したい場合は、プランページから希望の期間（30日・90日・180日）を選択して再購入してください。AI会話・AIスピーキングを利用する場合は、AI追加オプションの選択が必要です。</p>
      </LegalSection>

      <LegalSection title="企業コードユーザーの場合">
        <p style={legalStyles.p}>企業コードで登録したユーザーは、企業契約の範囲内で利用できます。企業契約が終了した場合、または企業コードの利用条件が変更された場合は、利用権限が停止または変更される場合があります。</p>
      </LegalSection>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
        <Link href="/plans" style={primaryBtn}>プランを見る</Link>
        <Link href="/legal/refund" style={secondaryBtn}>返金ポリシーを見る</Link>
      </div>
    </LegalPage>
  )
}

const primaryBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 18px",
  borderRadius: 14,
  background: "#2563eb",
  color: "#fff",
  textDecoration: "none",
  fontWeight: 950,
}

const secondaryBtn: React.CSSProperties = {
  ...primaryBtn,
  background: "#eff6ff",
  color: "#2563eb",
  border: "1px solid #bfdbfe",
}
