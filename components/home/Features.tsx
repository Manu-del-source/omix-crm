"use client"
import { motion } from "framer-motion"
import { KanbanSquare, BarChart3, Bell, Shield, Users, Zap } from "lucide-react"
import { Container } from "@/components/ui/Container"
import { SectionLabel } from "@/components/ui/SectionLabel"

const E = [0.16, 1, 0.3, 1] as const
const s = { hidden: {}, show: { transition: { staggerChildren: .07 } } }
const it = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: .6, ease: E } } }

const CARDS = [
  { icon: KanbanSquare, title: "Visual Pipeline",    desc: "Drag-and-drop Kanban. See every deal stage at a glance." },
  { icon: Users,        title: "Lead Management",    desc: "Capture, assign, and track leads from any channel." },
  { icon: BarChart3,    title: "Live Analytics",     desc: "Revenue and conversion charts that update in real time." },
  { icon: Bell,         title: "Smart Reminders",    desc: "Automated alerts before follow-ups fall through." },
  { icon: Shield,       title: "Secure by Design",   desc: "Row-level security. Your data, completely isolated." },
  { icon: Zap,          title: "Real-Time Sync",     desc: "Every change appears across your team instantly." },
]

export function Features() {
  return (
    <section className="section-pad bg-base">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: .6, ease: E }}
          className="mb-12 sm:mb-16"
        >
          <SectionLabel>Features</SectionLabel>
          <h2 className="mt-4 max-w-[440px] heading-lg text-white">
            Built to close more deals
          </h2>
          <p className="mt-3 max-w-[380px] text-[17px] leading-[1.75] text-[#A3A3A3] sm:text-[18px]">
            Six capabilities that make the biggest difference to your team.
          </p>
        </motion.div>

        <motion.div
          variants={s} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CARDS.map(c => (
            <motion.div key={c.title} variants={it} whileHover={{ y: -5 }}
              className="group rounded-[20px] border border-white/[.06] bg-[#111] p-7 transition-all duration-300 hover:border-white/[.1] hover:bg-[#171717] hover:shadow-lg hover:shadow-black/20">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#FACC15]/10 transition-colors group-hover:bg-[#FACC15]/20">
                <c.icon size={20} className="text-[#FACC15]" />
              </div>
              <h3 className="text-[16px] font-bold text-white">{c.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.7] text-[#737373]">{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
