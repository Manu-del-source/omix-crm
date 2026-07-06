"use client"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Container } from "@/components/ui/Container"
import { SectionLabel } from "@/components/ui/SectionLabel"

const E = [0.16, 1, 0.3, 1] as const
const s = { hidden: {}, show: { transition: { staggerChildren: .09 } } }
const it = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: .6, ease: E } } }

const T = [
  { i: "AO", name: "Amani Otieno", role: "Sales Lead, Northbridge Realty",  q: "The pipeline view alone saves our team hours every week. We closed 40% more deals in the first month." },
  { i: "FC", name: "Faith Chebet",  role: "Ops Manager, Highlands Sacco",    q: "Follow-up reminders used to slip through the cracks. Now nothing gets missed &mdash; our members notice." },
  { i: "KM", name: "Kevin Mwangi",  role: "Founder, Westfield Logistics",    q: "Setup took an afternoon. Our reps adopted it immediately because it shows them what to do next." },
]

export function Testimonials() {
  return (
    <section className="section-pad bg-base">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: .6, ease: E }}
          className="mb-12 text-center sm:mb-14"
        >
          <SectionLabel>Customers</SectionLabel>
          <h2 className="mt-4 heading-lg text-white">
            Trusted by teams across Kenya
          </h2>
        </motion.div>
        <motion.div variants={s} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid gap-5 md:grid-cols-3">
          {T.map(t => (
            <motion.div key={t.i} variants={it} whileHover={{ y: -5 }}
              className="flex flex-col rounded-[20px] border border-white/[.06] bg-[#111] p-7 transition-all hover:border-white/[.1] hover:bg-[#171717] hover:shadow-lg hover:shadow-black/20 sm:p-8">
              <div className="mb-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className="fill-[#FACC15] text-[#FACC15]" />)}
              </div>
              <p className="flex-1 text-[15px] leading-[1.75] text-[#A3A3A3]">&ldquo;{t.q}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3 border-t border-white/[.06] pt-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[.07] text-[11px] font-bold text-white">{t.i}</div>
                <div>
                  <p className="text-[13px] font-semibold text-white">{t.name}</p>
                  <p className="text-[12px] text-[#525252]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
