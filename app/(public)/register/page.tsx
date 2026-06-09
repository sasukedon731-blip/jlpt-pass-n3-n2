"use client"

import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp, Timestamp } from "firebase/firestore"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { auth, db } from "@/app/lib/firebase"
import { buildEntitledQuizTypes } from "@/app/lib/plan"

export default function RegisterPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [companyCode, setCompanyCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    setError("")
    setLoading(true)

    if (!username.trim()) { setError("ユーザーネームを入力してください"); setLoading(false); return }
    if (!email.trim()) { setError("メールアドレスを入力してください"); setLoading(false); return }
    if (!password || password.length < 6) { setError("パスワードは6文字以上で入力してください"); setLoading(false); return }

    try {
      let companyData: any = null
      const code = companyCode.trim()
      if (code) {
        const companySnap = await getDoc(doc(db, "companies", code))
        if (!companySnap.exists() || companySnap.data()?.inviteEnabled === false) {
          throw new Error("企業コードが見つからない、または利用停止中です")
        }
        companyData = companySnap.data()
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(userCredential.user, { displayName: username })
      const uid = userCredential.user.uid
      const selectedQuizTypes = buildEntitledQuizTypes(companyData ? "company" : "trial")

      await setDoc(doc(db, "users", uid), {
        uid,
        email: userCredential.user.email ?? email,
        displayName: username,
        role: "user",
        plan: companyData ? "company" : "trial",
        selectedQuizTypes,
        schemaVersion: 4,
        companyCode: companyData ? code : null,
        companyName: companyData?.name ?? null,
        accountType: companyData ? "company" : "personal",
        billing: companyData
          ? {
              accountType: "company",
              method: "company_code",
              status: "active",
              currentPlan: "company",
              currentPeriodEnd: null,
              aiConversationEnabled: true,
              aiSpeakingEnabled: true,
            }
          : {
              accountType: "personal",
              method: "manual",
              status: "trialing",
              currentPlan: "trial",
              trialStartAt: serverTimestamp(),
              trialEndAt: Timestamp.fromDate(new Date(Date.now() + 24 * 60 * 60 * 1000)),
              currentPeriodEnd: null,
              aiConversationEnabled: true,
              aiSpeakingEnabled: true,
            },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })

      router.push("/")
    } catch (err: any) {
      console.error(err)
      const code = err?.code ?? ""
      if (code === "auth/email-already-in-use") setError("このメールアドレスは既に登録されています")
      else if (code === "auth/invalid-email") setError("メールアドレスの形式が正しくありません")
      else if (code === "auth/weak-password") setError("パスワードが弱すぎます（6文字以上）")
      else setError(err?.message || code || "登録に失敗しました")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg,#eef2ff,#f8fafc)", padding: 24 }}>
      <section style={{ maxWidth: 440, margin: "40px auto", background: "#fff", padding: 24, borderRadius: 24, boxShadow: "0 18px 45px rgba(15,23,42,.10)" }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ fontSize: 13, fontWeight: 900, color: "#2563eb" }}>JLPT PASS N3・N2</div>
          <h1 style={{ margin: "6px 0" }}>新規登録</h1>
          <p style={{ margin: 0, color: "#64748b", fontSize: 13 }}>Japanese Study App</p>
        </div>

        <Input placeholder="ユーザーネーム" value={username} onChange={setUsername} />
        <Input placeholder="メールアドレス" value={email} onChange={setEmail} type="email" />
        <Input placeholder="パスワード（6文字以上）" value={password} onChange={setPassword} type="password" />
        <Input placeholder="企業コード（任意）" value={companyCode} onChange={setCompanyCode} />

        <p style={{ margin: "6px 0 14px", color: "#64748b", fontSize: 12, lineHeight: 1.7 }}>
          個人ユーザーは1日無料体験から開始します。企業コードを入力した場合は、最初から企業契約として利用できます。
        </p>

        {error && <p style={{ color: "#dc2626", fontWeight: 800, fontSize: 13 }}>{error}</p>}

        <button onClick={handleRegister} disabled={loading} style={{ width: "100%", padding: "12px 14px", borderRadius: 14, border: "none", background: "#2563eb", color: "#fff", fontWeight: 900 }}>
          {loading ? "登録中..." : "登録して始める"}
        </button>

        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13 }}>
          すでにアカウントをお持ちですか？ <Link href="/login">ログイン</Link>
        </p>
      </section>
    </main>
  )
}

function Input({ placeholder, value, onChange, type = "text" }: { placeholder: string; value: string; onChange: (v: string) => void; type?: string }) {
  return <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", padding: "12px 14px", marginBottom: 10, borderRadius: 14, border: "1px solid #dbe3ef", boxSizing: "border-box" }} />
}
