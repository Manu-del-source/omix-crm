'use client'
import Link from "next/link"
import { motion } from "framer-motion"
import { SiteNav } from "@/components/layout/SiteNav"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { PageHero } from "@/components/ui/PageHero"
import { Container } from "@/components/ui/Container"
import { ArrowRight, Target, Heart, Globe, Zap } from "lucide-react"

const E = [0.16, 1, 0.3, 1] as const
const VALUES = [
  { icon: Target, title: "Built for purpose", desc: "Every feature exists to help one thing: close more deals." },
  { icon: Globe, title: "Africa first", desc: "We build for the realities of doing business in Kenya and East Africa." },
  { icon: Heart, title: "Honest product", desc: "No dark patterns, no vendor lock-in, no hidden fees." },
  { icon: Zap, title: "Move fast", desc: "We ship fast and iterate based on what teams actually need." },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F8F6F3] text-[#1C1917]">
      <SiteNav />
      <PageHero label="About" heading="Built for Africa's businesses"
        sub="Omix CRM was built because every CRM we tried was designed for US enterprise customers. We needed something different." />

      <section className="section border-t border-[rgba(0,0,0,0.06)]">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: E }}>
              <span className="section-label">Our Story</span>
              <h2 className="mt-4 h3 text-[#1C1917]">A CRM that actually fits</h2>
              <div className="mt-5 space-y-4 body-lg">
                <p>Most CRMs are built for Silicon Valley-style sales teams: large budgets, months of onboarding, and workflows that don't match how deals actually happen in Nairobi, Mombasa, or Kisumu.</p>
                <p>Omix CRM was built from the ground up for African sales teams. Fast to set up, easy to adopt, and designed around the actual rhythms of doing business here.</p>
                <p>We built the product we wished we had. And we keep making it better based on what our customers tell us every week.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: E }} className="card p-8">
              <div className="space-y-6">
                {[{ y: "2023", t: "Started", d: "First version built to solve our own lead management problem." },
                  { y: "2024", t: "Launched", d: "Opened to early customers across Kenya." },
                  { y: "2025", t: "Grew", d: "Expanded to SACCOs, real estate, and logistics." },
                  { y: "2026", t: "Today", d: "380+ active teams tracking over 10,000 leads." },
                ].map(ev => (
                  <div key={ev.y} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C73B2A]/10 text-[11px] font-bold text-[#C73B2A]">{ev.y.slice(2)}</span>
                      <div className="mt-2 w-[1px] flex-1 bg-[rgba(0,0,0,0.08)]" />
                    </div>
                    <div className="pb-4"><p className="text-[15px] font-bold text-[#1C1917]">{ev.t}</p><p className="mt-1 text-[14px] leading-relaxed text-[#78716C]">{ev.d}</p></div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
      <section className="section border-t border-[rgba(0,0,0,0.06)]">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: E }} className="mb-12">
            <span className="section-label">Values</span>
            <h2 className="mt-4 h2 text-[#1C1917]">What we believe</h2>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2">
            {VALUES.map(v => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.65, ease: E }} className="card p-7 hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#C73B2A]/10"><v.icon size={20} className="text-[#C73B2A]" /></div>
                <h3 className="text-[17px] font-bold text-[#1C1917]">{v.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-[#78716C]">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
      <SiteFooter />
    </main>
  )
}
