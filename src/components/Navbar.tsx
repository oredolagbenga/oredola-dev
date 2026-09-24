"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, THEMES, Theme } from "@/components/ThemeProvider";

const LINKS = [
  { id: "products", label: "Products" },
  { id: "services", label: "Services" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const t = THEMES[theme];
  const [time, setTime] = useState("--:--");
  const [openK, setOpenK] = useState(false);
  const [active, setActive] = useState("stack");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-GB", { timeZone: "Africa/Lagos", hour: "2-digit", minute: "2-digit", hour12: false }));
    tick();
    const id = setInterval(tick, 60000);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpenK(v=>!v); }
      if (e.key === "Escape") setOpenK(false);
    };
    window.addEventListener("keydown", onKey);
    const onScroll = () => {
      const y = window.scrollY + 140;
      for (const l of LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) setActive(l.id);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearInterval(id); window.removeEventListener("keydown", onKey); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b" style={{ background: `${t.bg}E6`, backdropFilter: "blur(20px)", borderColor: t.border }}>
        <div className="mx-auto max-w- flex h- items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full flex items-center justify-center text- font-black" style={{ background: t.fg, color: t.bg }}>O</div>
              <span className="text- font-semibold" style={{ color: t.fg }}>oredola.dev</span>
              <span className="hidden md:inline-flex ml-2 rounded-full border px-2 py-0.5 text- font-mono" style={{ borderColor: t.border, color: t.muted }}>PRO </span>
            </a>
            <nav className="hidden lg:flex items-center rounded-full p-1 border" style={{ background: t.card, borderColor: t.border }}>
              {LINKS.map(l => (
                <a key={l.id} href={`#${l.id}`} className="px-4 py-1.5 rounded-full text- font-medium transition" style={{ background: active===l.id? t.fg : "transparent", color: active===l.id? t.bg : t.muted }}>{l.label}</a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2.5 rounded-full border px-3.5 py-1.5" style={{ background: t.card, borderColor: t.border }}>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text- font-medium" style={{ color: t.fg }}>Available • Remote</span>
              <span className="h-3 w-px" style={{ background: t.border }} />
              <span className="font-mono text-" style={{ color: t.muted }}>{time} WAT</span>
            </div>
            <div className="hidden md:flex items-center rounded-full border p-1" style={{ background: t.card, borderColor: t.border }}>
              {(["dark","light","navy","sage"] as Theme[]).map(k => (
                <button key={k} onClick={() => setTheme(k)} className="h-7 w-7 rounded-full text- font-bold" style={{ background: theme===k? t.fg : "transparent", color: theme===k? t.bg : t.muted }}>{k[0].toUpperCase()}</button>
              ))}
            </div>
            <button onClick={() => setOpenK(true)} className="hidden md:flex h-8 w-8 rounded-full border items-center justify-center text-" style={{ borderColor: t.border, background: t.card, color: t.muted }}>⌘K</button>
            <a href="#contact" className="rounded-full px-5 py-2.5 text- font-semibold" style={{ background: t.fg, color: t.bg }}>Let's talk</a>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {openK && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-start justify-center pt- p-4 bg-black/60 backdrop-blur" onClick={() => setOpenK(false)}>
            <motion.div initial={{ y: 10, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 10, scale: 0.98 }} className="w-full max-w- rounded- border shadow-2xl overflow-hidden" style={{ background: t.card, borderColor: t.border }} onClick={e=>e.stopPropagation()}>
              <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: t.border }}>
                <span style={{ color: t.muted }}>⌕</span>
                <input autoFocus placeholder="Jump to..." className="w-full bg-transparent outline-none text-" style={{ color: t.fg }} />
              </div>
              <div className="p-2">
                {LINKS.map(l => (
                  <a key={l.id} href={`#${l.id}`} onClick={() => setOpenK(false)} className="flex justify-between px-4 py-3 rounded-xl" style={{ color: t.fg }}><span className="text- font-medium">{l.label}</span><span className="text- font-mono" style={{ color: t.muted }}>{l.id}</span></a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}