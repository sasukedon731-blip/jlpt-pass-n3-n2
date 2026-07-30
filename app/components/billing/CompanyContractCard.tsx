export default function CompanyContractCard() {
  return (
    <section
      style={{
        border: "1px solid #bbf7d0",
        borderRadius: 20,
        padding: "clamp(16px,4vw,22px)",
        background: "linear-gradient(135deg,#f0fdf4,#ffffff)",
        boxShadow: "0 12px 30px rgba(21,128,61,.08)",
      }}
      aria-label="企業契約の利用状況"
    >
      <div style={{ color: "#15803d", fontSize: 12, fontWeight: 900, letterSpacing: ".08em" }}>
        ご利用状況
      </div>
      <h2 style={{ margin: "7px 0 0", color: "#0f172a", fontSize: "clamp(19px,5vw,25px)" }}>
        企業契約でご利用中です
      </h2>
      <p style={{ margin: "10px 0 0", color: "#475569", fontSize: 14, lineHeight: 1.8 }}>
        利用料金は企業契約に含まれているため、個人で購入する必要はありません。
      </p>
    </section>
  )
}
