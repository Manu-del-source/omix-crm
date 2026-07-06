'use client'
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Play, KanbanSquare, BarChart3, Bell, Shield, Users, Zap, Check, CheckCircle, Star, Plus } from "lucide-react"
import { SiteNav } from "@/components/layout/SiteNav"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { Container } from "@/components/ui/Container"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { useState } from "react"

const E = [0.16, 1, 0.3, 1] as const
const s = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const it = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: E } } }
const it2 = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: E } } }

const FEATURES = [
  { icon: KanbanSquare, title: "Visual Pipeline", desc: "Drag-and-drop Kanban. See every deal stage at a glance." },
  { icon: Users, title: "Lead Management", desc: "Capture, assign, and track leads from any channel." },
  { icon: BarChart3, title: "Live Analytics", desc: "Revenue and conversion charts that update in real time." },
  { icon: Bell, title: "Smart Reminders", desc: "Automated alerts before follow-ups fall through." },
  { icon: Shield, title: "Secure by Design", desc: "Row-level security. Your data, completely isolated." },
  { icon: Zap, title: "Real-Time Sync", desc: "Every change appears across your team instantly." },
]

const TESTIMONIALS = [
  { i: "AO", name: "Amani Otieno", role: "Sales Lead, Northbridge Realty", q: "The pipeline view alone saves our team hours every week. We closed 40% more deals in the first month." },
  { i: "FC", name: "Faith Chebet", role: "Ops Manager, Highlands Sacco", q: "Follow-up reminders used to slip through the cracks. Now nothing gets missed." },
  { i: "KM", name: "Kevin Mwangi", role: "Founder, Westfield Logistics", q: "Setup took an afternoon. Our reps adopted it immediately because it shows them what to do next." },
]

const PLANS = [
  { name: "Starter", price: "KES 1,500", per: "/user/mo", featured: false, perks: ["Up to 3 members", "500 active leads", "Kanban pipeline", "Email support"] },
  { name: "Professional", price: "KES 4,500", per: "/user/mo", featured: true, perks: ["Unlimited members", "Unlimited leads", "Live analytics", "Priority support"] },
  { name: "Enterprise", price: "Custom", per: "talk to us", featured: false, perks: ["Everything in Pro", "Custom roles", "SLA guarantee", "Dedicated onboarding"] },
]

const FAQS = [
  { q: "Is my data secure?", a: "Yes. Supabase Auth plus row-level security means each account's data is completely isolated." },
  { q: "Can I try before paying?", a: "Every plan starts with a free trial. Run real leads before committing." },
  { q: "Does it work on mobile?", a: "Yes. Omix CRM is fully responsive and works on any device." },
  { q: "What happens if I cancel?", a: "Nothing is deleted. Your records stay safely stored." },
]

const TRUST = ["Northbridge Realty", "Highlands Sacco", "Westfield Logistics", "Two Rivers Holdings", "Coastline Retailers", "Riverside Motors", "Solid Rock Insurance", "Apex Agencies", "Savanna Fintech", "Acacia Agro Traders"]

