"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const PRODUCTS = [
  { name: "AcademiaBase", users: "2.3k", status: "live", revenue: "$420/mo" },
  { name: "LearnVault", users: "1.8k", status: "live", revenue: "$310/mo" },
  { name: "RankEngine", users: "890", status: "live", revenue: "$180/mo" },
  { name: "ExamAI", users: "3.1k", status: "beta", revenue: "$0" },
  { name: "NaijaSEO Kit", users: "560", status: "live", revenue: "$120/mo" },
  { name: "StudentPay", users: "1.2k", status: "building", revenue: "$0" },
];

export default function ProductFactory() {
  const [active, setActive] = useState(0);
  const [logs, setLogs] = useState<string[]>(["> factory boot... ready"]);

  const run = (idx: number) => {
    setActive(idx);
    const p = PRODUCTS[idx];
    setLogs(l => [`> opening ${p.name}...`, `> users: ${p.users} | ${p.status}`, `> revenue: ${p.revenue}`, `> status: OK`, ...l].slice(0,5));
  };

  return (
    <div className="relative rounded-[20px] border border-white/10 bg-[#101012] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-5 py-3">
        <div className="flex gap-1.5"><div className="h-3 w-3 rounded-full bg-red-500/70" /><div className="h-3 w-3 rounded-full bg-yellow-500/70" /><div className="h-3 w-3 rounded-full bg-green-500/70" /></div>
        <span className="font-mono text-[11px] text-white/30">product-factory.ts — LIVE FACTORY</span>
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      <div className="p-4 grid grid-cols-2 gap-2">
        {PRODUCTS.map((p, i) => (
          <button key={p.name} onClick={() => run(i)} className={`text-left rounded-xl border px-3 py-2.5 transition ${active===i? "bg-white text-black border-white" : "bg-white/[0.04] border-white/10 hover:bg-white/[0.08] text-white/70"}`}>
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold">{p.name}</span>
              <span className={`h-1.5 w-1.5 rounded-full ${p.status==="live"?"bg-emerald-400":p.status==="beta"?"bg-yellow-400":"bg-white/20"}`} />
            </div>
            <div className="mt-1 font-mono text-[10px] opacity-60">{p.users} • {p.status}</div>
          </button>
        ))}
      </div>

      <div className="mx-4 mb-4 rounded-xl bg-black/50 border border-white/5 p-3 font-mono text-[11px] leading-5">
        {logs.map((log, i) => (
          <div key={i} className={`${i===0?"text-emerald-400":"text-white/30"}`}>{log}</div>
        ))}
        <div className="mt-3 flex gap-2">
          <a href={`#${PRODUCTS[active].name}`} className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-black">Open {PRODUCTS[active].name} →</a>
          <span className="text-white/20 text-[10px] py-1">press to deploy</span>
        </div>
      </div>

      <div className="border-t border-white/5 bg-white/[0.02] px-5 py-2.5 flex justify-between text-[11px] font-mono">
        <span className="text-white/20">8 products • 1000+ users</span>
        <span className="text-white/40">{PRODUCTS[active].revenue} MRR</span>
      </div>
    </div>
  );
}
