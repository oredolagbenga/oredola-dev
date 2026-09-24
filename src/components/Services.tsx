"use client";
import { motion } from "framer-motion";
import { useTheme, THEMES } from "@/components/ThemeProvider";

const services = [
  { num: "01", label: "BUILD", badge: "14 days", title: "Ship your MVP in 14 days", desc: "Figma → Next.js + Supabase + Paystack → Live. Same stack I used for 8 products.", tags: ["Live MVP", "Paystack", "SEO Ready"], price: "$100", color: "#60a5fa" },
  { num: "02", label: "RANK", badge: "30 days", title: "Rank on Google Nigeria", desc: "RankEngine + NaijaSEO Kit + content system that ranks.ng domains.", tags: ["Keyword.ng", "30-day plan", "Audit"], price: "$60", color: "#34d399" },
  { num: "03", label: "TEACH", badge: "Ongoing", title: "Mentor you to ship", desc: "1000+ builders mentored. We build together till you can ship solo.", tags: ["1:1 calls", "Reviews"], price: "$15/hr", color: "#a78bfa" },
  { num: "04", label: "EARN", badge: "7 days", title: "Monetize Naira + Crypto", desc: "PayPal blocks NG. I built StudentPay. Setup to collect globally.", tags: ["StudentPay", "Naira + Crypto"], price: "$40", color: "#facc15" },
];

export default function Services() {
  const { theme } = useTheme();
  const t = THEMES[theme];

  return (
    <section id="services" className="relative mx-auto max-w- px-6 md:px-10 py-20 overflow-hidden" style={{ background: t.bg }}>
      {/* GRID BACKGROUND */}
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: `linear-gradient(${t.border} 1px, transparent 1px), linear-gradient(90deg, ${t.border} 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        opacity: 0.25,
        maskImage: "radial-gradient(ellipse at 20% 0%, black 30%, transparent 70%)"
      }} />

      <div className="relative">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex rounded-full border px-3.5 py-1 text- tracking-widest backdrop-blur" style={{ borderColor: t.border, background: `${t.card}cc`, color: t.muted }}>
              SERVICES — ALL-ROUND MENTOR
            </div>
            <h2 className="mt-6 font-black leading-[0.88] tracking-[-0.04em]" style={{ fontSize: "clamp(32px, 5vw, 52px)", color: t.fg }}>
              I don't just build.<br /><span style={{ opacity: 0.32 }}>I teach you to build.</span>
            </h2>
          </div>
          <p className="max-w- text- leading-[1.6] rounded-full border px-4 py-2 backdrop-blur" style={{ borderColor: t.border, background: `${t.card}cc`, color: t.muted }}>
            All-round = build, rank, teach your team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group relative overflow-hidden rounded- border p-8 min-h- flex flex-col justify-between backdrop-blur"
              style={{ background: `${t.card}f0`, borderColor: t.border }}
            >
              {/* Card inner grid */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.035] rounded-" style={{
                backgroundImage: `linear-gradient(${t.fg} 1px, transparent 1px), linear-gradient(90deg, ${t.fg} 1px, transparent 1px)`,
                backgroundSize: "22px 22px"
              }} />
              <div className="absolute left-0 top-0 h- w-full" style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }} />

              <div className="relative">
                <div className="flex justify-between items-center">
                  <span className="font-mono text- tracking-[0.2em] flex items-center gap-2" style={{ color: t.muted }}>
                    <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: s.color }} />{s.num} / {s.label}
                  </span>
                  <span className="rounded-full px-3 py-1 text- font-bold" style={{ background: t.fg, color: t.bg }}>{s.badge}</span>
                </div>

                <h3 className="mt-10 text- font-bold" style={{ color: t.fg }}>{s.title}</h3>
                <p className="mt-3 text-[13.5px] leading-[1.65]" style={{ color: t.muted }}>{s.desc}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map(tag => (
                    <span key={tag} className="rounded-full border px-3 py-1 text-" style={{ borderColor: t.border, background: t.bg, color: t.muted }}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="relative mt-8 flex items-center justify-between border-t pt-5" style={{ borderColor: t.border }}>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-" style={{ color: t.muted }}>From</span>
                  <span className="text- font-black" style={{ color: t.fg }}>{s.price}</span>
                </div>
                <a href="#contact" className="rounded-full px-5 py-2 text- font-semibold hover:scale-[1.03] transition-transform" style={{ background: t.fg, color: t.bg }}>
                  Start →
                </a>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded- opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: `inset 0 0 0 1px ${s.color}30, 0 30px 80px -20px ${s.color}40` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}