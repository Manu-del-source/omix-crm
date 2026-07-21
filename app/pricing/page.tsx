'use client'
import Link from "next/link"
import { motion } from "framer-motion"
import { SiteNav } from "@/components/layout/SiteNav"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { PageHero } from "@/components/ui/PageHero"
import { Container } from "@/components/ui/Container"
import { Check, Minus, Zap, ArrowRight, Plus } from "lucide-react"
import { useState } from "react"

const E = [0.16, 1, 0.3, 1] as const
const s = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const it = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: E } } }

const PLANS = [
  { name: "Starter", price: "KES 1,500", per: "/user/mo", featured: false, desc: "For solo agents and small teams.", href: "/signup", cta: "Start Free Trial", perks: ["Up to 3 members", "500 active leads", "Kanban pipeline", "Follow-up reminders", "Email support"] },
  { name: "Professional", price: "KES 4,500", per: "/user/mo", featured: true, desc: "For growing teams needing full visibility.", href: "/signup", cta: "Start Free Trial", perks: ["Unlimited members", "Unlimited leads", "Live analytics", "File uploads", "Priority support", "Custom pipeline stages"] },
  { name: "Enterprise", price: "Custom", per: "talk to us", featured: false, desc: "For large orgs with compliance needs.", href: "/contact", cta: "Talk to Sales", perks: ["Everything in Pro", "Dedicated onboarding", "Custom roles", "SLA guarantee", "API access"] },
]

const FAQS = [
  { q: "Is there a free trial?", a: "Yes — every plan starts with a free trial. No credit card required." },
  { q: "Can I change plans later?", a: "Yes, upgrade or downgrade at any time." },
  { q: "Is pricing in KES?", a: "Yes. All plans are billed in Kenyan Shillings." },
  { q: "What happens if I cancel?", a: "Nothing is deleted. Your records stay safely stored." },
]

export default function PricingPage() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#070B14] text-[#E7ECF6]">
      <SiteNav />
      <PageHero label="Pricing" heading="Simple, transparent pricing" sub="Billed in Kenyan Shillings. Free trial on every plan." />
      <section className="section border-t border-[rgba(255,255,255,0.09)]">
        <Container>
          <motion.div variants={s} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 lg:grid-cols-3">
            {PLANS.map(p => (
              <motion.div key={p.name} variants={it} whileHover={{ y: p.featured ? -8 : -4 }}
                className={`relative flex flex-col rounded-[20px] border p-8 transition-all sm:p-10 ${
                  p.featured ? "border-[#38BDF8]/30 bg-[#0D1626] shadow-[0_8px_40px_rgba(56, 189, 248,0.12)] ring-1 ring-[#38BDF8]/15" : "card"
                }`}>
                {p.featured && <span className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#818CF8] px-4 py-1.5 text-[12px] font-bold text-white shadow-lg"><Zap size={10} fill="white" /> Most Popular</span>}
                <h3 className="text-[16px] font-bold text-[#E7ECF6]">{p.name}</h3>
                <p className="mt-1.5 text-[14px] text-[#8A93A8]">{p.desc}</p>
                <div className="my-7 border-b border-[rgba(255,255,255,0.09)] pb-7">
                  <span className="text-[38px] font-extrabold tracking-tight text-[#E7ECF6]">{p.price}</span>
                  <span className="ml-1 text-[13px] text-[#616B80]">{p.per}</span>
                </div>
                <ul className="mb-8 flex-1 space-y-3.5">
                  {p.perks.map(f => <li key={f} className="flex items-center gap-3 text-[14px] text-[#B4BECF]"><Check size={14} className={p.featured ? "text-[#38BDF8]" : "text-[#616B80]"}/>{f}</li>)}
                </ul>
                <Link href={p.href} className={`flex items-center justify-center rounded-[12px] py-3.5 text-[14px] font-bold transition-all ${p.featured ? "bg-gradient-to-r from-[#38BDF8] to-[#818CF8] text-white hover:shadow-lg hover:shadow-[#38BDF8]/25" : "border border-[rgba(255,255,255,0.14)] text-[#8A93A8] hover:border-[rgba(255,255,255,0.2)] hover:text-[#E7ECF6]"}`}>{p.cta}</Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
      <section className="section border-t border-[rgba(255,255,255,0.09)]">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[340px_1fr] lg:gap-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: E }}>
              <span className="section-label">FAQ</span>
              <h2 className="mt-4 h3 text-[#E7ECF6]">Pricing questions</h2>
            </motion.div>
            <div className="divide-y divide-[rgba(255,255,255,0.09)]">
              {FAQS.map((f, i) => {
                const isOpen = open === i
                return (
                  <div key={f.q}>
                    <button type="button" onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-8 py-6 text-left">
                      <span className={`text-[16px] font-semibold transition-colors ${isOpen ? "text-[#E7ECF6]" : "text-[#B4BECF]"}`}>{f.q}</span>
                      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all ${isOpen ? "border-[#38BDF8]/25 bg-[#38BDF8]/[.08] text-[#38BDF8]" : "border-[rgba(255,255,255,0.14)] text-[#616B80]"}`}>
                        <Plus size={14} />
                      </motion.span>
                    </button>
                    {isOpen && <p className="pb-6 text-[16px] leading-relaxed text-[#8A93A8]">{f.a}</p>}
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
      </section>
      <SiteFooter />
    </main>
  )
}
