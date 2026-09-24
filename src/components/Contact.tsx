"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme, THEMES } from "@/components/ThemeProvider";

export default function Contact() {
  const { theme } = useTheme();
  const t = THEMES[theme];
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-NG", { timeZone: "Africa/Lagos", hour: "2-digit", minute: "2-digit" }) + " WAT");
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);

  return (
    <section id="contact" className="relative mx-auto max-w- px-6 md:px-10 py-16 pb-28" style={{ background: t.bg }}>
      {/* Page grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(${t.fg} 1px, transparent 1px), linear-gradient(90deg, ${t.fg} 1px, transparent 1px)`,
        backgroundSize: "32px 32px"
      }} />

      <div className="relative rounded- border overflow-hidden" style={{ background: t.card, borderColor: t.border, boxShadow: theme === "light"? "0 24px 80px -20px rgba(0,0,0,0.12)" : "0 24px 80px -20px rgba(0,0,0,0.5)" }}>
        {/* Inner grid + glow - now uses theme colors, not inverted */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(${t.fg} 1px, transparent 1px), linear-gradient(90deg, ${t.fg} 1px, transparent 1px)`,
          backgroundSize: "28px 28px"
        }} />
        <div className="pointer-events-none absolute -top-32 -right-32 h- w- rounded-full blur- opacity-10" style={{ background: t.fg }} />

        <div className="relative grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
          {/* LEFT */}
          <div className="p-8 md:p-12 lg:p-14">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text- font-mono tracking-widest" style={{ borderColor: t.border, background: t.bg, color: t.muted }}>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> AVAILABLE GLOBAL • WORK REMOTELY • {time}
              </span>
              <span className="rounded-full px-3 py-1 text- font-bold" style={{ background: t.fg, color: t.bg }}>$100 MAX • STUDENT PRICING</span>
            </div>

            <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 font-black leading-[0.88] tracking-[-0.05em]" style={{ fontSize: "clamp(38px, 5.5vw, 64px)", color: t.fg }}>
              Let's ship<br />something real.
            </motion.h2>

            <p className="mt-5 max-w- text-[14.5px] leading-[1.7]" style={{ color: t.muted }}>
              You don't need another tutorial. You need MVP in 14 days that collects Naira. I build <span style={{ color: t.fg, fontWeight: 700 }}>AcademiaBase, RankEngine, StudentPay</span> — same stack: MVP <b style={{ color: t.fg }}>$100</b>, SEO <b style={{ color: t.fg }}>$60</b>, Mentor <b style={{ color: t.fg }}>$15/hr</b>.
            </p>

            {/* Info bento - no copyright, with Global + Remote */}
            <div className="mt-10 grid grid-cols-3 gap- rounded- border overflow-hidden" style={{ borderColor: t.border, background: t.border }}>
              {[
                { k: "AVAILABILITY", v: "Global • Remote", sub: "Worldwide • WAT" },
                { k: "LOCATION", v: "Lagos, NG", sub: "Work remotely" },
                { k: "RESPONSE", v: "<2h avg", sub: "99.9% uptime" },
              ].map(s => (
                <div key={s.k} className="p-4" style={{ background: t.card }}>
                  <div className="text- font-mono tracking-widest" style={{ color: t.muted }}>{s.k}</div>
                  <div className="mt-1.5 text- font-semibold" style={{ color: t.fg }}>{s.v}</div>
                  <div className="mt-0.5 text- font-mono" style={{ color: t.muted }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative p-8 md:p-10 lg:p-12 flex flex-col justify-between gap-8" style={{ background: t.bg, borderLeft: `1px solid ${t.border}` }}>
            <div className="space-y-3">
              <motion.a whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} href="mailto:hello@oredola.dev" className="group flex items-center justify-between rounded-full px-7 py-5 text- font-bold shadow-sm" style={{ background: t.fg, color: t.bg }}>
                <span className="flex items-center gap-3"><span className="h-8 w-8 rounded-full flex items-center justify-center text- font-black" style={{ background: t.bg, color: t.fg }}>@</span> hello@oredola.dev</span>
                <span className="h-9 w-9 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform" style={{ background: t.bg, color: t.fg }}>→</span>
              </motion.a>

              <motion.a whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} href="https://wa.me/2349034555644" target="_blank" className="flex items-center justify-between rounded-full border px-7 py-4 text- font-semibold" style={{ borderColor: t.border, color: t.fg, background: t.card }}>
                <span className="flex items-center gap-3"><span className="h-7 w-7 rounded-full bg-[#25D366] flex items-center justify-center text- text-white font-bold">W</span> WhatsApp — Fast reply</span>
                <span className="text- font-mono px-2.5 py-1 rounded-full" style={{ background: t.fg, color: t.bg }}>ONLINE</span>
              </motion.a>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded- border p-4" style={{ borderColor: t.border, background: t.card }}>
                  <div className="text- font-mono" style={{ color: t.muted }}>AVG RESPONSE</div>
                  <div className="mt-1 text- font-black" style={{ color: t.fg }}>&lt;2h</div>
                  <div className="mt-2 h-1 w-full rounded-full overflow-hidden" style={{ background: t.border }}><div className="h-full w-[92%] rounded-full" style={{ background: t.fg }} /></div>
                </div>
                <div className="rounded- border p-4" style={{ borderColor: t.border, background: t.card }}>
                  <div className="text- font-mono" style={{ color: t.muted }}>WORK MODE</div>
                  <div className="mt-1 text- font-black" style={{ color: t.fg }}>Remote</div>
                  <div className="mt-2 flex gap-1">{[...Array(8)].map((_,i)=><div key={i} className="h-1 flex-1 rounded-full" style={{ background: i<7? t.fg : t.border }} />)}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text- font-mono pt-4 border-t" style={{ borderColor: t.border, color: t.muted }}>
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Available global • Remote</span>
              <span>{time} • {theme.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}