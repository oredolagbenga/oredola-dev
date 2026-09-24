"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme, THEMES, Theme } from "@/components/ThemeProvider"

export const dynamic = 'force-dynamic'
type Tab = "overview" | "serp" | "optimizer" | "schema"

export default function RankEnginePage() {
  const { theme, setTheme } = useTheme()
  const t = THEMES[theme]

  const [tab, setTab] = useState<Tab>("overview")
  const [domain, setDomain] = useState("")
  const [keyword, setKeyword] = useState("")
  const [location, setLocation] = useState("")
  const [time, setTime] = useState("--:--")
  const [analyzing, setAnalyzing] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [score, setScore] = useState<number | null>(null)
  const [auditData, setAuditData] = useState<any>(null)

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-GB", { timeZone: "Africa/Lagos", hour: "2-digit", minute: "2-digit" }))
    tick()
    const id = setInterval(tick, 60000)
    return () => clearInterval(id)
  }, [])

  const handleAnalyze = async () => {
    if (!domain.trim()) {
      setLogs(["> Please enter your domain to begin", "> Example: oredola.dev or www.example.com"])
      return
    }
    setAnalyzing(true)
    setLogs([`> Auditing ${domain}...`])
    try {
      const finalUrl = domain.trim()
      const res = await fetch(`/api/audit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: finalUrl })
      })
      const data = await res.json()
      setLogs(data.logs || ["Audit completed"])
      setAuditData(data)
      if (data.score) setScore(+(1 + (data.score/100)*4).toFixed(1))
      else setScore(4.2)
    } catch (e:any) {
      setLogs([`> Audit failed: ${e.message}`])
    } finally {
      setAnalyzing(false)
    }
  }

  const waBg = "#25D366"
  const btnBg = theme === "light" ? "#0a0a0a" : "#ffffff"
  const btnFg = theme === "light" ? "#ffffff" : "#0a0a0a"

  return (
    <main className="min-h-screen antialiased" style={{ background: t.bg, color: t.fg }}>
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(${t.fg} 1px, transparent 1px), linear-gradient(90deg, ${t.fg} 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }} />

      <header className="sticky top-0 z-50 backdrop-blur-2xl border-b" style={{ background: `${t.bg}F2`, borderColor: t.border }}>
        <div className="mx-auto max-w-[1280px] px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="h-8 w-8 rounded-lg bg-black text-white grid place-items-center font-black text-sm">⌘</div>
            <span className="font-semibold text-[15px] tracking-tight">RankEngine</span>
            <span className="hidden lg:flex items-center gap-2 text-[11px] font-mono px-2.5 py-1 rounded-full border" style={{ borderColor: t.border, color: t.muted, background: t.card }}>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> 890 live
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center rounded-full border p-1 gap-0.5" style={{ background: t.card, borderColor: t.border }}>
              {(["dark","light","navy","sage"] as Theme[]).map((k) => (
                <button key={k} onClick={() => setTheme(k)} className="h-7 w-7 rounded-full text-[11px] font-bold uppercase grid place-items-center" style={{ background: theme===k? t.fg : "transparent", color: theme===k? t.bg : t.muted }}>{k[0]}</button>
              ))}
            </div>
            <Link href="/" className="h-8 w-8 rounded-full bg-black text-white grid place-items-center font-bold text-[11px]">OD</Link>
          </div>
        </div>
      </header>

      <div className="relative mx-auto max-w-[1280px] px-6 pt-10 pb-24">
        <div className="mb-8">
          <h1 className="text-[32px] md:text-[40px] font-bold tracking-tight leading-none">SEO audit, <span style={{ color: t.muted }}>without noise.</span></h1>
          <p className="mt-3 text-[14px] max-w-[560px] leading-relaxed" style={{ color: t.muted }}>Enter any domain with or without www. RankEngine auto-fixes https and www.</p>
        </div>

        <div className="rounded-[20px] border shadow-sm flex flex-col md:flex-row overflow-hidden" style={{ background: t.card, borderColor: t.border }}>
          <div className="flex-1 flex items-center gap-3 px-6 py-4 border-b md:border-b-0 md:border-r" style={{ borderColor: t.border }}>
            <span className="text-[16px]">🌐</span>
            <div className="w-full">
              <div className="text-[10px] font-mono font-semibold tracking-widest" style={{ color: t.muted }}>DOMAIN</div>
              <input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="Enter your domain e.g. www.example.com" className="mt-1 w-full bg-transparent outline-none text-[15px] font-medium" style={{ color: t.fg }} />
            </div>
          </div>
          <div className="flex-1 flex items-center gap-3 px-6 py-4 border-b md:border-b-0 md:border-r" style={{ borderColor: t.border }}>
            <span style={{ color: t.muted }}>⌕</span>
            <div className="w-full">
              <div className="text-[10px] font-mono font-semibold tracking-widest" style={{ color: t.muted }}>KEYWORD</div>
              <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Enter keyword e.g. seo agency lagos" className="mt-1 w-full bg-transparent outline-none text-[15px] font-medium" style={{ color: t.fg }} />
            </div>
          </div>
          <div className="flex-1 flex items-center gap-3 px-6 py-4">
            <span>📍</span>
            <div className="w-full">
              <div className="text-[10px] font-mono font-semibold tracking-widest" style={{ color: t.muted }}>LOCATION</div>
              <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter location e.g. Lagos, NG" className="mt-1 w-full bg-transparent outline-none text-[15px] font-medium" style={{ color: t.fg }} />
            </div>
          </div>
          <div className="p-2.5 flex">
            <button onClick={handleAnalyze} disabled={analyzing} className="rounded-[12px] px-7 py-3 text-[14px] font-semibold flex items-center gap-2 disabled:opacity-50 hover:brightness-105 active:scale-[0.98] transition-all" style={{ background: waBg, color: "#fff" }}>
              💬 {analyzing ? "Auditing..." : "Analyze"}
            </button>
          </div>
        </div>

        <style>{`input::placeholder{color:${t.muted};opacity:0.75;}`}</style>

        <div className="flex justify-between mt-4 text-[11px] font-mono" style={{ color: t.muted }}>
          <span>Works with or without www • auto https fix</span>
          <span className="hidden md:block" suppressHydrationWarning>{domain || "Awaiting domain"} • {time} WAT</span>
        </div>

        {logs.length > 0 && (
          <div className="mt-6 rounded-[16px] border overflow-hidden" style={{ background: "#0b0b0b", borderColor: "#1a1a1a" }}>
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
              <span className="text-[11px] font-mono text-white/60">Live audit — {domain}</span>
              <a href={`https://wa.me/2349034555644?text=Hi%20Oredola,%20I%20audited%20${encodeURIComponent(domain)}%20on%20RankEngine`} target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono px-3 py-1 rounded-full text-white" style={{ background: waBg }}>Discuss on WhatsApp →</a>
            </div>
            <div className="p-4 font-mono text-[11px] leading-6 text-[#a3ffa3] max-h-[260px] overflow-auto">
              {logs.map((l,i) => <div key={i}>{l}</div>)}
            </div>
          </div>
        )}

        {!logs.length && (
          <div className="mt-8 rounded-[24px] border border-dashed p-12 md:p-14 text-center" style={{ borderColor: t.border, background: t.card }}>
            <div className="mx-auto h-12 w-12 rounded-[12px] border grid place-items-center mb-5" style={{ background: t.bg, borderColor: t.border }}><span className="text-[20px]">🔍</span></div>
            <h3 className="text-[16px] font-bold tracking-tight">No audit yet</h3>
            <p className="text-[13px] mt-2 max-w-[440px] mx-auto leading-relaxed" style={{ color: t.muted }}>Enter your domain e.g. <span style={{ color: t.fg, fontWeight: 600 }}>oredola.dev</span> or <span style={{ color: t.fg, fontWeight: 600 }}>www.example.com</span> — both work. Click Analyze.</p>
            <div className="mt-6 flex justify-center gap-2 flex-wrap">
              {["oredola.dev","www.example.com","studentpay.com.ng"].map((d) => (
                <button key={d} onClick={() => setDomain(d)} className="text-[12px] font-mono px-3.5 py-1.5 rounded-full border hover:opacity-80 transition" style={{ borderColor: t.border, color: t.muted, background: t.bg }}>{d}</button>
              ))}
            </div>
          </div>
        )}

        {score !== null && (
          <>
            <div className="mt-8 flex gap-1 p-1 rounded-full border w-fit shadow-sm" style={{ background: t.card, borderColor: t.border }}>
              {[
                { id: "overview", label: "Overview" },
                { id: "serp", label: "SERP Tracker", count: 7 },
                { id: "optimizer", label: "Content Optimizer" },
                { id: "schema", label: "Schema Builder" },
              ].map((ti:any) => (
                <button key={ti.id} onClick={() => setTab(ti.id)} className="px-4 py-2 rounded-full text-[13px] font-medium flex items-center gap-2 transition" style={{ background: tab===ti.id? btnBg : "transparent", color: tab===ti.id? btnFg : t.muted }}>
                  {ti.label} {ti.count ? <span className="text-[10px] rounded-full px-1.5 py-0.5" style={{ background: t.border }}>{ti.count}</span> : null}
                </button>
              ))}
            </div>

            <div className="mt-6 grid lg:grid-cols-12 gap-4">
              <div className="lg:col-span-8 rounded-[20px] border p-6" style={{ background: t.card, borderColor: t.border }}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-[11px] font-mono flex items-center gap-2 tracking-wide" style={{ color: t.muted }}>📊 Average Position last 17 days</div>
                    <div className="mt-3 text-[44px] font-black leading-none tracking-tight">{score}</div>
                    <div className="text-[11px] font-mono mt-2" style={{ color: t.muted }}>avg position • top 12% in niche</div>
                  </div>
                  <span className="rounded-full border px-3 py-1 text-[11px] font-mono bg-emerald-500/10 text-emerald-500 border-emerald-500/20">↘ -3.9 improved</span>
                </div>
                <div className="h-[200px] rounded-[12px] p-2 overflow-hidden" style={{ background: t.bg }}>
                  <svg viewBox="0 0 600 160" className="w-full h-full block">
                    <defs><linearGradient id="gradChart2" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity={0.28}/><stop offset="100%" stopColor="#10b981" stopOpacity={0}/></linearGradient></defs>
                    <path d="M0,10 C40,18 80,45 120,55 C160,70 200,95 260,105 C320,115 360,120 400,125 C450,130 500,120 560,130 L600,132 L600,160 L0,160 Z" fill="url(#gradChart2)" />
                    <path d="M0,10 C40,18 80,45 120,55 C160,70 200,95 260,105 C320,115 360,120 400,125 C450,130 500,120 560,130 L600,132" fill="none" stroke="#10b981" strokeWidth={2.5} strokeLinecap="round" />
                  </svg>
                </div>
                <div className="mt-3 flex justify-between text-[11px] font-mono" style={{ color: t.muted }}><span>May 28</span><span>Today</span></div>
              </div>

              <div className="lg:col-span-4 grid grid-cols-2 gap-4">
                <div className="rounded-[16px] border p-5" style={{ background: t.card, borderColor: t.border }}>
                  <div className="text-[10px] font-mono tracking-widest" style={{ color: t.muted }}>AVG POSITION</div>
                  <div className="mt-3 flex items-center gap-2"><span className="text-[26px] font-bold tracking-tight">{score}</span><span className="text-[11px] rounded-full px-2 py-0.5 bg-emerald-500/15 text-emerald-500">↗ -1.1</span></div>
                  <div className="mt-2 text-[12px]" style={{ color: t.muted }}>Top 3 in 4 queries</div>
                </div>
                <div className="rounded-[16px] border p-5" style={{ background: t.card, borderColor: t.border }}>
                  <div className="text-[10px] font-mono tracking-widest" style={{ color: t.muted }}>VISIBILITY %</div>
                  <div className="mt-3 flex items-center gap-2"><span className="text-[26px] font-bold tracking-tight">78%</span><span className="text-[11px] rounded-full px-2 py-0.5 bg-emerald-500/15 text-emerald-500">↗ +12%</span></div>
                  <div className="mt-2 text-[12px]" style={{ color: t.muted }}>SOV in Lagos</div>
                </div>
                <div className="rounded-[16px] border p-5" style={{ background: t.card, borderColor: t.border }}>
                  <div className="text-[10px] font-mono tracking-widest" style={{ color: t.muted }}>INDEXED</div>
                  <div className="mt-3 flex items-center gap-2"><span className="text-[26px] font-bold tracking-tight">142/156</span><span className="text-[11px] rounded-full px-2 py-0.5 bg-emerald-500/15 text-emerald-500">91%</span></div>
                  <div className="mt-2 text-[12px]" style={{ color: t.muted }}>14 waiting</div>
                </div>
                <div className="rounded-[16px] border p-5" style={{ background: t.card, borderColor: t.border }}>
                  <div className="text-[10px] font-mono tracking-widest" style={{ color: t.muted }}>ISSUES</div>
                  <div className="mt-3 flex items-center gap-2"><span className="text-[26px] font-bold tracking-tight">{auditData ? Math.max(0, 100 - (auditData.score||80)) / 10 | 0 : 3}</span><span className="text-[11px] rounded-full px-2 py-0.5 bg-amber-500/15 text-amber-500">2 critical</span></div>
                  <div className="mt-2 text-[12px]" style={{ color: t.muted }}>from audit</div>
                </div>
                <div className="col-span-2 rounded-[16px] border p-4 flex items-center justify-between" style={{ background: t.card, borderColor: t.border }}>
                  <div className="flex items-center gap-3"><div className="h-9 w-9 rounded-full bg-black text-white grid place-items-center">✦</div><div><div className="text-[13px] font-semibold">Next action</div><div className="text-[12px]" style={{ color: t.muted }}>Fix H1 + add FAQ schema</div></div></div>
                  <a href={`https://wa.me/2349034555644?text=Fix%20my%20SEO%20for%20${domain}`} target="_blank" rel="noopener noreferrer" className="rounded-full px-4 py-2 text-[12px] font-semibold text-white" style={{ background: waBg }}>💬 WhatsApp</a>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="mt-16 rounded-[28px] border overflow-hidden" style={{ background: t.card, borderColor: t.border }}>
          <div className="grid md:grid-cols-12">
            <div className="md:col-span-8 p-8 md:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-mono tracking-wide" style={{ borderColor: t.border, color: t.muted }}><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> FOUNDER • LAGOS</div>
              <h3 className="mt-5 text-[24px] font-bold leading-tight tracking-tight">I build and rank products from Lagos to global markets.</h3>
              <p className="mt-4 text-[14px] leading-7 max-w-[620px]" style={{ color: t.muted }}>I am Oredola — engineer behind <span style={{ color: t.fg, fontWeight: 600 }}>AcademiaBase (2,300+ students)</span>. RankEngine is my internal SEO system.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://wa.me/2349034555644" target="_blank" rel="noopener noreferrer" className="rounded-full px-5 py-2.5 text-[13px] font-semibold text-white" style={{ background: waBg }}>Chat on WhatsApp →</a>
                <a href="mailto:hello@oredola.dev" className="rounded-full border px-5 py-2.5 text-[13px] font-medium" style={{ borderColor: t.border, color: t.fg }}>hello@oredola.dev</a>
              </div>
            </div>
            <div className="md:col-span-4 border-t md:border-t-0 md:border-l p-8" style={{ borderColor: t.border, background: t.bg }}>
              <div className="text-[11px] font-mono" style={{ color: t.muted }}>WHAT YOU GET</div>
              <ul className="mt-4 space-y-3 text-[13px] leading-relaxed" style={{ color: t.muted }}>
                <li>— Title, H1, meta, canonical</li>
                <li>— Schema + FAQ coverage</li>
                <li>— Indexed vs waiting pages</li>
                <li>— Visibility % and avg position</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-between text-[11px] font-mono" style={{ color: t.muted }}>
          <Link href="/#products">← oredola.dev</Link>
          <span suppressHydrationWarning>{time} WAT • {theme.toUpperCase()} • EDGE</span>
        </div>
      </div>
    </main>
  )
}