export default function HomePage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0)
  const [faqItems] = useState(FAQS)

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0A0A0A] text-white">
      <SiteNav />

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center overflow-hidden pt-24 sm:pt-32">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 55% at 50% 0%, transparent 25%, #0A0A0A 80%)" }} />
        <div className="animate-breathe pointer-events-none absolute left-1/2 top-[-60px] h-[420px] w-[420px] -translate-x-1/2" style={{ background: "radial-gradient(circle, rgba(250,204,21,.11) 0%, transparent 70%)" }} />
        <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center px-5 text-center sm:px-8">
          <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: E }}
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.04] px-4 py-1.5 text-[13px] font-medium text-[#A3A3A3]">
            <span className="relative flex h-[7px] w-[7px]">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#FACC15]/40" />
              <span className="relative h-full w-full rounded-full bg-[#FACC15]" />
            </span>
            CRM built for African businesses
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1, ease: E }}
            className="mt-8 max-w-[720px] h1 text-white">
            Close more deals.<br /><span className="text-[#FACC15]">Move faster.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: E }}
            className="mt-6 max-w-[480px] body-lg">
            The modern CRM built for African sales teams. Track every lead, automate follow-ups, and win more business.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.3, ease: E }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/signup" className="btn-primary">Start Free Today <ArrowRight size={17} /></Link>
            <Link href="/features" className="btn-secondary"><Play size={15} className="text-[#737373]" /> Watch demo</Link>
          </motion.div>
        </div>
      </section>

      {/* Trust Strip */}
      <div className="overflow-hidden border-y border-white/[0.05] bg-[#0D0D0D] py-8">
        <p className="mb-5 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-[#383838]">Trusted by businesses across East Africa</p>
        <div className="marquee flex w-max gap-14">
          {[...TRUST, ...TRUST].map((n, i) => (
            <span key={i} className="shrink-0 text-[13px] font-medium text-[#383838] transition-colors hover:text-[#737373]">{n}</span>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="section">
        <Container>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: E }} className="mb-12 sm:mb-16">
            <SectionLabel>Features</SectionLabel>
            <h2 className="mt-4 h2 max-w-[440px] text-white">Built to close more deals</h2>
            <p className="mt-3 body-lg max-w-[380px]">Six capabilities that make the biggest difference to your team.</p>
          </motion.div>
          <motion.div variants={s} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(c => (
              <motion.div key={c.title} variants={it} whileHover={{ y: -5 }} className="card group p-7 hover:shadow-lg hover:shadow-black/20">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#FACC15]/10 transition-colors group-hover:bg-[#FACC15]/20">
                  <c.icon size={20} className="text-[#FACC15]" />
                </div>
                <h3 className="text-[16px] font-bold text-white">{c.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#737373]">{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="section border-t border-white/[0.05] bg-[#0D0D0D]">
        <Container>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: E }} className="mb-12 text-center sm:mb-14">
            <SectionLabel>Customers</SectionLabel>
            <h2 className="mt-4 h2 text-white">Trusted by teams across Kenya</h2>
          </motion.div>
          <motion.div variants={s} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map(t => (
              <motion.div key={t.i} variants={it} whileHover={{ y: -5 }} className="card flex flex-col p-7 sm:p-8 hover:shadow-lg hover:shadow-black/20">
                <div className="mb-5 flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className="fill-[#FACC15] text-[#FACC15]" />)}</div>
                <p className="flex-1 text-[15px] leading-relaxed text-[#A3A3A3]">&ldquo;{t.q}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-[11px] font-bold text-white">{t.i}</div>
                  <div><p className="text-[13px] font-semibold text-white">{t.name}</p><p className="text-[12px] text-[#525252]">{t.role}</p></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section">
        <Container>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: E }} className="mb-12 text-center sm:mb-14">
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="mt-4 h2 text-white">Simple, transparent pricing</h2>
            <p className="mx-auto mt-3 body-lg max-w-[360px]">Billed in KES. Free trial on every plan.</p>
          </motion.div>
          <motion.div variants={s} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-5 lg:grid-cols-3">
            {PLANS.map(p => (
              <motion.div key={p.name} variants={it} whileHover={{ y: p.featured ? -7 : -4 }}
                className={`relative flex flex-col rounded-[20px] border p-8 transition-all duration-300 ${
                  p.featured ? "border-[#FACC15]/20 bg-[#171717] shadow-[0_0_60px_rgba(250,204,21,0.06)] ring-1 ring-[#FACC15]/10" : "card"
                }`}>
                {p.featured && <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-[#FACC15] px-4 py-1.5 text-[11px] font-bold text-black shadow-lg"><Zap size={10} fill="black" /> Most Popular</span>}
                <h3 className="text-[15px] font-bold text-white">{p.name}</h3>
                <div className="my-6 border-b border-white/[0.06] pb-6">
                  <span className="text-[34px] font-extrabold tracking-tight text-white">{p.price}</span>
                  <span className="ml-1 text-[13px] text-[#525252]">{p.per}</span>
                </div>
                <ul className="mb-8 flex-1 space-y-3">
                  {p.perks.map(f => <li key={f} className="flex items-center gap-2.5 text-[14px] text-[#A3A3A3]"><Check size={14} className={p.featured ? "text-[#FACC15]" : "text-[#525252]"} />{f}</li>)}
                </ul>
                <Link href={p.featured || p.name === "Starter" ? "/signup" : "/contact"}
                  className={`flex items-center justify-center rounded-[12px] py-3 text-[14px] font-bold transition-all ${
                    p.featured ? "bg-[#FACC15] text-black hover:bg-[#FDE68A]" : "border border-white/[0.1] text-[#A3A3A3] hover:border-white/[0.2] hover:text-white"
                  }`}>{p.name === "Enterprise" ? "Talk to Sales" : "Get Started"}</Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="section border-t border-white/[0.05] bg-[#0D0D0D]">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[340px_1fr] lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: E }}>
              <SectionLabel>FAQ</SectionLabel>
              <h2 className="mt-4 h3 text-white">Questions, answered</h2>
            </motion.div>
            <div className="divide-y divide-white/[0.05]">
              {faqItems.map((f, i) => {
                const isOpen = faqOpen === i
                return (
                  <div key={f.q}>
                    <button type="button" onClick={() => setFaqOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-8 py-6 text-left" aria-expanded={isOpen}>
                      <span className={`text-[16px] font-semibold transition-colors ${isOpen ? "text-white" : "text-[#A3A3A3]"}`}>{f.q}</span>
                      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all ${isOpen ? "border-[#FACC15]/25 bg-[#FACC15]/[.08] text-[#FACC15]" : "border-white/[0.08] text-[#525252]"}`}>
                        <Plus size={14} />
                      </motion.span>
                    </button>
                    {isOpen && <p className="pb-6 text-[16px] leading-relaxed text-[#525252]">{f.a}</p>}
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: E }}
            className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#111] px-8 py-16 text-center sm:px-16 sm:py-20">
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
            <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, #111 85%)" }} />
            <div className="animate-breathe pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(circle, rgba(250,204,21,.13) 0%, transparent 70%)" }} />
            <div className="relative">
              <h2 className="mx-auto h2 max-w-[520px] text-white">Ready to grow your business?</h2>
              <p className="mx-auto mt-4 body-lg max-w-[380px]">Join hundreds of teams across Kenya already using Omix CRM.</p>
              <Link href="/signup" className="btn-primary mt-8">Start Free Today <ArrowRight size={17} /></Link>
            </div>
          </motion.div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  )
}
