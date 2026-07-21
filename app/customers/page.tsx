'use client'
import Link from "next/link"
import { motion } from "framer-motion"
import { SiteNav } from "@/components/layout/SiteNav"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { PageHero } from "@/components/ui/PageHero"
import { Container } from "@/components/ui/Container"
import { Star, ArrowRight } from "lucide-react"

const E = [0.16, 1, 0.3, 1] as const
const TESTIMONIALS = [
  { i: "AO", name: "Amani Otieno", role: "Sales Lead, Northbridge Realty", q: "The pipeline view alone saves our team hours every week. We closed 40% more deals in the first month." },
  { i: "FC", name: "Faith Chebet", role: "Ops Manager, Highlands Sacco", q: "Follow-up reminders used to slip through the cracks. Now nothing gets missed." },
  { i: "KM", name: "Kevin Mwangi", role: "Founder, Westfield Logistics", q: "Setup took an afternoon. Our reps adopted it immediately." },
  { i: "JA", name: "James Abuoga", role: "Business Development, Coastal Finance", q: "We tried two other CRMs before Omix. Neither stuck. This one did." },
  { i: "SR", name: "Sharon Rop", role: "Sales Manager, Savanna Fintech", q: "The analytics dashboard gives me everything I need for our weekly report." },
  { i: "DM", name: "David Mutisya", role: "Director, Two Rivers Holdings", q: "The pipeline stages are flexible enough to match our actual workflow." },
]

const INDUSTRIES = ["Real Estate", "Financial Services", "SACCO & Co-ops", "Logistics", "Insurance", "Agencies", "Manufacturing", "Consulting"]

export default function CustomersPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F8F6F3] text-[#1C1917]">
      <SiteNav />
      <PageHero label="Customers" heading="Trusted by teams across East Africa"
        sub="Hundreds of sales teams use Omix CRM every day to track leads, manage pipelines, and close more deals." />

      <section className="section border-t border-[rgba(0,0,0,0.06)]">
        <Container>
          <p className="mb-6 text-center section-label">Industries using Omix CRM</p>
          <div className="flex flex-wrap justify-center gap-3">
            {INDUSTRIES.map(ind => <span key={ind} className="rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-4 py-2 text-[14px] text-[#78716C]">{ind}</span>)}
          </div>
        </Container>
      </section>

      <section className="section border-t border-[rgba(0,0,0,0.06)]">
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: E }} className="mb-12">
            <span className="section-label">Stories</span>
            <h2 className="mt-4 h2 text-[#1C1917]">What our customers say</h2>
          </motion.div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map(t => (
              <motion.div key={t.i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.65, ease: E }} whileHover={{ y: -5 }}
                className="card flex flex-col p-8 hover:shadow-lg">
                <div className="mb-5 flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className="fill-amber-400 text-amber-400" />)}</div>
                <p className="flex-1 text-[15px] leading-relaxed text-[#78716C]">&ldquo;{t.q}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3 border-t border-[rgba(0,0,0,0.06)] pt-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#C73B2A] to-[#E85D3A] text-[11px] font-bold text-white">{t.i}</div>
                  <div><p className="text-[13px] font-semibold text-[#1C1917]">{t.name}</p><p className="text-[12px] text-[#A8A29E]">{t.role}</p></div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
      <SiteFooter />
    </main>
  )
}
