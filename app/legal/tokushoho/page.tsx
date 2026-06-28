import type React from "react"
import AppHeader from "@/app/components/AppHeader"
import LegalFooter from "@/app/components/LegalFooter"

export default function TokushohoPage() {
  return (
    <LegalPage title="特定商取引法に基づく表記">
      <Row k="販売事業者" v="株式会社アウトインプラス" />
      <Row k="運営責任者" v="高野 倫之" />
      <Row k="所在地" v="東京都渋谷区道玄坂1丁目10-8 渋谷道玄坂東急ビル2F-C" />
      <Row k="電話番号" v="03-6820-3675" />
      <Row k="メールアドレス" v="support@outin-plus.com" />
      <Row k="サービス名" v="JLPT PASS N3・N2 Japanese Study App" />
      <Row
        k="サービス内容"
        v="日本語能力試験N3・N2レベルの学習教材、確認テスト、ゲーム形式の復習機能、マイページ機能等を提供するオンライン学習サービスです。"
      />
      <Row
        k="販売価格"
        v="各購入画面に表示された金額（税込）です。基本プランは500円（税込）です。選択した利用期間・オプションにより金額が異なる場合があります。"
      />
      <Row
        k="販売価格以外に必要な費用"
        v="インターネット接続に必要な通信料、パケット通信料等はお客様のご負担となります。"
      />
      <Row k="支払方法" v="KOMOJU Checkoutによるクレジットカード決済・コンビニ決済" />
      <Row
        k="支払時期"
        v="クレジットカード決済は購入時に決済されます。コンビニ決済は購入手続き後、指定された支払期限内にお支払いください。"
      />
      <Row
        k="サービス提供時期"
        v="クレジットカード決済は決済完了後、コンビニ決済は入金確認後、速やかにサービスをご利用いただけます。"
      />
      <Row
        k="利用期間"
        v="購入画面で選択した利用期間（30日・90日・180日等）中ご利用いただけます。利用期間終了後に継続して利用する場合は、再度購入が必要です。"
      />
      <Row
        k="自動更新について"
        v="本サービスは、原則として自動更新されません。利用期間終了後に継続利用する場合は、お客様ご自身で再購入手続きを行ってください。"
      />
      <Row
        k="返品・返金・キャンセル"
        v="デジタルコンテンツの性質上、決済完了後のお客様都合による返品・返金・キャンセルはお受けできません。ただし、法令に基づく場合または当社の責めに帰すべき事由によりサービスが提供できない場合は、この限りではありません。"
      />
      <Row
        k="中途解約"
        v="利用期間中にお客様の都合で利用を停止された場合でも、日割り計算による返金は行いません。"
      />
      <Row
        k="動作環境"
        v="スマートフォン、タブレット、PCの最新版ブラウザ（Google Chrome、Safari、Microsoft Edge等）での利用を推奨します。PWAとしてホーム画面追加に対応しています。"
      />
      <Row
        k="個人情報の取扱い"
        v="個人情報の取扱いについては、当社のプライバシーポリシーをご確認ください。"
      />
      <Row
        k="お問い合わせ"
        v="本サービスに関するお問い合わせは、メール（support@outin-plus.com）またはお問い合わせフォームよりご連絡ください。"
      />
      <Notice>
        掲載内容は、サービス内容・料金体系・決済方法等の変更に応じて、必要により改定します。
      </Notice>
    </LegalPage>
  )
}

function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <AppHeader title={title} />
      <section style={{ maxWidth: 920, margin: "0 auto", padding: 20 }}>
        <h1 style={{ fontSize: 28, margin: "18px 0" }}>{title}</h1>
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 18,
            padding: 24,
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
          }}
        >
          {children}
        </div>
        <LegalFooter />
      </section>
    </main>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <p style={{ lineHeight: 1.9, margin: "0 0 14px" }}>
      <b>{k}：</b>
      {v}
    </p>
  )
}

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        marginTop: 22,
        paddingTop: 18,
        borderTop: "1px solid #e2e8f0",
        color: "#475569",
        lineHeight: 1.8,
      }}
    >
      {children}
    </p>
  )
}
