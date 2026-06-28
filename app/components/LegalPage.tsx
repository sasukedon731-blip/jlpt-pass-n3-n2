import type React from "react"

import AppHeader from "@/app/components/AppHeader"
import LegalFooter from "@/app/components/LegalFooter"

export const legalStyles = {
  card: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 22,
    padding: 24,
    boxShadow: "0 18px 42px rgba(15, 23, 42, 0.06)",
  },
  lead: {
    margin: "0 0 18px",
    color: "#334155",
    lineHeight: 1.9,
  },
  h2: {
    margin: "24px 0 8px",
    fontSize: 20,
    fontWeight: 950,
    color: "#0f172a",
  },
  p: {
    margin: "0 0 12px",
    lineHeight: 1.9,
    color: "#334155",
  },
  ul: {
    margin: "8px 0 14px",
    paddingLeft: 22,
    lineHeight: 1.9,
    color: "#334155",
  },
  note: {
    marginTop: 18,
    padding: 16,
    borderRadius: 16,
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    lineHeight: 1.85,
    color: "#475569",
  },
} satisfies Record<string, React.CSSProperties>

type LegalPageProps = {
  title: string
  lead?: string
  children: React.ReactNode
}

export default function LegalPage({ title, lead, children }: LegalPageProps) {
  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", color: "#0f172a" }}>
      <AppHeader title={title} />
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "20px 18px 40px" }}>
        <div style={{ margin: "18px 0 20px" }}>
          <div style={{ fontSize: 13, color: "#2563eb", fontWeight: 950 }}>JLPT PASS N3・N2</div>
          <h1 style={{ margin: "8px 0", fontSize: 30, fontWeight: 950 }}>{title}</h1>
          {lead ? <p style={{ margin: 0, color: "#64748b", lineHeight: 1.8 }}>{lead}</p> : null}
        </div>
        <article style={legalStyles.card}>{children}</article>
        <LegalFooter />
      </section>
    </main>
  )
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 style={legalStyles.h2}>{title}</h2>
      {children}
    </section>
  )
}

export function LegalRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(150px, 220px) 1fr",
        gap: 14,
        padding: "14px 0",
        borderBottom: "1px solid #e2e8f0",
        lineHeight: 1.8,
      }}
    >
      <div style={{ fontWeight: 950, color: "#0f172a" }}>{label}</div>
      <div style={{ color: "#334155" }}>{children}</div>
    </div>
  )
}
