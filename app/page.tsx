'use client'
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, KanbanSquare, BarChart3, Users, Zap, Shield, Bell, Check, Star, Plus, Sparkles, TrendingUp } from "lucide-react"
import { SiteNav } from "@/components/layout/SiteNav"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { Container } from "@/components/ui/Container"
import { useState } from "react"

const E = [0.16, 1, 0.3, 1] as const
const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, ease: E } }
const fadeLeft = { initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.5, ease: E } }
const fadeRight = { initial: { opacity: 0, x: 20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.5, ease: E } }

const FEATURES = [
  { icon: KanbanSquare, title: "Visual Pipeline", desc: "Drag-and-drop Kanban. See every deal stage at a glance.", color: "from-blue-500 to-blue-600", bg: "bg-blue-100 text-blue-600" },
  { icon: Users, title: "Lead Management", desc: "Capture, assign, and track leads from any channel.", color: "from-purple-500 to-purple-600", bg: "bg-purple-100 text-purple-600" },
  { icon: BarChart3, title: "Live Analytics", desc: "Revenue and conversion charts in real time.", color: "from-amber-500 to-amber-600", bg: "bg-amber-100 text-amber-600" },
  { icon: Bell, title: "Smart Reminders", desc: "Automated alerts before follow-ups fall through.", color: "from-rose-500 to-rose-600", bg: "bg-rose-100 text-rose-600" },
  { icon: Shield, title: "Secure by Design", desc: "Row-level security. Your data, completely isolated.", color: "from-emerald-500 to-emerald-600", bg: "bg-emerald-100 text-emerald-600" },
  { icon: Zap, title: "Real-Time Sync", desc: "Everything updates instantly across your team.", color: "from-orange-500 to-orange-600", bg: "bg-orange-100 text-orange-600" },
]

