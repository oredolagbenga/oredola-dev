"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme, THEMES } from "@/components/ThemeProvider";

const STACK = [
  { id: "next", name: "Next.js 14", role: "Frontend • RSC • Edge", level: 95, icon: "N", snippet: "app/api/ship/route.ts → 12ms edge", code: "export const runtime = 'edge'\n\nexport async function POST(req) {\n const { idea } = await req.json()\n return ship(idea) // live in 3min\n}", metric: "2.3k builds / mo" },
  { id: "supabase", name: "Supabase", role: "Auth • DB • Realtime", level: 90, icon: "S", snippet: "auth + db + realtime • RLS", code: "const { data } = await supabase\n.from('products')\n.select('*')\n.eq('status', 'live') // RLS secured", metric: "8 dbs • 99.9% up" },
  { id: "openai", name: "OpenAI SDK", role: "Agents • Tools • RAG", level: 88, icon: "◍", snippet: "AI that teaches students", code: "const tutor = new Agent({\n tools: [searchDocs, gradeCode],\n model: 'gpt-4o-mini'\n}) // AcademiaBase tutor", metric: "12k tokens / day" },
  { id: "seo", name: "SEO Systems", role: "Rank.ng • Schema", level: 92, icon: "R", snippet: "Programmatic SEO that ranks", code: "generateSitemap(1000)\n.addSchema('Course')\n.pingGoogle() // #1 'JAMB past questions'", metric: "142 pages indexed" },
  { id: "framer", name: "Framer Motion", role: "Motion • 60fps", level: 94, icon: "F", snippet: "Spring UI • 60fps", code: "<motion.div\n whileHover={{ scale: 1.02 }}\n transition={{ type: 'spring', stiffness: 200 }}\n/> // physics", metric: "60fps spring" },
  { id: "paystack", name: "Paystack", role: "Payments • Webhooks", level: 85, icon: "₦", snippet: "Get paid NG instantly", code: "paystack.checkout({\n amount: 10000, // $100 max\n currency: 'NGN',\n split: { gnet: 100 }\n})", metric: "$100 max pricing" },
];

