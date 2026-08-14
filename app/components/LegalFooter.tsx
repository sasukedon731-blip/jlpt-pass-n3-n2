import Link from "next/link"

type Props = { compact?: boolean }

export default function LegalFooter({ compact = false }: Props) {
  return (
    <footer
      style={{
        marginTop: compact ? 20 : 32,
        padding: compact ? "14px 0 8px" : "20px 0 10px",
        borderTop: "1px solid rgba(17,24,39,.08)",
      }}
    >
      <nav aria-label="法務関連リンク" style={{ display: "flex", flexWrap: "wrap", gap: compact ? 10 : 12, alignItems: "center" }}>
        <FooterLink href="/legal/tokushoho">特定商取引法</FooterLink>
        <FooterLink href="/legal/terms">利用規約</FooterLink>
        <FooterLink href="/legal/privacy">プライバシーポリシー</FooterLink>
        <FooterLink href="/legal/refund">返金ポリシー</FooterLink>
        <FooterLink href="/cancel">利用期限・再購入について</FooterLink>
        <FooterLink href="/contact">お問い合わせ</FooterLink>
      </nav>
      <p style={{ marginTop: 12, fontSize: 12, lineHeight: 1.75, color: "rgba(17,24,39,.68)" }}>
        本サービスは JLPT PASS N3・N2 です。一般ユーザーは1日無料体験、企業コードユーザーは企業契約扱いで利用できます。カード情報は当アプリでは保持せず、外部の決済サービス上で処理されます。
      </p>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={{ fontSize: 13, fontWeight: 900, color: "#2563eb", textDecoration: "none" }}>
      {children}
    </Link>
  )
}
