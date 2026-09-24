"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme, THEMES } from "@/components/ThemeProvider";

const STACK = [
  { id: "next", name: "Next.js 14", role: "Frontend • RSC • Edge", level: 95, icon: "N", snippet: "app/api/ship/route.ts → edge, 12ms cold", code: "export const runtime = 'edge'\nexport async function POST(req) {\n const { idea } = await req.json()\n return ship(idea) // → live in 3m\n}", metric: "2.3k builds / mo" },
  { id: "supabase", name: "Supabase", role: "Auth • DB • Realtime", level: 90, icon: "S", snippet: "auth + db + realtime • RLS", code: "const { data } = await supabase\n.from('products')\n.select('*')\n.eq('status', 'live') // RLS secured", metric: "8 dbs • 99.9% up" },
  { id: "openai", name: "OpenAI SDK", role: "Agents • Tools • RAG", level: 88, icon: "◍", snippet: "AI that teaches", code: "const tutor = new Agent({\n tools: [searchDocs, gradeCode],\n model: 'gpt-4o'\n}) // AcademiaBase", metric: "12k tokens / day" },
  { id: "seo", name: "SEO Systems", role: "Rank.ng • Schema", level: 92, icon: "R", snippet: "Programmatic SEO that ranks", code: "generateSitemap(1000)\n.addSchema('Course')\n.pingGoogle() // #1 'JAMB past questions'", metric: "142 pages indexed" },
  { id: "framer", name: "Framer Motion", role: "Motion • 3D", level: 94, icon: "F", snippet: "Pro UI • 60fps", code: "<motion.div\n whileHover={{ scale: 1.02 }}\n transition={{ spring: 20 }}\n/> // spring physics", metric: "60fps spring" },
  { id: "paystack", name: "Paystack", role: "Payments • Webhooks", level: 85, icon: "P", snippet: "Get paid NG instantly", code: "paystack.checkout({\n amount: 500000, // ₦5k\n split: { gnet: 70, tutor: 30 }\n})", metric: "₦420k MRR" },
];