export default function Stack() {
  const { theme } = useTheme();
  const t = THEMES[theme];
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-NG", { timeZone: "Africa/Lagos", hour: "2-digit", minute: "2-digit" }) + " WAT");
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  useEffect(() => { const id = setInterval(() => setActive(p => (p + 1) % STACK.length), 4000); return () => clearInterval(id); }, []);

  const current = STACK[active];

  return (
    <section id="stack" className="relative mx-auto max-w- px-6 md:px-10 py-20 md:py-28 border-t" style={{ borderColor: t.border, background: t.bg }}>
      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(${t.fg} 1px, transparent 1px), linear-gradient(90deg, ${t.fg} 1px, transparent 1px)`,
        backgroundSize: "32px 32px"
      }} />

      <div className="relative">
        {/* HEADER - FIXED */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text- tracking-wide" style={{ borderColor: t.border, background: t.card, color: t.muted }}>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              HOW I SHIP — PRODUCTION STACK
            </div>
            <span className="rounded-full px-3 py-1 text- font-bold" style={{ background: t.fg, color: t.bg }}>8 SHIPPED</span>
            <span className="ml-auto hidden md:inline-flex items-center gap-2 font-mono text-" style={{ color: t.muted }}>
              <span className="h-1 w-1 rounded-full bg-emerald-500" /> LAGOS • {time} • {theme.toUpperCase()} • LIVE
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 items-end">
            <h2 className="font-black leading-[0.9] tracking-[-0.04em]" style={{ fontSize: "clamp(32px, 4.5vw, 52px)", color: t.fg }}>
              Modern stack.<br />
              <span style={{ color: t.muted }}>Proven daily.</span>
            </h2>
            <p className="text-[13.5px] leading-[1.6] lg:text-right" style={{ color: t.muted }}>
              Not tutorial list. Exact pipeline powering <span style={{ color: t.fg, fontWeight: 700 }}>AcademiaBase (2.3k), RankEngine, StudentPay</span> — live, monetized at $100 max.
            </p>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-5 items-start">
          {/* CODE WINDOW */}
          <div className="rounded- border overflow-hidden flex flex-col" style={{ background: t.card, borderColor: t.border }}>
            <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: t.border, background: t.bg }}>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5"><span className="h-3 w-3 rounded-full bg-[#ff5f57]" /><span className="h-3 w-3 rounded-full bg-[#ffbd2e]" /><span className="h-3 w-3 rounded-full bg-[#28ca42]" /></div>
                <span className="font-mono text-" style={{ color: t.muted }}>{current.id}.ts — {current.snippet}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden md:inline-flex rounded-full border px-2.5 py-1 text- font-mono" style={{ borderColor: t.border, color: t.muted, background: t.bg }}>{current.metric}</span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>

            <div className="p-6">
              <div className="flex gap-4">
                <div className="hidden md:block font-mono text- leading-6 select-none" style={{ color: t.muted, opacity: 0.4 }}>
                  {current.code.split('\n').map((_, i) => <div key={i}>{String(i+1).padStart(2,'0')}</div>)}
                </div>
                <AnimatePresence mode="wait">
                  <motion.pre key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="flex-1 font-mono text-[12.5px] leading-[1.75] whitespace-pre-wrap" style={{ color: t.fg }}>
                    {current.code}
                  </motion.pre>
                </AnimatePresence>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <button onClick={() => { navigator.clipboard.writeText(current.code); setCopied(true); setTimeout(()=>setCopied(false),1500); }} className="rounded-full px-4 py-2 text- font-medium transition hover:opacity-90" style={{ background: t.fg, color: t.bg }}>
                  {copied? "Copied ✓" : "Copy snippet"}
                </button>
                <span className="text- font-mono" style={{ color: t.muted }}>→ {current.name} • {current.level}% mastery</span>
              </div>
            </div>

            <div className="mt-auto border-t px-5 py-3 flex items-center justify-between font-mono text-" style={{ borderColor: t.border, background: t.bg }}>
              <div className="flex gap-4"><span style={{ color: t.muted }}>$ pnpm ship</span><span className="text-emerald-500">✓ {current.name} live</span></div>
              <div className="hidden md:flex gap-2"><span className="px-2 py-0.5 rounded-full border" style={{ borderColor: t.border, color: t.muted }}>8 PRODUCTS</span><span className="px-2 py-0.5 rounded-full border" style={{ borderColor: t.border, color: t.muted }}>1000+ USERS</span></div>
            </div>
          </div>

          {/* STACK LIST - FIXED */}
          <div className="flex flex-col gap-2.5">
            {STACK.map((s, i) => {
              const isActive = active === i;
              return (
                <button key={s.id} onClick={() => setActive(i)} className="text-left rounded- border p- transition-all" style={{
                  borderColor: isActive? t.fg : t.border,
                  background: isActive? t.fg : "transparent",
                  transform: isActive? "scale(1.01)" : "scale(1)"
                }}>
                  <div className="rounded- px-4 py-3.5 flex items-center justify-between gap-3" style={{ background: t.card }}>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-9 w-9 shrink-0 rounded-full flex items-center justify-center text- font-black border" style={{ background: isActive? t.fg : t.bg, color: isActive? t.bg : t.fg, borderColor: t.border }}>{s.icon}</div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text- font-semibold truncate" style={{ color: t.fg }}>{s.name}</span>
                          {isActive && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />}
                        </div>
                        <div className="text- font-mono truncate" style={{ color: t.muted }}>{s.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="hidden md:block w-14 h-1.5 rounded-full overflow-hidden" style={{ background: `${t.fg}15` }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${s.level}%` }} transition={{ duration: 0.8 }} className="h-full rounded-full" style={{ background: t.fg }} />
                      </div>
                      <span className="font-mono text- w- text-right" style={{ color: t.fg }}>{s.level}%</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
}