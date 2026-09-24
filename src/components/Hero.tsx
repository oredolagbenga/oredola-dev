"use client";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme, THEMES, Theme } from "@/components/ThemeProvider";

const words = ["AI Tools", "SaaS Products", "SEO Systems", "EdTech"];

type Product = {
  name: string;
  stat: string;
  status: "live" | "beta" | "building";
  dot: "green" | "yellow" | "gray";
  desc: string;
};

const products: Product[] = [
  { name: "AcademiaBase", stat: "2.3k", status: "live", dot: "green", desc: "AI research hub" },
  { name: "LearnVault", stat: "1.8k", status: "live", dot: "green", desc: "Study vault" },
  { name: "RankEngine", stat: "890", status: "live", dot: "green", desc: "SEO engine" },
  { name: "ExamAI", stat: "3.1k", status: "beta", dot: "yellow", desc: "AI exam prep" },
  { name: "NaijaSEO Kit", stat: "560", status: "live", dot: "green", desc: "Local SEO kit" },
  { name: "StudentPay", stat: "1.2k", status: "building", dot: "gray", desc: "Student payments" },
];

export default function Hero() {
  const { theme } = useTheme();
  const t = THEMES[theme];

  // Cursor tracking - ONE circle moves
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 20, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 20, damping: 25 });

  const [active, setActive] = useState(0);
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>(["> factory boot... ready"]);
  const [deploying, setDeploying] = useState(false);

  // Mouse move - only background circle
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 120);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 80);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  // Typewriter
  useEffect(() => {
    const word = words[wordIndex];
    let char = 0;
    let deleting = false;
    let timer: any;
    const tick = () => {
      if (!deleting) {
        setDisplay(word.slice(0, char + 1));
        char++;
        if (char === word.length) setTimeout(() => (deleting = true), 1800);
      } else {
        setDisplay(word.slice(0, char - 1));
        char--;
        if (char <= 0) {
          deleting = false;
          char = 0;
          setWordIndex((p) => (p + 1) % words.length);
          clearInterval(timer);
        }
      }
    };
    timer = setInterval(tick, deleting ? 30 : 85);
    return () => clearInterval(timer);
  }, [wordIndex]);

  // Logs when active changes
  const handleSelect = (i: number) => {
    setActive(i);
    const p = products[i];
    setLogs([
      `> loading ${p.name.toLowerCase()}...`,
      `> checking status :: ${p.status}`,
      `> ${p.name.toLowerCase()} :: ${p.stat} users • ready`,
    ]);
  };

  const handleDeploy = () => {
    setDeploying(true);
    setLogs((l) => [...l, `> deploying ${products[active].name.toLowerCase()}...`]);
    setTimeout(() => {
      setLogs((l) => [...l, `> deployed ✔ ${products[active].name} live`]);
      setDeploying(false);
    }, 1200);
  };

  // Theme-based colors
  const isLight = theme === "light";
  const bgCircle1 = {
    dark: "bg-[#1e3a8a]/40",
    light: "bg-[#a8bbff]/30",
    navy: "bg-[#1e3a8a]/50",
    sage: "bg-[#1a3d2e]/50",
  }[theme];
  const bgCircle2 = {
    dark: "bg-[#2a4db7]/50",
    light: "bg-[#7fa0ff]/25",
    navy: "bg-[#2a4db7]/70",
    sage: "bg-[#2a6b4a]/40",
  }[theme];

  return (
    <section className="relative mx-auto max-w-[1320px] px-6 md:px-10 overflow-hidden min-h-[80vh]">
      {/* BACKGROUND - theme aware */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0" style={{ background: t.bg }} />
        {/* grid */}
        <div
          className="absolute inset-0"
          style={{
            opacity: isLight ? 0.04 : 0.12,
            backgroundImage: `linear-gradient(${isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"} 1px, transparent 1px), linear-gradient(90deg, ${isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"} 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        {/* Circle 1 - STATIC */}
        <div className={`absolute left-[-5%] top-[8%] h-[600px] w-[700px] rounded-full blur-0 ${bgCircle1}`} />
        {/* Circle 2 - MOVES WITH CURSOR */}
        <motion.div
          style={{ x: springX, y: springY }}
          className={`absolute left-[22%] top-[28%] h-[720px] w-[820px] rounded-full blur-0 ${bgCircle2}`}
        />
        <div className={`absolute right-[5%] bottom-[5%] h- w- rounded-full blur- opacity-30 ${bgCircle1}`} />
      </div>
      
      

      <div className="relative grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-10 md:gap-12 py-16 md:py-24 items-center">
        {/* LEFT */}
        <div>
          <div
            className="inline-flex items-center gap-2 rounded-full border backdrop-blur px-3 py-1"
            style={{ borderColor: t.border, background: isLight ? "white" : "rgba(0,0,0,0.2)" }}
          >
            <span className="rounded-full bg-white text-black light:bg-black light:text-white px-2.5 py-0.5 text-[11px] font-bold tracking-widest" style={{ background: isLight ? "#000" : "#fff", color: isLight ? "#fff" : "#000" }}>
              SENIOR
            </span>
            <span className="text-[11px]" style={{ color: isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)" }}>
              Web Dev × AI Engineer × SEO — 8 shipped
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
          </div>

          <h1 className="mt-8 font-black leading-[0.88] tracking-[-0.05em] text-[56px] md:text-[88px]">
            <span className="block" style={{ color: t.fg, textShadow: isLight ? "none" : "0 0 30px rgba(255,255,255,0.4)" }}>
              Oredola
            </span>
            <span className="block" style={{ color: isLight ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.35)" }}>
              Gbenga
            </span>
          </h1>

          <div className="mt-10 flex items-center gap-4">
            <span className="text-[26px] md:text-[32px] font-bold tracking-tight" style={{ color: t.fg }}>
              Building
            </span>
            <div
              className="min-w-[180px] md:min-w-[240px] h-[44px] rounded-[12px] flex items-center px-5"
              style={{
                background: isLight ? "#0a0a0a" : "#ffffff",
                boxShadow: isLight ? "0 0 0 1px rgba(0,0,0,0.08)" : "0 0 30px rgba(255,255,255,0.7)",
              }}
            >
              <span className="font-mono text-[17px] md:text-[18px] font-medium tracking-tight" style={{ color: isLight ? "#fff" : "rgba(0,0,0,0.7)" }}>
                {display}
                <span className="animate-pulse" style={{ color: isLight ? "#fff" : "#000" }}>
                  |
                </span>
              </span>
            </div>
          </div>

          <p className="mt-8 max-w-[38ch] text-[13px] leading-[1.7]" style={{ color: isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)" }}>
            Building tools that African students actually use.
            <br />
            Tutor to 1000+ builders. Shipping with Next.js, AI &<br />
            SEO that ranks. Remote — Lagos → Global.
          </p>

          <div className="mt-8 flex gap-3">
            <a
             href="/products"
              className="rounded-full px-6 py-2.5 text-[13px] font-medium transition hover:opacity-90"
              style={{ background: isLight ? "#0a0a0a" : "#fff", color: isLight ? "#fff" : "#000" }}
            >
              Explore 8 products →
            </a>
            <a
              href="#stack"
              className="rounded-full border backdrop-blur px-6 py-2.5 text-[13px] transition"
              style={{ borderColor: t.border, color: isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)", background: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)" }}
            >
              How I ship
            </a>
          </div>

          {/* UPDATED LINKS - oredolagbenga not GNetSolution */}
          <div className="mt-6 flex items-center gap-3 font-mono text-[11px]" style={{ color: isLight ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.25)" }}>
            <a href="https://github.com/oredolagbenga" target="_blank" rel="noopener" className="hover:opacity-70 transition">github.com/oredolagbenga</a>
            <span className="h-3 w-px" style={{ background: t.border }} />
            <a href="https://vercel.com/oredolagbenga" target="_blank" rel="noopener" className="hover:opacity-70 transition">vercel</a>
            <span className="h-3 w-px" style={{ background: t.border }} />
            <a href="https://linkedin.com/in/oredolagbenga" target="_blank" rel="noopener" className="hover:opacity-70 transition">linkedin</a>
            <span className="ml-2 text-[9px]">ex-GNetSolution ✓</span>
          </div>
        </div>

        {/* RIGHT - FULLY FUNCTIONAL FACTORY */}
        <div className="relative">
          <div
            className="relative rounded-[20px] border backdrop-blur-2xl overflow-hidden"
            style={{
              background: isLight ? "#ffffff" : "rgba(0,0,0,0.4)",
              borderColor: t.border,
              boxShadow: isLight ? "0 20px 60px -20px rgba(0,0,0,0.15)" : "0 30px 100px -20px rgba(0,0,0,0.8)",
            }}
          >
            {/* header */}
            <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: t.border, background: isLight ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <div className="h-3 w-3 rounded-full bg-[#28ca42]" />
              </div>
              <div className="text-[11px] tracking-wide font-mono" style={{ color: isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)" }}>
                product-factory.ts — LIVE FACTORY
              </div>
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* grid - FUNCTIONAL */}
            <div className="p-4 grid grid-cols-2 gap-3">
              {products.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => handleSelect(i)}
                  className="text-left rounded-[14px] p-3.5 border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: active === i ? (isLight ? "#0a0a0a" : "#fef9e8") : isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)",
                    borderColor: active === i ? (isLight ? "#0a0a0a" : "#fef9e8") : t.border,
                    boxShadow: active === i ? (isLight ? "0 0 0 1px #000" : "0 0 30px rgba(254,249,232,0.6)") : "none",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="text-[13px] font-semibold" style={{ color: active === i ? (isLight ? "#fff" : "rgba(0,0,0,0.7)") : t.fg }}>
                      {p.name}
                    </div>
                    <div
                      className={`h-1.5 w-1.5 rounded-full mt-1.5 ${
                        p.dot === "green" ? "bg-emerald-400" : p.dot === "yellow" ? "bg-yellow-400" : "bg-white/20"
                      }`}
                      style={{ background: p.dot === "gray" ? (isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)") : undefined }}
                    />
                  </div>
                  <div className="text-[11px] mt-1 font-mono" style={{ color: active === i ? (isLight ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.4)") : isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)" }}>
                    {p.stat} • {p.status}
                  </div>
                  <div className="text-[10px] mt-1 opacity-60" style={{ color: active === i ? (isLight ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)") : isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.3)" }}>
                    {p.desc}
                  </div>
                </button>
              ))}
            </div>

            <div className="px-5 py-3 min-h-[90px] border-t" style={{ borderColor: t.border }}>
              <div className="space-y-1">
                {logs.slice(-3).map((log, i) => (
                  <motion.div
                    key={log + i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[11px] font-mono"
                    style={{ color: i === logs.length - 1 ? "#22c55e" : isLight ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.25)" }}
                  >
                    {log}
                  </motion.div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={handleDeploy}
                  disabled={deploying}
                  className="rounded-full px-4 py-1.5 text-[11px] font-medium transition disabled:opacity-50"
                  style={{
                    background: isLight ? "#0a0a0a" : "#fef9e8",
                    color: isLight ? "#fff" : "rgba(0,0,0,0.7)",
                  }}
                >
                  {deploying ? "Deploying..." : `Open ${products[active].name} →`}
                </button>
                <span className="text-[11px] font-mono" style={{ color: isLight ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.2)" }}>
                  {deploying ? "building..." : "press to deploy"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between px-5 py-3 border-t" style={{ borderColor: t.border, background: isLight ? "rgba(0,0,0,0.02)" : "rgba(0,0,0,0.2)" }}>
              <span className="text-[11px] font-mono" style={{ color: isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.3)" }}>
                8 products • 1000+ users
              </span>
              <span className="text-[11px] font-mono" style={{ color: isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.3)" }}>
                $420/mo MRR
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
