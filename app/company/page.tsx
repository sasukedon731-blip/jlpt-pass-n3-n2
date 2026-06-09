"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import AppHeader from "@/app/components/AppHeader"
import LegalFooter from "@/app/components/LegalFooter"
import { db } from "@/app/lib/firebase"
import { useAuth } from "@/app/lib/useAuth"

type Learner = { id: string; displayName?: string; email?: string; companyCode?: string; updatedAt?: any }

export default function CompanyPage() {
  const { user, loading } = useAuth()
  const [items, setItems] = useState<Learner[]>([])
  const [message, setMessage] = useState("企業管理者は、Firestoreの users/{uid}.role を company_admin にしてください。")

  useEffect(() => {
    ;(async () => {
      if (!user) return
      const userSnap = await getDocs(query(collection(db, "users"), where("email", "==", user.email ?? "")))
      const me = userSnap.docs[0]?.data() as any
      if (me?.role !== "company_admin") {
        setMessage("企業管理者アカウントでログインしてください。")
        return
      }
      const code = me?.companyCode || me?.managedCompanyCode
      if (!code) { setMessage("管理する企業コードが設定されていません。managedCompanyCode を設定してください。"); return }
      const snap = await getDocs(query(collection(db, "users"), where("companyCode", "==", code)))
      setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })))
      setMessage(`${code} の学習者一覧`)
    })()
  }, [user])

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <AppHeader title="企業管理画面" />
      <section style={{ maxWidth: 980, margin: "0 auto", padding: 20 }}>
        <h1>企業管理画面</h1>
        <p style={{ color: "#64748b" }}>{loading ? "読み込み中..." : message}</p>
        <div style={{ overflowX: "auto", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 18 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr><Th>名前</Th><Th>メール</Th><Th>企業コード</Th><Th>UID</Th></tr></thead>
            <tbody>{items.map((it) => <tr key={it.id}><Td>{it.displayName ?? "-"}</Td><Td>{it.email ?? "-"}</Td><Td>{it.companyCode ?? "-"}</Td><Td>{it.id}</Td></tr>)}</tbody>
          </table>
        </div>
        <LegalFooter />
      </section>
    </main>
  )
}
function Th({ children }: { children: React.ReactNode }) { return <th style={{ textAlign: "left", padding: 12, borderBottom: "1px solid #e2e8f0" }}>{children}</th> }
function Td({ children }: { children: React.ReactNode }) { return <td style={{ padding: 12, borderBottom: "1px solid #f1f5f9" }}>{children}</td> }
