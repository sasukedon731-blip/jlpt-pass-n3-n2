"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { auth, db } from "@/app/lib/firebase"
import { buildCompanyBilling } from "@/app/lib/companyAccount"
import { buildEntitledQuizTypes } from "@/app/lib/plan"

type CompanyDoc = {
  name?: string
  inviteEnabled?: boolean
}

function getErrorMessage(error: unknown) {
  const code = typeof error === "object" && error && "code" in error ? String(error.code) : ""
  if (code === "auth/invalid-email") return "メールアドレスの形式が正しくありません。"
  if (["auth/invalid-credential", "auth/wrong-password", "auth/user-not-found"].includes(code)) {
    return "メールアドレスまたはパスワードが違います。"
  }
  if (code === "auth/too-many-requests") return "試行回数が多いため一時的に制限されています。少し待ってからお試しください。"
  return "ログインに失敗しました。時間をおいて再度お試しください。"
}

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [companyCode, setCompanyCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    setLoading(true)

    const trimmedEmail = email.trim()
    const trimmedCompanyCode = companyCode.trim()

    if (!trimmedEmail) { setError("メールアドレスを入力してください。"); setLoading(false); return }
    if (!password) { setError("パスワードを入力してください。"); setLoading(false); return }

    try {
      let companyData: CompanyDoc | null = null

      if (trimmedCompanyCode) {
        const companySnap = await getDoc(doc(db, "companies", trimmedCompanyCode))
        if (!companySnap.exists() || companySnap.data()?.inviteEnabled === false) {
          throw new Error("企業コードが見つからない、または利用停止中です。")
        }
        companyData = companySnap.data() as CompanyDoc
      }

      const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, password)

      if (companyData) {
        const uid = userCredential.user.uid
        try {
          await setDoc(
            doc(db, "users", uid),
            {
              uid,
              email: userCredential.user.email ?? trimmedEmail,
              plan: "company",
              selectedQuizTypes: buildEntitledQuizTypes("company"),
              schemaVersion: 4,
              companyCode: trimmedCompanyCode,
              companyName: companyData.name ?? null,
              accountType: "company",
              billing: buildCompanyBilling(true),
              updatedAt: serverTimestamp(),
            },
            { merge: true }
          )
        } catch (linkError) {
          console.error(linkError)
          await signOut(auth)
          throw new Error("ログインは成功しましたが、企業コードの紐づけに失敗しました。時間をおいて再度お試しください。")
        }
      }

      router.push("/")
    } catch (err) {
      console.error(err)
      if (err instanceof Error && err.message.includes("企業コード")) setError(err.message)
      else setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg,#eef2ff,#f8fafc)", padding: 24 }}>
      <section style={{ maxWidth: 440, margin: "40px auto", background: "#fff", padding: 24, borderRadius: 24, boxShadow: "0 18px 45px rgba(15,23,42,.10)" }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ fontSize: 13, fontWeight: 900, color: "#2563eb" }}>JLPT PASS N3・N2</div>
          <h1 style={{ margin: "6px 0" }}>ログイン</h1>
          <p style={{ margin: 0, color: "#64748b", fontSize: 13 }}>Japanese Study App</p>
        </div>

        <form onSubmit={handleLogin}>
          <Input placeholder="メールアドレス" value={email} onChange={setEmail} type="email" autoComplete="email" />
          <Input placeholder="パスワード" value={password} onChange={setPassword} type="password" autoComplete="current-password" />
          <Input placeholder="企業コード（任意）" value={companyCode} onChange={setCompanyCode} autoComplete="organization" />

          <p style={{ margin: "6px 0 14px", color: "#64748b", fontSize: 12, lineHeight: 1.7 }}>
            企業コードを入力してログインすると、アカウントを企業契約に紐づけます。個人ユーザーは空欄のままログインできます。
          </p>

          {error && <p style={{ color: "#dc2626", fontWeight: 800, fontSize: 13 }}>{error}</p>}

          <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px 14px", borderRadius: 14, border: "none", background: "#2563eb", color: "#fff", fontWeight: 900, cursor: loading ? "default" : "pointer" }}>
            {loading ? "ログイン中..." : "ログイン"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13 }}>
          アカウントをお持ちでない方は <Link href="/register">新規登録</Link>
        </p>
      </section>
    </main>
  )
}

function Input({
  placeholder,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  placeholder: string
  value: string
  onChange: (value: string) => void
  type?: string
  autoComplete?: string
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      autoComplete={autoComplete}
      style={{ width: "100%", padding: "12px 14px", marginBottom: 10, borderRadius: 14, border: "1px solid #dbe3ef", boxSizing: "border-box" }}
    />
  )
}
