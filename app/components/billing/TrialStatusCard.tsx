"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { isCompanyAccount } from "@/app/lib/companyAccount"

type DateLike =
  | Date
  | string
  | number
  | { seconds?: number; nanoseconds?: number; toDate?: () => Date }
  | null
  | undefined

export type TrialProfile = {
  plan?: string | null
  accountType?: string | null
  companyCode?: string | null
  trialStartedAt?: DateLike
  trialStartsAt?: DateLike
  trialStartAt?: DateLike
  trialEndsAt?: DateLike
  trialEndAt?: DateLike
  billing?: {
    status?: string | null
    currentPlan?: string | null
    accountType?: string | null
    method?: string | null
    trialStartedAt?: DateLike
    trialStartsAt?: DateLike
    trialStartAt?: DateLike
    trialEndsAt?: DateLike
    trialEndAt?: DateLike
  } | null
}

type TrialState =
  | { kind: "hidden" }
  | { kind: "checking"; end: Date }
  | { kind: "active"; end: Date; remainingMinutes: number }
  | { kind: "expired"; end: Date }
  | { kind: "invalid" }

function normalizeDate(value: DateLike): Date | null {
  if (!value) return null
  try {
    let date: Date
    if (value instanceof Date) date = value
    else if (typeof value === "object" && typeof value.toDate === "function") date = value.toDate()
    else if (typeof value === "object" && typeof value.seconds === "number") {
      date = new Date(value.seconds * 1000)
    } else if (typeof value === "number") {
      date = new Date(value < 100_000_000_000 ? value * 1000 : value)
    } else if (typeof value === "string") date = new Date(value)
    else return null
    return Number.isNaN(date.getTime()) ? null : date
  } catch {
    return null
  }
}

function trialEnd(profile: TrialProfile) {
  return normalizeDate(
    profile.trialEndsAt ??
      profile.trialEndAt ??
      profile.billing?.trialEndsAt ??
      profile.billing?.trialEndAt,
  )
}

function getTrialState(profile: TrialProfile, now: number | null): TrialState {
  const accountType = profile.billing?.accountType ?? profile.accountType
  const plan = profile.billing?.currentPlan ?? profile.plan
  const status = profile.billing?.status

  if (isCompanyAccount(profile) || accountType === "company" || plan === "company") return { kind: "hidden" }
  if (plan === "paid" || status === "active" || status === "pending" || status === "past_due" || status === "canceled") {
    return { kind: "hidden" }
  }
  if (plan !== "trial" && status !== "trialing" && status !== "expired") return { kind: "hidden" }

  const end = trialEnd(profile)
  if (!end) return { kind: "invalid" }
  if (now == null) return { kind: "checking", end }
  if (status !== "trialing" || end.getTime() <= now) return { kind: "expired", end }

  return {
    kind: "active",
    end,
    remainingMinutes: Math.max(0, Math.ceil((end.getTime() - now) / 60_000)),
  }
}

function formatEnd(date: Date) {
  const parts = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date)
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? ""
  return `${value("year")}年${value("month")}月${value("day")}日 ${value("hour")}:${value("minute")}`
}

function remainingLabel(minutes: number) {
  const safeMinutes = Math.max(0, minutes)
  const hours = Math.floor(safeMinutes / 60)
  const rest = safeMinutes % 60
  return `残り${hours}時間${rest}分`
}

export default function TrialStatusCard({
  profile,
  showPlansLink = false,
}: {
  profile: TrialProfile
  showPlansLink?: boolean
}) {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    const update = () => setNow(Date.now())
    const initialTimer = window.setTimeout(update, 0)
    const interval = window.setInterval(update, 60_000)
    return () => {
      window.clearTimeout(initialTimer)
      window.clearInterval(interval)
    }
  }, [])

  const state = useMemo(() => getTrialState(profile, now), [now, profile])
  if (state.kind === "hidden") return null

  if (state.kind === "checking") {
    return (
      <section style={cardStyle} aria-live="polite">
        <div style={eyebrowStyle}>ご利用状況</div>
        <h2 style={titleStyle}>無料体験状況を確認中...</h2>
      </section>
    )
  }

  if (state.kind === "active") {
    return (
      <section style={cardStyle} aria-label="無料体験の利用状況">
        <div style={eyebrowStyle}>ご利用状況</div>
        <h2 style={titleStyle}>1日無料体験中</h2>
        <div style={remainingStyle} aria-live="polite">{remainingLabel(state.remainingMinutes)}</div>
        <p style={detailStyle}>無料体験終了：{formatEnd(state.end)}</p>
      </section>
    )
  }

  if (state.kind === "expired") {
    return (
      <section style={{ ...cardStyle, borderColor: "#fecaca", background: "#fff7f7" }} aria-label="無料体験の終了状況">
        <div style={{ ...eyebrowStyle, color: "#b91c1c" }}>ご利用状況</div>
        <h2 style={titleStyle}>無料体験は終了しました</h2>
        <p style={detailStyle}>無料体験終了：{formatEnd(state.end)}</p>
        <p style={detailStyle}>プランを購入すると学習を再開できます。</p>
        {showPlansLink ? <Link href="/plans" style={linkStyle}>プランを確認する</Link> : null}
      </section>
    )
  }

  return (
    <section style={cardStyle} aria-label="無料体験の利用状況">
      <div style={eyebrowStyle}>ご利用状況</div>
      <h2 style={titleStyle}>無料体験の終了日時を確認できません</h2>
      <p style={detailStyle}>プラン画面をご確認ください。問題が続く場合はお問い合わせください。</p>
      {showPlansLink ? <Link href="/plans" style={linkStyle}>プランを確認する</Link> : null}
    </section>
  )
}

const cardStyle: React.CSSProperties = {
  border: "1px solid #bfdbfe",
  borderRadius: 20,
  padding: "clamp(16px,4vw,22px)",
  background: "linear-gradient(135deg,#eff6ff,#ffffff)",
  boxShadow: "0 12px 30px rgba(37,99,235,.08)",
}

const eyebrowStyle: React.CSSProperties = {
  color: "#1d4ed8",
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: ".08em",
}

const titleStyle: React.CSSProperties = {
  margin: "7px 0 0",
  color: "#0f172a",
  fontSize: "clamp(19px,5vw,25px)",
}

const remainingStyle: React.CSSProperties = {
  marginTop: 13,
  color: "#1d4ed8",
  fontSize: "clamp(26px,7vw,38px)",
  fontWeight: 950,
  lineHeight: 1.2,
}

const detailStyle: React.CSSProperties = {
  margin: "10px 0 0",
  color: "#475569",
  fontSize: 14,
  lineHeight: 1.7,
}

const linkStyle: React.CSSProperties = {
  display: "inline-flex",
  marginTop: 14,
  padding: "10px 14px",
  borderRadius: 12,
  background: "#2563eb",
  color: "#fff",
  fontWeight: 900,
  textDecoration: "none",
}
