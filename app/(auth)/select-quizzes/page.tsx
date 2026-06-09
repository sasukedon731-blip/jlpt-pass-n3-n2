"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SelectQuizzesPage() {
  const router = useRouter()
  useEffect(() => { router.replace("/select-mode") }, [router])
  return <main style={{ padding: 24 }}>教材選択画面へ移動しています...</main>
}
