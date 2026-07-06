"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, Zap } from "lucide-react"
import { Container } from "@/components/ui/Container"
import { SectionLabel } from "@/components/ui/SectionLabel"

const E = [0.16, 1, 0.3, 1] as const
const s = { hidden: {}, show: { transition: { staggerChildren: .08 } } }
const it = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: .6, ease: E } } }

const PLANS = [
  { name: "Starter",      price: "KES 1,500", per: "/user/mo", featured: false, perks: ["Up to 3 members", "500 active leads", "Kanban pipeline", "Email support"] },
  { name: "Professional", price: "KES 4,500", per: "/user/mo", featured: true,  perks: ["Unlimited members", "Live analytics", "File storage", "Priority support"] },
  { name: "Enterprise",   price: "Custom",    per: "talk to us", featured: false, perks: ["Everything in Pro", "Custom roles & RLS", "SLA guarantee", "Dedicated onboarding"] },
]

export function Pricing() {
  return (
    <section id="pricing" className="section-pad bg-surface border-y border-white/[.05]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: .6, ease: E }}
          className="mb-12 text-center sm:mb-14"
        >
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="mt-4 heading-lg text-white">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-3 max-w-[360px] text-[17px] leading-[1.75] text-[#A3A3A3] sm:text-[18px]">
            Billed in KES. Free trial on every plan.
          </p>
        </motion.div>

        <motion.div
          variants={s} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid gap-5 lg:grid-cols-3"
        >
          {PLANS.map(p => (
            <motion.div key={p.name} variants={it} whileHover={{ y: p.featured ? -7 : -4 }}
              className={`relative flex flex-col rounded-[20px] border p-8 transition-all duration-300 ${
                p.featured
                  ? "border-[#FACC15]/20 bg-[#171717] shadow-[0_0_60px_rgba(250,204,21,0.06)] ring-1 ring-[#FACC15]/10"
                  : "border-white/[.06] bg-[#111] hover:border-white/[.1] hover:bg-[#171717]"
              }`}>
              {p.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-[#FACC15] px-4 py-1.5 text-[11px] font-bold text-black shadow-lg shadow-[#FACC15]/25">
                  <Zap size={10} fill="black" /> Most Popular
                </span>
              )}
              <h3 className="text-[15px] font-bold text-white">{p.name}</h3>
              <div className="my-6 border-b border-white/[.06] pb-6">
                <span className="text-[34px] font-extrabold tracking-[-0.04em] text-white">{p.price}</span>
                <span className="ml-1 text-[13px] text-[#525252]">{p.per}</span>
              </div>
              <ul className="mb-8 flex-1 space-y-3">
                {p.perks.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-[14px] text-[#A3A3A3]">
                    <Check size={14} className={p.featured ? "text-[#FACC15]" : "text-[#525252] shrink-0"} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={p.featured || p.name === "Starter" ? "/signup" : "/contact"}
                className={`flex items-center justify-center rounded-[12px] py-3 text-[14px] font-bold transition-all ${
                  p.featured
                    ? "bg-[#FACC15] text-black hover:bg-[#FDE68A]"
                    : "border border-white/[.1] text-[#A3A3A3] hover:border-white/[.2] hover:text-white"
                }`}>
                {p.name === "Enterprise" ? "Talk to Sales" : "Get Started"}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 text-center">
          <Link href="/pricing" className="text-[14px] font-semibold text-[#525252] underline underline-offset-4 hover:text-white transition-colors">
            Compare all plan details &rarr;
          </Link>
        </div>
      </Container>
    </section>
  )
}
