"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from "firebase/firestore"

import AppHeader from "@/app/components/AppHeader"
import LegalFooter from "@/app/components/LegalFooter"
import { auth, db } from "@/app/lib/firebase"
import { getQuizDef } from "@/app/data/quizCatalog"

type UserDoc = { displayName?: string; email?: string; role?: string; companyCode?: string | null; companyName?: string | null }
type ResultDoc = { score?: number; total?: number; correctCount?: number; totalQuestions?: number; accuracy?: number; quizType?: string; mode?: string; createdAt?: any }
type ProgressDoc = { quizType?: string; totalSessions?: number; streak?: number; bestStreak?: number; lastStudyDate?: string; lastStudiedAt?: any; updatedAt?: any }
function sleep(ms: number) { return new Promise((resolve) => window.setTimeout(resolve, ms)) }
async function getUserDocWithRetry(uid: string, maxRetry = 5) { for (let i=0;i<maxRetry;i++){ const snap=await getDoc(doc(db,"users",uid)); if(snap.exists()) return snap; await sleep(250*(i+1)) } return getDoc(doc(db,"users",uid)) }
function formatDate(value: any) { if(!value) return "—"; try { const d = typeof value?.toDate === "function" ? value.toDate() : new Date(value); return Number.isNaN(d.getTime()) ? "—" : d.toLocaleString("ja-JP") } catch { return "—" } }
function accuracy(r: ResultDoc) { if (typeof r.accuracy === "number") return r.accuracy; if (typeof r.correctCount === "number" && typeof r.totalQuestions === "number" && r.totalQuestions > 0) return (r.correctCount/r.totalQuestions)*100; if (typeof r.score === "number" && typeof r.total === "number" && r.total > 0) return (r.score/r.total)*100; return null }
function percent(v: number | null) { return v == null || Number.isNaN(v) ? "—" : `${Math.round(v)}%` }
function quizLabel(q?: string) { return q ? (getQuizDef(q)?.title ?? ({"japanese-n5":"日本語検定 N5","japanese-n4":"日本語検定 N4","japanese-n3":"日本語検定 N3","japanese-n2":"日本語検定 N2"} as Record<string,string>)[q] ?? q) : "未設定" }

export default function CompanyLearnerDetailPage() {
  const params = useParams(); const router = useRouter(); const targetUid = String(params?.uid ?? "")
  const [loading,setLoading]=useState(true); const [error,setError]=useState(""); const [userData,setUserData]=useState<UserDoc|null>(null); const [results,setResults]=useState<ResultDoc[]>([]); const [progress,setProgress]=useState<ProgressDoc[]>([])
  useEffect(()=>{ const unsub=onAuthStateChanged(auth, async (firebaseUser)=>{ if(!firebaseUser){router.replace("/company/login"); return} try{ setLoading(true); setError(""); const viewerSnap=await getUserDocWithRetry(firebaseUser.uid); const viewer=viewerSnap.exists()?viewerSnap.data() as UserDoc:null; if(!viewer || (viewer.role!=="admin" && viewer.role!=="company_admin")){ setError("この画面を見る権限がありません。"); return } const targetSnap=await getDoc(doc(db,"users",targetUid)); if(!targetSnap.exists()){ setError("学習者が見つかりません。"); return } const target=targetSnap.data() as UserDoc; if(viewer.role==="company_admin" && target.companyCode !== viewer.companyCode){ setError("この学習者を見る権限がありません。"); return } setUserData(target); const resultsRef=collection(db,"users",targetUid,"results"); try{ const s=await getDocs(query(resultsRef,orderBy("createdAt","desc"),limit(20))); setResults(s.docs.map(d=>d.data() as ResultDoc)) }catch{ const s=await getDocs(resultsRef); setResults(s.docs.map(d=>d.data() as ResultDoc)) } const p=await getDocs(collection(db,"users",targetUid,"progress")); setProgress(p.docs.map(d=>({quizType:d.id,...(d.data() as ProgressDoc)}))) }catch(e){ console.error(e); setError("学習者データの読み込みに失敗しました。") } finally{ setLoading(false) } }); return ()=>unsub() },[router,targetUid])
  const accs=results.map(accuracy).filter((v):v is number=>typeof v==="number"); const avg=accs.length?accs.reduce((a,b)=>a+b,0)/accs.length:null; const sessions=progress.reduce((s,p)=>s+(p.totalSessions??0),0)+results.length
  return <main style={{minHeight:"100vh",background:"#f8fafc",color:"#0f172a"}}><AppHeader title="学習者詳細"/><section style={{maxWidth:980,margin:"0 auto",padding:20}}><Link href="/company" style={{color:"#2563eb",fontWeight:900,textDecoration:"none"}}>← 企業管理画面へ戻る</Link><h1>{userData?.displayName || userData?.email || "学習者詳細"}</h1>{loading?<p>読み込み中...</p>:null}{error?<div style={{padding:14,borderRadius:16,border:"1px solid #fecaca",background:"#fef2f2",color:"#dc2626"}}>{error}</div>:null}{!error?<><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12,margin:"16px 0"}}><Stat title="メール" value={userData?.email||"—"}/><Stat title="学習回数" value={`${sessions}`}/><Stat title="平均正答率" value={percent(avg)}/><Stat title="企業コード" value={userData?.companyCode||"—"}/></div><h2>進捗</h2><div style={{display:"grid",gap:10}}>{progress.map(p=><div key={p.quizType} style={card}><b>{quizLabel(p.quizType)}</b><span>学習回数: {p.totalSessions??0}</span><span>連続学習: {p.streak??0}</span><span>最終学習: {formatDate(p.lastStudiedAt??p.updatedAt??p.lastStudyDate)}</span></div>)}</div><h2>最近の結果</h2><div style={{display:"grid",gap:10}}>{results.slice(0,20).map((r,i)=><div key={i} style={card}><b>{quizLabel(r.quizType)}</b><span>正答率: {percent(accuracy(r))}</span><span>モード: {r.mode||"—"}</span><span>日時: {formatDate(r.createdAt)}</span></div>)}</div></>:null}<LegalFooter/></section></main>
}
function Stat({title,value}:{title:string;value:string}){return <div style={{padding:16,borderRadius:18,border:"1px solid #e2e8f0",background:"#fff"}}><div style={{fontSize:12,color:"#64748b",fontWeight:900}}>{title}</div><div style={{marginTop:6,fontWeight:900}}>{value}</div></div>}
const card:React.CSSProperties={display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10,padding:14,borderRadius:18,border:"1px solid #e2e8f0",background:"#fff"}
