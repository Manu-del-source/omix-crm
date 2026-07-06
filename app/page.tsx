'use client'
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, KanbanSquare, BarChart3, Users, Zap, Shield, Bell, Check, Star, Plus } from "lucide-react"
import { SiteNav } from "@/components/layout/SiteNav"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { Container } from "@/components/ui/Container"
import { useState } from "react"

const E = [0.16, 1, 0.3, 1] as const
const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, ease: E } }

const FEATURES = [
  { icon: KanbanSquare, title: "Visual Pipeline", desc: "Drag-and-drop Kanban. See every deal stage at a glance." },
  { icon: Users, title: "Lead Management", desc: "Capture, assign, and track leads from any channel." },
  { icon: BarChart3, title: "Live Analytics", desc: "Revenue and conversion charts in real time." },
  { icon: Bell, title: "Smart Reminders", desc: "Automated alerts before follow-ups fall through." },
  { icon: Shield, title: "Secure by Design", desc: "Row-level security. Your data, completely isolated." },
  { icon: Zap, title: "Real-Time Sync", desc: "Every change appears across your team instantly." },
]

const TESTIMONIALS = [
  { i: "AO", name: "Amani Otieno", role: "Sales Lead, Northbridge Realty", q: "The pipeline view alone saves our team hours every week. We closed 40% more deals in the first month." },
  { i: "FC", name: "Faith Chebet", role: "Ops Manager, Highlands Sacco", q: "Follow-up reminders used to slip through the cracks. Now nothing gets missed." },
  { i: "KM", name: "Kevin Mwangi", role: "Founder, Westfield Logistics", q: "Setup took an afternoon. Our reps adopted it immediately." },
]

const FAQS = [
  { q: "Is my data secure?", a: "Yes. Row-level security means each account's data is completely isolated." },
  { q: "Can I try before paying?", a: "Every plan starts with a free trial. No credit card required." },
  { q: "Does it work on mobile?", a: "Yes. Omix is fully responsive on any device." },
  { q: "What happens if I cancel?", a: "Nothing is deleted. Your records stay safely stored." },
]