export default function StackAndContact() {
  const { theme } = useTheme();
  const t = THEMES[theme];
  const isLight = theme === "light";
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");
  useEffect(() => { const tick = () => setTime(new Date().toLocaleTimeString("en-NG", { timeZone: "Africa/Lagos", hour: "2-digit", minute: "2-digit" }) + " WAT"); tick(); const id = setInterval(tick, 1000); return () => clearInterval(id); }, []);
  useEffect(() => { const id = setInterval(() => setActive((p) => (p + 1) % STACK.length), 4000); return () => clearInterval(id); }, []);
  const current = STACK[active];
  return (
    <>
      <section id="stack" className="relative mx-auto max-w- px-6 md:px-10 py-24 md:py-32 border-t overflow-hidden" style={{ borderColor: t.border, background: t.bg }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(${t.fg} 1px, transparent 1px), linear-gradient(90deg, ${t.fg} 1px, transparent 1px)`, backgroundSize: "28px 28px" }} />
        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border backdrop-blur px-3.5 py-1.5 text- font-medium tracking-wide" style={{ borderColor: t.border, background: isLight? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.3)", color: isLight? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.6)" }}>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> HOW I SHIP — PRODUCTION STACK
                <span className="ml-2 rounded-full px-2 py-0.5 text- font-bold" style={{ background: isLight? "#000" : "#fff", color: isLight? "#fff" : "#000" }}>8 SHIPPED</span>
              </div>
              <h2 className="mt-6 text- md:text- font-black tracking-[-0.06em] leading-[0.85]"><span style={{ color: t.fg }}>Modern stack.</span><br /><span style={{ color: isLight? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.2)" }}>Proven daily.</span></h2>
            </div>
            <div className="max-w-">
              <div className="flex items-center gap-2 text- font-mono" style={{ color: isLight? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.35)" }}><span className="h-1 w-1 rounded-full bg-emerald-500" /> LAGOS • {time} • {theme.toUpperCase()} • LIVE</div>
              <p className="mt-3 text- leading-[1.65]" style={{ color: isLight? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.5)" }}>Not tutorial list. Exact pipeline powering <span style={{ color: t.fg, fontWeight: 600 }}>AcademiaBase (2.3k), RankEngine, StudentPay</span> — live, monetized.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-5">
            <div className="relative rounded- border backdrop-blur-2xl overflow-hidden min-h- flex flex-col" style={{ background: isLight? "#ffffff" : "rgba(0,0,0,0.5)", borderColor: t.border, boxShadow: isLight? "0 24px 80px -20px rgba(0,0,0,0.12)" : "0 24px 80px -20px rgba(0,0,0,0.7)" }}>
              <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: t.border, background: isLight? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.02)" }}>
                <div className="flex items-center gap-2.5"><div className="flex gap-1.5"><div className="h-3 w-3 rounded-full bg-[#ff5f57]" /><div className="h-3 w-3 rounded-full bg-[#ffbd2e]" /><div className="h-3 w-3 rounded-full bg-[#28ca42]" /></div><div className="ml-3 font-mono text-" style={{ color: isLight? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.4)" }}>{current.id}.ts — {current.snippet}</div></div>
                <div className="flex items-center gap-3"><div className="text- font-mono px-2 py-1 rounded-full border" style={{ borderColor: t.border, color: isLight? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.35)", background: isLight? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.04)" }}>{current.metric}</div><div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /></div>
              </div>
              <div className="relative flex-1 p-6 md:p-8">
                <div className="flex gap-6">
                  <div className="hidden md:block font-mono text- leading-6 select-none" style={{ color: isLight? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.18)" }}>{current.code.split('\n').map((_, i) => <div key={i}>{String(i+1).padStart(2,'0')}</div>)}</div>
                  <div className="flex-1"><AnimatePresence mode="wait"><motion.pre key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="font-mono text-[12.5px] leading-[1.7] whitespace-pre-wrap" style={{ color: t.fg }}><code>{current.code}</code></motion.pre></AnimatePresence>
                    <div className="mt-8 flex items-center gap-3"><motion.button whileTap={{ scale: 0.98 }} onClick={() => { navigator.clipboard.writeText(current.code); setCopied(true); setTimeout(()=>setCopied(false),1500); }} className="rounded-full px-4 py-2 text- font-medium border" style={{ background: isLight? "#0a0a0a" : "#ffffff", color: isLight? "#ffffff" : "#000000", borderColor: isLight? "#0a0a0a" : "#ffffff" }}>{copied? "Copied ✓" : "Copy snippet"}</motion.button><div className="text- font-mono" style={{ color: isLight? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.35)" }}>→ {current.name} • {current.level}% mastery</div></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 border-t px-6 py-3 flex items-center justify-between font-mono text-" style={{ borderColor: t.border, background: isLight? "rgba(0,0,0,0.02)" : "rgba(0,0,0,0.25)" }}><div className="flex gap-4"><span style={{ color: isLight? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.25)" }}>$ pnpm ship</span><span className="text-emerald-500">✓ {current.name} live</span><span style={{ color: isLight? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.25)" }}>{time}</span></div><div className="hidden md:flex gap-2"><span className="px-2 py-0.5 rounded-full text- border" style={{ borderColor: t.border, color: isLight? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.3)" }}>8 PRODUCTS</span><span className="px-2 py-0.5 rounded-full text- border" style={{ borderColor: t.border, color: isLight? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.3)" }}>1000+ USERS</span></div></div>
              </div>
            </div>
            <div className="grid gap-3">
              {STACK.map((s, i) => { const isActive = active===i; return (
                <motion.button key={s.id} onClick={() => setActive(i)} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i*0.04 }} viewport={{ once: true }} className="text-left rounded- border p- group" style={{ background: isActive? t.fg : t.border }}>
                  <div className="rounded- px-5 py-4 flex items-center justify-between" style={{ background: isActive? (isLight? "#0a0a0a" : "#ffffff") : t.card }}>
                    <div className="flex items-center gap-3.5"><div className="h-10 w-10 rounded-full flex items-center justify-center text- font-black border group-hover:scale-105 transition-transform" style={{ background: isActive? (isLight? "#ffffff" : "#000000") : (isLight? "#0a0a0a" : "#ffffff"), color: isActive? (isLight? "#000000" : "#ffffff") : (isLight? "#ffffff" : "#000000"), borderColor: isActive? "transparent" : t.border }}>{s.icon}</div><div><div className="flex items-center gap-2"><div className="text-[13.5px] font-semibold" style={{ color: isActive? (isLight? "#ffffff" : "#000000") : t.fg }}>{s.name}</div><div className={`h-1.5 w-1.5 rounded-full ${isActive? "bg-emerald-400 animate-pulse" : "bg-emerald-500/60"}`} /></div><div className="text- font-mono mt-0.5" style={{ color: isActive? (isLight? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)") : (isLight? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.4)") }}>{s.role}</div></div></div>
                    <div className="flex items-center gap-3"><div className="hidden md:block w- h-1.5 rounded-full overflow-hidden" style={{ background: isActive? (isLight? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)") : (isLight? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.1)") }}><motion.div initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 + i*0.05 }} className="h-full rounded-full" style={{ background: isActive? (isLight? "#ffffff" : "#000000") : t.fg }} /></div><span className="font-mono text- min-w- text-right" style={{ color: isActive? (isLight? "#ffffff" : "#000000") : t.fg }}>{s.level}%</span></div>
                  </div>
                </motion.button>
              )})}
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="relative mx-auto max-w- px-6 md:px-10 pb-24 md:pb-32" style={{ background: t.bg }}>
        <div className="rounded- border overflow-hidden" style={{ background: isLight? "#0a0a0a" : "#ffffff", borderColor: isLight? "#0a0a0a" : "#ffffff", color: isLight? "#ffffff" : "#000000" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-0">
            <div className="p-8 md:p-12">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text- font-mono" style={{ borderColor: isLight? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)", color: isLight? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)" }}><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> AVAILABLE FOR FREELANCE • {time}</div>
              <h2 className="mt-6 text- md:text- font-black tracking-[-0.05em] leading-[0.9]">Let's ship<br />something real.</h2>
              <p className="mt-4 text- leading-[1.6] max-w-" style={{ color: isLight? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)" }}>All-round job — you need MVP, SEO, mentoring, or monetization. I'm in Lagos, shipping daily. Reply in &lt;2h, not &lt;2 days.</p>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-8" style={{ borderColor: isLight? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }}>
                <div><div className="text- font-mono" style={{ color: isLight? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}>EMAIL</div><a href="mailto:hello@oredola.dev" className="mt-1 block text- font-medium hover:opacity-70">hello@oredola.dev</a></div>
                <div><div className="text- font-mono" style={{ color: isLight? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}>LOCATION</div><div className="mt-1 text-">Lagos, NG • Remote</div></div>
                <div><div className="text- font-mono" style={{ color: isLight? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}>RESPONSE</div><div className="mt-1 text-">&lt; 2h avg • 99.9% uptime</div></div>
              </div>
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center gap-4" style={{ background: isLight? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)", borderLeft: `1px solid ${isLight? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}` }}>
              <a href="mailto:hello@oredola.dev" className="group rounded-full px-8 py-4 text-center text- font-semibold flex items-center justify-between transition hover:scale-[1.01]" style={{ background: isLight? "#ffffff" : "#000000", color: isLight? "#000000" : "#ffffff" }}><span>hello@oredola.dev</span><span className="group-hover:translate-x-1 transition-transform">→</span></a>
              <a href="https://wa.me/2349034555644" target="_blank" className="rounded-full border px-8 py-4 text-center text- font-semibold transition hover:opacity-80" style={{ borderColor: isLight? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)", color: isLight? "#ffffff" : "#000000", background: isLight? "transparent" : "#ffffff" }}>WhatsApp — Fast reply</a>
              <div className="mt-2 flex items-center justify-between text- font-mono" style={{ color: isLight? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)" }}><span>© 2025 Oredola Gbenga • Lagos, NG</span><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Available now</span></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
