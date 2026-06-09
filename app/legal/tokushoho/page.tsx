import AppHeader from "@/app/components/AppHeader"
import LegalFooter from "@/app/components/LegalFooter"

export default function TokushohoPage() {
  return <LegalPage title="特定商取引法に基づく表記">
    <Row k="販売事業者" v="株式会社アウトインプラス" />
    <Row k="責任者" v="高野 倫之" />
    <Row k="所在地" v="東京都渋谷区道玄坂１丁目１０－８ 渋谷道玄坂東急ビル２F-C" />
    <Row k="電話番号" v="03-6820-3675" />
    <Row k="メールアドレス" v="support@outin-plus.com" />
    <Row k="サービス名" v="JLPT PASS N3・N2 Japanese Study App" />
    <Row k="販売価格" v="購入画面に表示された金額（税込）" />
    <Row k="支払方法" v="KOMOJU Checkoutによるカード決済・コンビニ決済" />
    <Row k="サービス提供時期" v="カード決済は決済完了後、コンビニ決済は入金確認後に利用できます。" />
    <Row k="動作環境" v="スマートフォン・PCの最新ブラウザ。PWAとしてホーム画面追加に対応しています。" />
  </LegalPage>
}
function LegalPage({ title, children }: { title: string; children: React.ReactNode }) { return <main style={{ minHeight: "100vh", background: "#f8fafc" }}><AppHeader title={title} /><section style={{ maxWidth: 840, margin: "0 auto", padding: 20 }}><h1>{title}</h1><div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 18, padding: 20 }}>{children}</div><LegalFooter /></section></main> }
function Row({ k, v }: { k: string; v: string }) { return <p style={{ lineHeight: 1.9 }}><b>{k}：</b>{v}</p> }
