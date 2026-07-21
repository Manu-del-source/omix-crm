'use client'
import Link from "next/link"
import { motion } from "framer-motion"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { SiteNav } from "@/components/layout/SiteNav"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { PageHero } from "@/components/ui/PageHero"
import { Container } from "@/components/ui/Container"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { TrendingUp, ArrowRight, BarChart3, Target, DollarSign, Clock } from "lucide-react"

const E = [0.16, 1, 0.3, 1] as const
const s = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const it = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: E } } }

const DATA = [{ m: "Jan", r: 320, l: 42 }, { m: "Feb", r: 410, l: 55 }, { m: "Mar", r: 380, l: 48 }, { m: "Apr", r: 520, l: 67 }, { m: "May", r: 490, l: 61 }, { m: "Jun", r: 680, l: 84 }, { m: "Jul", r: 750, l: 92 }]
const METRICS = [
  { icon: DollarSign, label: "Total Revenue", value: "KES 4.2M", change: "+18.4%" },
  { icon: Target, label: "Conversion Rate", value: "68%", change: "+5.2%" },
  { icon: BarChart3, label: "Avg Deal Size", value: "KES 110K", change: "+12.1%" },
  { icon: Clock, label: "Sales Cycle", value: "12 days", change: "-3 days" },
]

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#070B14] text-[#E7ECF6]">
      <SiteNav />
      <PageHero label="Analytics" heading="Data that drives decisions"
        sub="Live revenue charts, conversion funnels, and win-rate trends — all updating in real time as your team closes deals.">
        <Link href="/signup" className="btn-primary">Start Free <ArrowRight size={16} /></Link>
      </PageHero>

      <section className="section border-t border-[rgba(255,255,255,0.09)]">
        <Container>
          <motion.div variants={s} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {METRICS.map(m => (
              <motion.div key={m.label} variants={it} className="card p-6 hover:shadow-md">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#38BDF8]/10"><m.icon size={18} className="text-[#38BDF8]" /></div>
                <p className="text-[13px] text-[#8A93A8]">{m.label}</p>
                <p className="mt-1.5 text-[26px] font-extrabold tracking-tight text-[#E7ECF6]">{m.value}</p>
                <div className="mt-2 flex items-center gap-1.5"><TrendingUp size={12} className="text-[#38BDF8]" /><span className="text-[12px] font-bold text-[#38BDF8]">{m.change}</span></div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <section className="section border-t border-[rgba(255,255,255,0.09)]">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: E }} className="card p-6">
              <div className="mb-5 flex items-center justify-between">
                <div><SectionLabel>Revenue</SectionLabel><h3 className="mt-2 text-[18px] font-bold text-[#E7ECF6]">Monthly Revenue</h3></div>
                <span className="rounded-full border border-[#38BDF8]/15 bg-[#38BDF8]/[0.07] px-3 py-1 text-[11px] font-bold text-[#38BDF8]">+18.4% YoY</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={DATA} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <defs><linearGradient id="gY" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#38BDF8" stopOpacity={0.18} /><stop offset="95%" stopColor="#38BDF8" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" vertical={false} />
                  <XAxis dataKey="m" tick={{ fill: "#616B80", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#616B80", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: "#0D1626", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 10, color: "#E7ECF6" }} />
                  <Area type="monotone" dataKey="r" stroke="#38BDF8" strokeWidth={2} fill="url(#gY)" dot={false} activeDot={{ r: 4, fill: "#38BDF8", stroke: "#0D1626", strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: E }} className="card p-6">
              <div className="mb-5 flex items-center justify-between">
                <div><SectionLabel>Pipeline</SectionLabel><h3 className="mt-2 text-[18px] font-bold text-[#E7ECF6]">New Leads / Month</h3></div>
                <span className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] px-3 py-1 text-[11px] text-[#8A93A8]">92 this month</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={DATA} margin={{ top: 4, right: 4, left: -24, bottom: 0 }} barSize={16}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" vertical={false} />
                  <XAxis dataKey="m" tick={{ fill: "#616B80", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#616B80", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} contentStyle={{ background: "#0D1626", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 10, fontSize: 12, color: "#E7ECF6" }} />
                  <Bar dataKey="l" fill="#38BDF8" radius={[4, 4, 0, 0]} opacity={0.8} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1, ease: E }} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[{ l: "Pipeline Health", p: 82 }, { l: "Lead Quality", p: 68 }, { l: "Follow-Up Rate", p: 91 }].map(c => (
              <div key={c.l} className="card flex items-center gap-5 p-6">
                <svg viewBox="0 0 36 36" className="h-14 w-14 shrink-0 -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="2.5" />
                  <motion.circle cx="18" cy="18" r="14" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 14}`} initial={{ strokeDashoffset: 2 * Math.PI * 14 }}
                    whileInView={{ strokeDashoffset: 2 * Math.PI * 14 * (1 - c.p / 100) }} viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }} />
                </svg>
                <div><p className="text-[22px] font-extrabold tracking-tight text-[#E7ECF6]">{c.p}%</p><p className="text-[13px] text-[#8A93A8]">{c.l}</p></div>
              </div>
            ))}
          </motion.div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  )
}
