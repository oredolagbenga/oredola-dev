"use client";
import { useTheme, THEMES, Theme } from "./ThemeProvider";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-1.5 rounded-full border backdrop-blur-xl p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.25)]" style={{ background: "color-mix(in srgb, var(--card) 85%, transparent)", borderColor: "var(--border)" }}>
      {(Object.keys(THEMES) as Theme[]).map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`h-8 w-8 rounded-full text- font-bold tracking-widest transition-all flex items-center justify-center ${theme === t? "scale-110 ring-2 ring-[var(--fg)]/20" : "opacity-60 hover:opacity-100"}`}
          style={{ background: THEMES[t].bg, color: THEMES[t].fg, border: `1px solid ${THEMES[t].border}` }}
          title={THEMES[t].label}
        >
          {t[0].toUpperCase()}
        </button>
      ))}
    </div>
  );
}