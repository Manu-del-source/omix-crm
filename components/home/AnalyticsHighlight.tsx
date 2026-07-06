"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { CheckCircle, ArrowRight } from "lucide-react"
import { Container } from "@/components/ui/Container"
import { SectionLabel } from "@/components/ui/SectionLabel"

const E = [0.16, 1, 0.3, 1] as const
const DATA = [
  { m: "Jan", r: 320 }, { m: "Feb", r: 410 }, { m: "Mar", r: 380 },
  { m: "Apr", r: 520 }, { m: "May", r: 490 }, { m: "Jun", r: 680 },
  { m: "Jul", r: 750 },
]
const POINTS = ["Live revenue and pipeline charts", "Win rate by rep and stage", "No exports &mdash; just clarity"]

function Tip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-[10px] border border-white/[.08] bg-[#181818] px-3.5 py-2.5 shadow-xl">
      <p className="text-[11px] text-[#A3A3A3]">{label}</p>
      <p className="mt-0.5 font-mono text-[13px] font-bold text-white">KES {(payload[0].value / 1000).toFixed(0)}K</p>
    </div>
  )
}

function ChartVisual() {
  return (
    <div className="rounded-[20px] border border-white/[.07] bg-[#111] p-6 shadow-[0_24px_64px_rgba(0,0,0,.5)]">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-[13px] font-semibold text-zinc-200">Monthly Revenue</p>
        <span className="rounded-full border border-[#FACC15]/15 bg-[#FACC15]/[.07] px-3 py-1 text-[11px] font-bold text-[#FACC15]">+18.4% YoY</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={DATA} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
          <defs>
            <linearGradient id="gYh" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FACC15" stopOpacity={.18} />
              <stop offset="95%" stopColor="#FACC15" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.04)" vertical={false} />
          <XAxis dataKey="m" tick={{ fill: "#404040", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#404040", fontSize: 11 }} axisLine={false} tickLine={false}
            tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`} />
          <Tooltip content={<Tip />} />
          <Area type="monotone" dataKey="r" stroke="#FACC15" strokeWidth={2} fill="url(#gYh)" dot={false}
            activeDot={{ r: 5, fill: "#FACC15", stroke: "#0A0A0A", strokeWidth: 2 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function AnalyticsHighlight() {
  return (
    <section id="analytics" className="section-pad bg-surface border-y border-white/[.05]">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: .65, ease: E }} className="order-2 lg:order-1">
            <ChartVisual />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: .65, ease: E }} className="order-1 lg:order-2">
            <SectionLabel>Analytics</SectionLabel>
            <h2 className="mt-4 heading-md text-white">
              Data that drives decisions
            </h2>
            <p className="mt-4 text-[17px] leading-[1.75] text-[#A3A3A3] sm:text-[18px]">
              Every metric updates live as deals move. No manual reports, no guesswork.
            </p>
            <ul className="mt-7 space-y-3">
              {POINTS.map(p => (
                <li key={p} className="flex items-center gap-3 text-[15px] text-[#A3A3A3]">
                  <CheckCircle size={16} className="shrink-0 text-[#FACC15]" />{p}
                </li>
              ))}
            </ul>
            <Link href="/analytics"
              className="mt-7 inline-flex items-center gap-1.5 text-[14px] font-semibold text-white transition-colors hover:text-[#FACC15]">
              Explore analytics <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