export default function HomePage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0)

  return (
    <main className="min-h-screen bg-[#F8F6F3] text-[#1C1917]">
      <SiteNav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-10 sm:pt-24 sm:pb-14">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="max-w-[600px]">
            <motion.span initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: E }}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#FEF2F0] px-3 py-1 text-[11px] font-medium text-[#C73B2A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C73B2A]" />
              Built for African businesses
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: E }}
              className="mt-5 h1">
              Close more deals.<br />
              <span className="text-[#C73B2A]">Move faster.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: E }}
              className="mt-4 body-lg max-w-[420px]">
              The modern CRM built for African sales teams. Track every lead, automate follow-ups, and win more business.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3, ease: E }}
              className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="/signup" className="btn-primary text-[13px] px-5 py-2.5">Start Free Today <ArrowRight size={15} /></Link>
              <Link href="/features" className="btn-secondary text-[13px] px-5 py-2.5">See Features</Link>
            </motion.div>
          </div>
          {/* Decorative element */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="pointer-events-none absolute -right-20 top-1/2 hidden -translate-y-1/2 lg:block">
            <div className="relative h-[400px] w-[400px]">
              <div className="absolute inset-0 rounded-full border border-[rgba(199,59,42,0.08)]" />
              <div className="absolute inset-8 rounded-full border border-[rgba(199,59,42,0.06)]" />
              <div className="absolute inset-16 rounded-full border border-[rgba(199,59,42,0.04)]" />
              <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#FEF2F0] flex items-center justify-center">
                <KanbanSquare size={28} className="text-[#C73B2A]" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Strip */}
      <div className="border-y border-[rgba(0,0,0,0.04)] bg-white py-5">
        <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-wider text-[#A8A29E]">Trusted by teams across East Africa</p>
        <div className="marquee flex w-max gap-10">
          {[...["Northbridge Realty", "Highlands Sacco", "Westfield Logistics", "Two Rivers Holdings", "Coastline Retailers", "Riverside Motors", "Solid Rock Insurance", "Apex Agencies", "Savanna Fintech", "Acacia Agro Traders"], ...["Northbridge Realty", "Highlands Sacco", "Westfield Logistics", "Two Rivers Holdings", "Coastline Retailers", "Riverside Motors", "Solid Rock Insurance", "Apex Agencies", "Savanna Fintech", "Acacia Agro Traders"]].map((n, i) => (
            <span key={i} className="shrink-0 text-[12px] font-medium text-[#A8A29E]">{n}</span>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="section">
        <Container>
          <motion.div {...fadeUp} className="mb-8">
            <p className="section-label mb-2">Features</p>
            <h2 className="h2 max-w-[400px]">Built to close more deals</h2>
            <p className="mt-2 body-lg max-w-[360px]">Six capabilities that make the biggest difference to your team.</p>
          </motion.div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: E }} whileHover={{ y: -3 }}
                className="card p-5">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#FEF2F0]">
                  <c.icon size={16} className="text-[#C73B2A]" />
                </div>
                <h3 className="text-[14px] font-semibold text-[#1C1917]">{c.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-[#78716C]">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="section bg-white border-t border-[rgba(0,0,0,0.04)]">
        <Container>
          <motion.div {...fadeUp} className="mb-8 text-center">
            <p className="section-label mb-2">Customers</p>
            <h2 className="h2">Trusted by teams across Kenya</h2>
          </motion.div>
          <div className="grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: E }} whileHover={{ y: -3 }}
                className="card flex flex-col p-5">
                <div className="mb-3 flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={11} className="fill-[#C73B2A]/20 text-[#C73B2A]" />)}</div>
                <p className="flex-1 text-[13px] leading-relaxed text-[#78716C]">&ldquo;{t.q}&rdquo;</p>
                <div className="mt-4 flex items-center gap-2.5 border-t border-[rgba(0,0,0,0.04)] pt-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FEF2F0] text-[10px] font-semibold text-[#C73B2A]">{t.i}</div>
                  <div><p className="text-[12px] font-semibold text-[#1C1917]">{t.name}</p><p className="text-[11px] text-[#A8A29E]">{t.role}</p></div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="section">
        <Container>
          <div className="mx-auto max-w-[720px]">
            <motion.div {...fadeUp} className="mb-8 text-center">
              <p className="section-label mb-2">FAQ</p>
              <h2 className="h2">Questions, answered</h2>
            </motion.div>
            <div className="divide-y divide-[rgba(0,0,0,0.04)]">
              {FAQS.map((f, i) => {
                const isOpen = faqOpen === i
                return (
                  <div key={f.q}>
                    <button type="button" onClick={() => setFaqOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-4 text-left" aria-expanded={isOpen}>
                      <span className={`text-[14px] font-medium transition-colors ${isOpen ? "text-[#1C1917]" : "text-[#78716C]"}`}>{f.q}</span>
                      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${isOpen ? "border-[#C73B2A]/30 bg-[#FEF2F0] text-[#C73B2A]" : "border-[rgba(0,0,0,0.08)] text-[#A8A29E]"}`}>
                        <Plus size={11} />
                      </motion.span>
                    </button>
                    {isOpen && <p className="pb-4 text-[13px] leading-relaxed text-[#78716C]">{f.a}</p>}
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section bg-white border-t border-[rgba(0,0,0,0.04)]">
        <Container>
          <motion.div {...fadeUp} className="mx-auto max-w-[540px] text-center">
            <h2 className="h2">Ready to grow your business?</h2>
            <p className="mt-3 body-lg">Join hundreds of teams across Kenya already using Omix.</p>
            <Link href="/signup" className="btn-primary mt-8">Start Free Today <ArrowRight size={16} /></Link>
          </motion.div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  )
}
