"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { LayoutDashboard, Users, KanbanSquare, TrendingUp, Search, Bell, CheckCircle, Clock } from "lucide-react"
import { Container } from "@/components/ui/Container"
import { SectionLabel } from "@/components/ui/SectionLabel"

const E = [0.16, 1, 0.3, 1] as const

/* ─── Tab visuals ─────────────────────────────────────────────────── */
function DashboardView() {
  const kpis = [
    { l: "Total Leads", v: "2,847", d: "+8.2%" },
    { l: "Pipeline", v: "KES 4.2M", d: "+14.5%" },
    { l: "Won Deals", v: "38", d: "+5.1%" },
    { l: "Avg Deal", v: "KES 110K", d: "+12%" },
  ]
  const bars = [40, 62, 35, 78, 53, 95, 74]
  const leads = [
    { i: "JO", n: "James Odhiambo", co: "Two Rivers Holdings", s: "Hot",  c: "text-red-400 bg-red-500/10", v: "KES 380K" },
    { i: "GW", n: "Grace Wanjiku",   co: "Northbridge Realty",  s: "Warm", c: "text-amber-400 bg-amber-500/10", v: "KES 120K" },
    { i: "SW", n: "Susan Waweru",    co: "Coastline Retailers", s: "Hot",  c: "text-red-400 bg-red-500/10", v: "KES 900K" },
    { i: "DM", n: "David Mwangi",    co: "Highlands Sacco",     s: "New",  c: "text-zinc-400 bg-zinc-500/10", v: "KES 55K" },
  ]
  const tasks = [
    { t: "Call James re: proposal", ok: true },
    { t: "Send Grace's contract", ok: false },
    { t: "Follow up on KCB demo", ok: false },
  ]
  return (
    <div className="space-y-4">
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map((k, i) => (
          <motion.div key={k.l} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .05 * i, duration: .45, ease: E }}
            className="rounded-[14px] border border-white/[.06] bg-[#171717] p-4">
            <p className="text-[11px] text-[#525252]">{k.l}</p>
            <p className="mt-1 text-[17px] font-extrabold tracking-tight text-white">{k.v}</p>
            <div className="mt-1.5 flex items-center gap-1">
              <TrendingUp size={10} className="text-[#FACC15]" />
              <span className="text-[10px] font-bold text-[#FACC15]">{k.d}</span>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Chart + leads + tasks */}
      <div className="grid gap-3 lg:grid-cols-[1.3fr_1.4fr_.9fr]">
        <div className="rounded-[14px] border border-white/[.06] bg-[#171717] p-4">
          <p className="mb-3 text-[12px] font-semibold text-[#737373]">Pipeline by Stage</p>
          <div className="flex h-[80px] items-end gap-1.5">
            {bars.map((h, i) => (
              <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }}
                transition={{ delay: .1 + i * .05, duration: .6, ease: E }}
                className={`flex-1 rounded-t-[4px] ${i === 5 ? "bg-[#FACC15]" : "bg-white/[.07]"}`} />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[9px] text-[#404040]">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map(m => <span key={m}>{m}</span>)}
          </div>
        </div>
        <div className="rounded-[14px] border border-white/[.06] bg-[#171717] p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[12px] font-semibold text-[#737373]">Recent Leads</p>
            <div className="flex items-center gap-1.5 rounded-lg border border-white/[.05] px-2 py-1">
              <Search size={10} className="text-[#525252]" /><span className="text-[10px] text-[#525252]">Search&hellip;</span>
            </div>
          </div>
          <div className="space-y-2">
            {leads.map(l => (
              <div key={l.i} className="flex items-center justify-between gap-2 rounded-[10px] bg-white/[.03] px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[.07] text-[9px] font-bold">{l.i}</div>
                  <div>
                    <p className="text-[12px] font-medium text-zinc-100">{l.n}</p>
                    <p className="text-[10px] text-[#525252]">{l.co}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${l.c}`}>{l.s}</span>
                  <span className="hidden font-mono text-[10px] text-[#737373] sm:block">{l.v}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[14px] border border-white/[.06] bg-[#171717] p-4">
          <p className="mb-3 text-[12px] font-semibold text-[#737373]">Today&apos;s Tasks</p>
          <div className="space-y-3">
            {tasks.map(t => (
              <div key={t.t} className="flex items-start gap-2">
                {t.ok
                  ? <CheckCircle size={13} className="mt-0.5 shrink-0 text-[#FACC15]" />
                  : <Clock size={13} className="mt-0.5 shrink-0 text-[#404040]" />}
                <p className={`text-[12px] leading-tight ${t.ok ? "text-[#404040] line-through" : "text-zinc-300"}`}>{t.t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function LeadsView() {
  const rows = [
    { i: "JO", n: "James Odhiambo", co: "Two Rivers Holdings", s: "Hot",  v: "KES 380K", stage: "Proposal",   sc: "text-red-400 bg-red-500/10" },
    { i: "GW", n: "Grace Wanjiku",   co: "Northbridge Realty",  s: "Warm", v: "KES 120K", stage: "Qualified",  sc: "text-amber-400 bg-amber-500/10" },
    { i: "SW", n: "Susan Waweru",    co: "Coastline Retailers", s: "Hot",  v: "KES 900K", stage: "Negotiation", sc: "text-red-400 bg-red-500/10" },
    { i: "DM", n: "David Mwangi",    co: "Highlands Sacco",     s: "New",  v: "KES 55K",  stage: "New Lead",   sc: "text-zinc-400 bg-zinc-500/10" },
    { i: "AO", n: "Alice Ouma",      co: "Apex Agencies",       s: "Warm", v: "KES 240K", stage: "Qualified",  sc: "text-amber-400 bg-amber-500/10" },
  ]
  return (
    <div className="overflow-hidden rounded-[14px] border border-white/[.06] bg-[#171717]">
      <div className="flex items-center justify-between border-b border-white/[.05] px-5 py-4">
        <p className="text-[13px] font-semibold text-white">
          All Leads <span className="ml-2 rounded-full bg-white/[.06] px-2 py-0.5 text-[11px] text-[#737373]">2,847</span>
        </p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-white/[.06] bg-white/[.03] px-3 py-1.5">
            <Search size={11} className="text-[#525252]" /><span className="text-[12px] text-[#525252]">Search leads&hellip;</span>
          </div>
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-white/[.06] bg-white/[.03]">
            <Bell size={13} className="text-[#525252]" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FACC15] text-[8px] font-bold text-black">3</span>
          </div>
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/[.04] text-left">
            {["Name", "Company", "Stage", "Value", "Status"].map(h => (
              <th key={h} className="px-5 py-3 text-[11px] font-semibold text-[#525252]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <motion.tr key={r.i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: .05 * i, duration: .4, ease: E }}
              className="border-b border-white/[.03] transition-colors hover:bg-white/[.02]">
              <td className="px-5 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[.07] text-[10px] font-bold">{r.i}</div>
                  <span className="text-[13px] font-medium text-zinc-100">{r.n}</span>
                </div>
              </td>
              <td className="px-5 py-3 text-[13px] text-[#737373]">{r.co}</td>
              <td className="px-5 py-3 text-[13px] text-[#A3A3A3]">{r.stage}</td>
              <td className="px-5 py-3 font-mono text-[13px] font-medium text-white">{r.v}</td>
              <td className="px-5 py-3">
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${r.sc}`}>{r.s}</span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PipelineView() {
  const cols = [
    { n: "New",       c: "#71717a", cards: [{ i: "AA", n: "Acacia Agro", v: "KES 220K" }, { i: "SR", n: "Solid Rock", v: "KES 95K" }] },
    { n: "Qualified", c: "#f59e0b", cards: [{ i: "NR", n: "Northbridge", v: "KES 1.2M" }, { i: "WL", n: "Westfield", v: "KES 690K" }] },
    { n: "Proposal",  c: "#FACC15", cards: [{ i: "TR", n: "Two Rivers", v: "KES 540K" }] },
    { n: "Won",       c: "#22c55e", cards: [{ i: "HS", n: "Highlands", v: "KES 875K" }, { i: "RM", n: "Riverside", v: "KES 1.05M" }] },
  ]
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cols.map((col, ci) => (
        <div key={col.n} className="rounded-[14px] border border-white/[.06] bg-[#171717] p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: col.c }} />
              <span className="text-[12px] font-bold text-[#A3A3A3]">{col.n}</span>
            </div>
            <span className="rounded-full bg-white/[.05] px-2 py-0.5 text-[10px] text-[#525252]">{col.cards.length}</span>
          </div>
          <div className="space-y-2.5">
            {col.cards.map((card, ci2) => (
              <motion.div key={card.i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: .07 * (ci + ci2), duration: .4, ease: E }}
                className="rounded-[10px] border border-white/[.05] bg-[#111] p-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[.07] text-[9px] font-bold">{card.i}</div>
                  <div>
                    <p className="text-[12px] font-semibold text-zinc-100">{card.n}</p>
                    <p className="font-mono text-[10px] text-[#525252]">{card.v}</p>
                  </div>
                </div>
                <div className="mt-2.5 h-[2px] overflow-hidden rounded-full bg-white/[.05]">
                  <div className="h-full rounded-full" style={{
                    background: col.c,
                    width: col.n === "Won" ? "100%" : col.n === "Proposal" ? "75%" : col.n === "Qualified" ? "50%" : "25%",
                  }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const TABS = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", view: <DashboardView /> },
  { id: "leads",     icon: Users,           label: "Leads",     view: <LeadsView /> },
  { id: "pipeline",  icon: KanbanSquare,    label: "Pipeline",  view: <PipelineView /> },
]

export function ProductShowcase() {
  const [active, setActive] = useState("dashboard")
  const current = TABS.find(t => t.id === active)!

  return (
    <section className="section-pad bg-surface border-y border-white/[.05]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: .6, ease: E }}
          className="mb-10 text-center sm:mb-12"
        >
          <SectionLabel>Product</SectionLabel>
          <h2 className="mt-4 heading-lg text-white">
            See Omix CRM in action
          </h2>
          <p className="mx-auto mt-3 max-w-[400px] text-[17px] leading-[1.75] text-[#A3A3A3] sm:text-[18px]">
            Everything your team needs in one fast, clean interface.
          </p>
        </motion.div>

        {/* Tab bar — pill style */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-2xl border border-white/[.07] bg-[#111] p-1 shadow-md">
            {TABS.map(t => (
              <button key={t.id} type="button" onClick={() => setActive(t.id)}
                className={`relative flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-semibold transition-all duration-200 ${
                  active === t.id
                    ? "text-white"
                    : "text-[#737373] hover:text-white"
                }`}>
                {active === t.id && (
                  <motion.span layoutId="active-tab"
                    className="absolute inset-0 rounded-xl bg-[#FACC15]/[.12] border border-[#FACC15]/15"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <t.icon size={14} />
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Product view */}
        <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .35, ease: E }}
          className="overflow-hidden rounded-[20px] border border-white/[.08] bg-[#111] p-4 shadow-[0_32px_80px_rgba(0,0,0,.7)] sm:p-6">
          {/* Mini chrome */}
          <div className="mb-4 flex items-center gap-1.5 rounded-[10px] border border-white/[.05] bg-[#171717] px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-red-500/60" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/60" />
            <span className="h-2 w-2 rounded-full bg-green-500/60" />
            <span className="ml-2 font-mono text-[10px] text-[#404040]">app.omixcrm.com/{active}</span>
          </div>
          {current.view}
        </motion.div>
      </Container>
    </section>
  )
}