const STATS = [
  { value: "10K+", label: "Leads tracked" },
  { value: "KES 4.2M", label: "Pipeline value" },
  { value: "380+", label: "Active teams" },
  { value: "99.9%", label: "Uptime" },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#070B14] text-[#E7ECF6]">
      <SiteNav />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden pt-20 pb-10 sm:pt-24 sm:pb-14">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#38BDF8]/5 to-transparent blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-blue-500/5 to-transparent blur-3xl" />
          <div className="grid-bg absolute inset-0" />
        </div>
        <div className="relative mx-auto max-w-[1200px] px-6">
          <div className="max-w-[580px]">
            <motion.span initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: E }}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#38BDF8]/10 to-[#38BDF8]/5 px-3 py-1 text-[11px] font-medium text-[#38BDF8] border border-[#38BDF8]/10">
              <Sparkles size={11} />
              Built for African businesses
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: E }}
              className="mt-4 h1">
              Close more deals.<br />
              <span className="bg-gradient-to-r from-[#38BDF8] to-[#818CF8] bg-clip-text text-transparent">Move faster.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: E }}
              className="mt-3 body-lg max-w-[420px]">
              The modern CRM built for African sales teams. Track every lead, automate follow-ups, and win more business.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3, ease: E }}
              className="mt-5 flex flex-wrap items-center gap-3">
              <Link href="/signup" className="btn-primary shadow-lg shadow-[#38BDF8]/20">
                Start Free Today <ArrowRight size={15} />
              </Link>
              <Link href="/features" className="btn-secondary">See Features</Link>
            </motion.div>
          </div>
          {/* Decorative elements */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="pointer-events-none absolute -right-16 top-1/2 hidden -translate-y-1/2 lg:block">
            <div className="relative h-[340px] w-[340px]">
              <div className="absolute inset-0 rounded-full border border-[rgba(56, 189, 248,0.06)] animate-float" style={{ animationDuration: "7s" }} />
              <div className="absolute inset-10 rounded-full border border-[rgba(56, 189, 248,0.04)] animate-float" style={{ animationDuration: "9s", animationDelay: "-2s" }} />
              <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-gradient-to-br from-[#38BDF8] to-[#818CF8] shadow-lg shadow-[#38BDF8]/30 flex items-center justify-center">
                <KanbanSquare size={24} className="text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
          className="mx-auto mt-10 max-w-[1200px] px-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.08 }}
                className="rounded-lg border border-[rgba(255,255,255,0.09)] bg-white/5 p-4 text-center backdrop-blur-md">
                <p className="text-lg font-bold text-[#E7ECF6]">{s.value}</p>
                <p className="text-[11px] text-[#8A93A8] mt-0.5">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="section">
        <Container>
          <motion.div {...fadeUp} className="mb-6">
            <p className="section-label mb-1">Features</p>
            <h2 className="h2 max-w-[400px]">Built to close more deals</h2>
            <p className="mt-1 body-lg max-w-[360px]">Six capabilities that make the biggest difference to your team.</p>
          </motion.div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: E }} whileHover={{ y: -4 }}
                className="card p-5 group relative overflow-hidden">
                <div className={`absolute top-0 right-0 h-20 w-20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${c.bg}`} style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
                <div className={`mb-3 flex h-8 w-8 items-center justify-center rounded-lg ${c.bg}`}>
                  <c.icon size={16} />
                </div>
                <h3 className="text-[14px] font-semibold text-[#E7ECF6] relative z-10">{c.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-[#8A93A8] relative z-10">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── DASHBOARD PREVIEW ─── */}
      <section className="section bg-gradient-to-b from-[#0A1120] to-transparent border-t border-[rgba(255,255,255,0.06)]">
        <Container>
          <motion.div {...fadeUp} className="text-center mb-6">
            <p className="section-label mb-1">Product</p>
            <h2 className="h2">See Omix in action</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="rounded-xl border border-[rgba(255,255,255,0.09)] bg-[#0D1626] p-4 shadow-lg sm:p-6">
            <div className="flex items-center gap-1.5 mb-4 pb-4 border-b border-[rgba(255,255,255,0.06)]">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              <span className="ml-2 font-mono text-[10px] text-[#616B80]">app.omixcrm.com</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-4">
              {[{ l: "Total Leads", v: "2,847", c: "text-blue-600 bg-blue-100" }, { l: "Pipeline", v: "KES 4.2M", c: "text-purple-600 bg-purple-100" }, { l: "Won Deals", v: "38", c: "text-green-600 bg-green-100" }, { l: "Win Rate", v: "68%", c: "text-amber-600 bg-amber-100" }].map(k => (
                <div key={k.l} className="rounded-lg border border-[rgba(255,255,255,0.06)] p-3">
                  <p className="text-[10px] text-[#616B80]">{k.l}</p>
                  <p className="text-base font-bold text-[#E7ECF6] mt-0.5">{k.v}</p>
                  <p className={`text-[10px] font-medium mt-0.5 ${k.c.split(" ")[0]}`}>+12.5%</p>
                </div>
              ))}
            </div>
            <div className="flex h-16 items-end gap-2">
              {[40, 62, 35, 78, 53, 95, 74].map((h, i) => (
                <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                  className={`flex-1 rounded-t ${i === 5 ? "bg-gradient-to-t from-[#38BDF8] to-[#818CF8]" : "bg-[rgba(255,255,255,0.09)]"} min-h-[4px]`} />
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section bg-[#0D1626] border-t border-[rgba(255,255,255,0.06)]">
        <Container>
          <motion.div {...fadeUp} className="mb-6 text-center">
            <p className="section-label mb-1">Customers</p>
            <h2 className="h2">Trusted by teams across Kenya</h2>
          </motion.div>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { i: "AO", name: "Amani Otieno", role: "Sales Lead, Northbridge Realty", q: "The pipeline view alone saves our team hours every week. We closed 40% more deals." },
              { i: "FC", name: "Faith Chebet", role: "Ops Manager, Highlands Sacco", q: "Follow-up reminders used to slip. Now nothing gets missed." },
              { i: "KM", name: "Kevin Mwangi", role: "Founder, Westfield Logistics", q: "Setup took an afternoon. Our reps adopted it immediately." },
            ].map((t, i) => (
              <motion.div key={t.i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: E }} whileHover={{ y: -3 }}
                className="card p-5">
                <div className="mb-3 flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={11} className="fill-amber-400 text-amber-400" />)}</div>
                <p className="flex-1 text-[13px] leading-relaxed text-[#8A93A8]">&ldquo;{t.q}&rdquo;</p>
                <div className="mt-3 flex items-center gap-2.5 border-t border-[rgba(255,255,255,0.06)] pt-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#38BDF8] to-[#818CF8] text-[10px] font-semibold text-white">{t.i}</div>
                  <div><p className="text-[12px] font-semibold text-[#E7ECF6]">{t.name}</p><p className="text-[11px] text-[#616B80]">{t.role}</p></div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── CTA ─── */}
      <section className="section">
        <Container>
          <motion.div {...fadeUp} className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#38BDF8] to-[#818CF8] px-6 py-10 text-center sm:px-10 sm:py-12 shadow-xl shadow-[#38BDF8]/20">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
              <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
            </div>
            <div className="relative">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to grow your business?</h2>
              <p className="mx-auto mt-2 max-w-[380px] text-[14px] text-white/80">Join hundreds of teams across Kenya already using Omix.</p>
              <Link href="/signup"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-[13px] font-semibold text-[#05121a] transition-all hover:bg-white/90 hover:shadow-lg mt-5">
                Start Free Today <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  )
}
