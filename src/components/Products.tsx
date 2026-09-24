"use client";
import { motion } from "framer-motion";
import { useTheme, THEMES } from "@/components/ThemeProvider";

const products = [
  { letter: "A", name: "AcademiaBase", desc: "AI-powered research hub for African students.", tag: "AI + EDU", users: "2.3k", status: "live", href: "#", color: "#22d3ee" },
  { letter: "L", name: "LearnVault", desc: "Your second brain for learning. Notes, flashcards, AI quizzes.", tag: "Learning OS", users: "1.8k", status: "live", href: "#", color: "#a78bfa" },
  { letter: "R", name: "RankEngine", desc: "SEO toolkit that ranks.ng domains.", tag: "SEO SaaS", users: "890", status: "live", href: "#", color: "#fb923c" },
  { letter: "E", name: "ExamAI", desc: "JAMB/WAEC past questions with AI tutor.", tag: "AI Tutor", users: "3.1k", status: "beta", href: "#", color: "#34d399" },
  { letter: "N", name: "NaijaSEO Kit", desc: "Rank on Google Nigeria in 30 days.", tag: "SEO", users: "560", status: "live", href: "#", color: "#facc15" },
  { letter: "S", name: "StudentPay", desc: "Accept crypto & Naira for students.", tag: "Fintech", users: "1.2k", status: "building", href: "#", color: "#f472b6" },
  { letter: "S", name: "ShipFast NG", desc: "Next.js + Paystack boilerplate for Naija.", tag: "Boilerplate", users: "420", status: "live", href: "#", color: "#60a5fa" },
  { letter: "T", name: "TutorOS", desc: "Run your tutoring business.", tag: "SaaS", users: "310", status: "beta", href: "#", color: "#a78bfa" },
];

export default function Products() {
  const { theme } = useTheme();
  const t = THEMES[theme];

  return (
    <section id="products" className="relative mx-auto max-w- px-6 md:px-10 py-20 overflow-hidden" style={{ background: t.bg }}>
      {/* BEAUTIFUL GRID BACKGROUND - MODERN */}
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: `linear-gradient(${t.border} 1px, transparent 1px), linear-gradient(90deg, ${t.border} 1px, transparent 1px)`,
        backgroundSize: "36px 36px",
        opacity: 0.35,
        maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)"
      }} />
      <div className="pointer-events-none absolute -top-32 left-1/2 h- w- -translate-x-1/2 rounded-full opacity-20 blur-" style={{ background: `radial-gradient(circle, ${t.fg}15, transparent 70%)` }} />

      <div className="relative">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <div className="inline-flex rounded-full border px-3.5 py-1 text- tracking-wide backdrop-blur" style={{ borderColor: t.border, color: t.muted, background: `${t.card}cc` }}>
              PRODUCT FACTORY — 8 SHIPPED
            </div>
            <h2 className="mt-6 font-black leading-[0.9] tracking-[-0.04em]" style={{ fontSize: "clamp(36px, 5.5vw, 56px)", color: t.fg }}>
              Products that <br /><span style={{ opacity: 0.35 }}>students actually use</span>
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-" style={{ color: t.muted }}>8 live</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.href}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group relative flex min-h- cursor-pointer flex-col justify-between rounded- border p-5 backdrop-blur"
              style={{ background: `${t.card}f2`, borderColor: t.border }}
            >
              {/* Grid inside card */}
              <div className="pointer-events-none absolute inset-0 rounded- opacity-[0.04]" style={{
                backgroundImage: `linear-gradient(${t.fg} 1px, transparent 1px), linear-gradient(90deg, ${t.fg} 1px, transparent 1px)`,
                backgroundSize: "18px 18px"
              }} />

              <div className="relative">
                <div className="flex justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border text- font-black" style={{ background: `${p.color}18`, borderColor: `${p.color}30`, color: p.color }}>{p.letter}</div>
                  <span className={`h-2 w-2 rounded-full ${p.status==="live"?"bg-emerald-400":p.status==="beta"?"bg-yellow-400":"bg-zinc-500"}`} style={{ boxShadow: p.status==="live"? "0 0 10px rgba(52,211,153,0.8)" : undefined }} />
                </div>
                <h3 className="mt-6 text- font-bold" style={{ color: t.fg }}>{p.name}</h3>
                <p className="mt-2 text- leading-[1.6]" style={{ color: t.muted }}>{p.desc}</p>
              </div>

              <div className="relative mt-6 flex items-center justify-between">
                <span className="rounded-full border px-2.5 py-1 font-mono text-" style={{ borderColor: t.border, background: t.bg, color: t.muted }}>{p.tag}</span>
                <span className="font-mono text- opacity-60" style={{ color: t.muted }}>{p.users} users</span>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded- opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: `inset 0 0 0 1px ${p.color}40, 0 20px 40px -15px ${p.color}30` }} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}