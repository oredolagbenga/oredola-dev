"use client";
import { useTheme, THEMES } from "@/components/ThemeProvider";
import Link from "next/link";

export default function Footer() {
  const { theme } = useTheme();
  const t = THEMES[theme];
  const isLight = theme === "light";

  const products = [
    { name: "AcademiaBase", slug: "academiabase" },
    { name: "LearnVault", slug: "learnvault" },
    { name: "RankEngine", slug: "rankengine" },
    { name: "StudentPay", slug: "studentpay" },
  ];

  return (
    <footer className="relative mt-10 overflow-hidden" style={{ background: t.bg }}>
      {/* Top accent line */}
      <div className="h- w-full" style={{ background: `linear-gradient(90deg, transparent, ${t.border}, ${t.fg}40, ${t.border}, transparent)` }} />

      {/* Unique glows - no grid */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h- w- -translate-x-1/2 rounded-full blur- opacity-[0.06]" style={{ background: `radial-gradient(circle, ${t.fg}, transparent 70%)` }} />
      <div className="pointer-events-none absolute bottom-0 right-0 h- w- rounded-full blur- opacity-[0.04]" style={{ background: t.fg }} />

      <div className="relative mx-auto max-w- px-6 md:px-10">
        {/* Big faded brand - unique */}
        <div className="pt-16 md:pt-24 overflow-hidden">
          <h2 className="font-black tracking-[-0.06em] leading-[0.85] select-none" style={{ fontSize: "clamp(48px, 12vw, 160px)", color: t.fg, opacity: 0.04 }}>
            oredola.dev
          </h2>
        </div>

        <div className="mt-[-20px] md:mt-[-40px] grid grid-cols-1 lg:grid-cols-[1.5fr_0.7fr_0.7fr_0.9fr] gap-12 md:gap-10 pb-14">
          {/* Brand */}
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full flex items-center justify-center font-black text-" style={{ background: t.fg, color: t.bg }}>O</div>
              <div>
                <div className="text- font-bold tracking-tight" style={{ color: t.fg }}>oredola.dev</div>
                <div className="text- font-mono tracking-widest" style={{ color: t.muted }}>PRO • ALL-ROUND BUILDER</div>
              </div>
            </div>
            <p className="mt-6 max-w- text- leading-[1.7]" style={{ color: t.muted }}>
              I ship 8 products, mentor 1000+ builders. Build your MVP in 14 days for <span style={{ color: t.fg, fontWeight: 700 }}>$100 max</span>. Available global, work remotely.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text- font-mono" style={{ color: t.muted }}>Available Global • Work Remotely • Lagos • {theme.toUpperCase()}</span>
            </div>
          </div>

          {/* Products - FIXED DIRECT LINKS */}
          <div>
            <div className="text- font-mono tracking-[0.2em] mb-5" style={{ color: t.muted }}>PRODUCTS</div>
            <div className="space-y-3">
              {products.map((p) => (
                <Link
                  key={p.name}
                  href={`/products/${p.slug}`}
                  className="block text- font-medium hover:translate-x-1 transition-transform"
                  style={{ color: p.slug === 'rankengine'? t.fg : t.fg, fontWeight: p.slug === 'rankengine'? 700 : 500 }}
                >
                  {p.name} {p.slug === 'rankengine' && <span className="text- ml-2 px-1.5 py-0.5 rounded" style={{ background: t.fg, color: t.bg }}>SEO</span>}
                </Link>
              ))}
              <div className="pt-3 text- font-mono px-3 py-1 rounded-full inline-flex border" style={{ borderColor: t.border, background: t.card, color: t.muted }}>8 SHIPPED • 2.3K USERS</div>
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="text- font-mono tracking-[0.2em] mb-5" style={{ color: t.muted }}>SERVICES</div>
            <div className="space-y-3">
              <a href="#services" className="block text-" style={{ color: t.fg }}>Build MVP <span className="font-bold">$100</span></a>
              <a href="#services" className="block text-" style={{ color: t.fg }}>Rank.ng <span className="font-bold">$60</span></a>
              <a href="#services" className="block text-" style={{ color: t.fg }}>Mentor <span className="font-bold">$15/hr</span></a>
              <a href="#services" className="block text-" style={{ color: t.fg }}>Monetize <span className="font-bold">$40</span></a>
              <div className="pt-2"><span className="text- font-bold px-2.5 py-1 rounded-full" style={{ background: t.fg, color: t.bg }}>$100 MAX PRICING</span></div>
            </div>
          </div>

          {/* Contact - WhatsApp, GitHub, LinkedIn same style */}
          <div className="rounded- border p-5" style={{ background: t.card, borderColor: t.border }}>
            <div className="text- font-mono tracking-[0.2em] mb-4" style={{ color: t.muted }}>CONNECT</div>
            <div className="flex flex-col gap-2.5">
              <a href="mailto:hello@oredola.dev" className="block text- font-semibold mb-1" style={{ color: t.fg }}>hello@oredola.dev</a>
              <a href="https://wa.me/2349034555644" target="_blank" className="inline-flex items-center gap-2.5 text- font-medium px-4 py-2.5 rounded-full border hover:opacity-80 hover:scale-[1.02] transition-all" style={{ borderColor: t.border, background: t.bg, color: t.fg }}>
                <span className="h-6 w-6 rounded-full bg-[#25D366] flex items-center justify-center text- text-white font-bold">W</span> WhatsApp — Fast reply
              </a>
              <a href="https://github.com/oredolagbenga" target="_blank" className="inline-flex items-center gap-2.5 text- font-medium px-4 py-2.5 rounded-full border hover:opacity-80 hover:scale-[1.02] transition-all" style={{ borderColor: t.border, background: t.bg, color: t.fg }}>
                <span className="h-6 w-6 rounded-full flex items-center justify-center text- font-bold" style={{ background: t.fg, color: t.bg }}>G</span> GitHub — Code & builds
              </a>
              <a href="https://linkedin.com/in/oredola" target="_blank" className="inline-flex items-center gap-2.5 text- font-medium px-4 py-2.5 rounded-full border hover:opacity-80 hover:scale-[1.02] transition-all" style={{ borderColor: t.border, background: t.bg, color: t.fg }}>
                <span className="h-6 w-6 rounded-full bg-[#0A66C2] flex items-center justify-center text- text-white font-bold">in</span> LinkedIn — Work history
              </a>
            </div>
          </div>
        </div>

        {/* Bottom - only place with copyright */}
        <div className="border-t py-7 flex flex-col md:flex-row items-center justify-between gap-3 text- font-mono" style={{ borderColor: t.border, color: t.muted }}>
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} Oredola Gbenga</span>
            <span className="opacity-30">•</span>
            <span>Built in Lagos, works globally</span>
            <span className="opacity-30 hidden md:inline">•</span>
            <span className="hidden md:inline">Next.js 14 • Supabase • Framer</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Operational</span>
            <span className="px-3 py-1 rounded-full border" style={{ borderColor: t.border, background: t.card }}>{theme.toUpperCase()} • $100 MAX</span>
          </div>
        </div>
      </div>
    </footer>
  );
}