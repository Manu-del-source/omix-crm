"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import { Container } from "@/components/ui/Container"
import { SectionLabel } from "@/components/ui/SectionLabel"

const E = [0.16, 1, 0.3, 1] as const
const FAQS = [
  { q: "Is my data secure?",                a: "Yes. Supabase Auth plus row-level security means each account's data is completely isolated." },
  { q: "Can I try before paying?",          a: "Every plan starts with a free trial. Run real leads before committing to any subscription." },
  { q: "Does it work on mobile?",           a: "Yes. Omix CRM is fully responsive and works on any device &mdash; no install required." },
  { q: "What happens if I cancel?",         a: "Nothing is deleted. Your records stay safely stored and you regain access upon resubscribing." },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="section-pad bg-base">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[340px_1fr] lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6, ease: E }}>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="mt-4 heading-md text-white">
              Questions, answered
            </h2>
          </motion.div>
          <div className="divide-y divide-white/[.05]">
            {FAQS.map((f, i) => {
              const isOpen = open === i
              return (
                <div key={f.q}>
                  <button type="button" onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-8 py-6 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}>
                    <span className={`text-[16px] font-semibold transition-colors ${isOpen ? "text-white" : "text-[#A3A3A3]"}`}>{f.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: .2 }}
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all ${
                        isOpen
                          ? "border-[#FACC15]/25 bg-[#FACC15]/[.08] text-[#FACC15]"
                          : "border-white/[.08] text-[#525252]"
                      }`}>
                      <Plus size={14} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div id={`faq-answer-${i}`} initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: .22, ease: E }}
                        className="overflow-hidden">
                        <p className="pb-6 text-[16px] leading-[1.75] text-[#525252]">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
