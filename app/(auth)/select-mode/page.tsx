"use client"

import Link from "next/link"
import { useMemo } from "react"
import AppHeader from "@/app/components/AppHeader"
import LegalFooter from "@/app/components/LegalFooter"
import { quizzes } from "@/app/data/quizzes"
import type { QuizType } from "@/app/data/types"

export default function SelectModePage() {
  const items = useMemo(() => Object.values(quizzes), [])

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <AppHeader title="学習を始める" />
      <section style={{ maxWidth: 980, margin: "0 auto", padding: 20 }}>
        <div style={{ margin: "18px 0 22px" }}>
          <div style={{ fontSize: 13, color: "#2563eb", fontWeight: 900 }}>JLPT PASS N3・N2</div>
          <h1 style={{ margin: "8px 0", fontSize: 32 }}>教材を選択</h1>
          <p style={{ color: "#64748b", lineHeight: 1.8 }}>N3・N2の通常学習、模擬試験、復習に進めます。</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
          {items.map((quiz) => <QuizCard key={quiz.id} id={quiz.id} title={quiz.title} description={quiz.description ?? ""} />)}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginTop: 22 }}>
          <Mini href="/game" icon="🎮" title="ゲーム" desc="日本語バトルで楽しく復習" />
          <Mini href="/conversation" icon="💬" title="AI会話" desc="日本語で会話練習" />
          <Mini href="/speaking" icon="🎙️" title="AIスピーク" desc="発話練習と添削" />
          <Mini href="/mypage" icon="👤" title="マイページ" desc="学習履歴を確認" />
        </div>
        <LegalFooter />
      </section>
    </main>
  )
}

function QuizCard({ id, title, description }: { id: QuizType; title: string; description: string }) {
  return (
    <article style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 24, padding: 18, boxShadow: "0 12px 30px rgba(15,23,42,.06)" }}>
      <h2 style={{ margin: 0 }}>{title}</h2>
      <p style={{ color: "#64748b", lineHeight: 1.7 }}>{description}</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Link href={`/normal?type=${id}`} style={btnMain}>通常学習</Link>
        <Link href={`/exam?type=${id}`} style={btnSub}>模擬試験</Link>
        <Link href={`/review?type=${id}`} style={btnSub}>復習</Link>
      </div>
    </article>
  )
}

function Mini({ href, icon, title, desc }: { href: string; icon: string; title: string; desc: string }) {
  return <Link href={href} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, padding: 16, textDecoration: "none", color: "#0f172a" }}><div style={{ fontSize: 26 }}>{icon}</div><b>{title}</b><p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 13 }}>{desc}</p></Link>
}

const btnMain: React.CSSProperties = { padding: "10px 12px", borderRadius: 12, background: "#2563eb", color: "#fff", textDecoration: "none", fontWeight: 900 }
const btnSub: React.CSSProperties = { padding: "10px 12px", borderRadius: 12, border: "1px solid #cbd5e1", color: "#0f172a", textDecoration: "none", fontWeight: 900 }
