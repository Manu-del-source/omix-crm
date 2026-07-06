"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, ArrowRight } from "lucide-react"
import { Container } from "@/components/ui/Container"
import { SectionLabel } from "@/components/ui/SectionLabel"

const E = [0.16, 1, 0.3, 1] as const
const POINTS = ["Drag-and-drop between any stage", "Real-time sync across your team", "Custom stages per workflow"]

function KanbanVisual() {
  const cols = [
    { n: "New",       c: "#71717a", cards: [{ i: "AA", n: "Acacia Agro", v: "KES 220K" }, { i: "SR", n: "Solid Rock", v: "KES 95K" }] },
    { n: "Qualified", c: "#f59e0b", cards: [{ i: "NR", n: "Northbridge", v: "KES 1.2M" }, { i: "WL", n: "Westfield", v: "KES 690K" }] },
    { n: "Won",       c: "#22c55e", cards: [{ i: "HS", n: "Highlands", v: "KES 875K" }] },
  ]
  return (
    <div className="rounded-[20px] border border-white/[.07] bg-[#111] p-5 shadow-[0_24px_64px_rgba(0,0,0,.5)]">
      <div className="grid grid-cols-3 gap-2.5">
        {cols.map((col, ci) => (
          <div key={col.n} className="rounded-[12px] border border-white/[.05] bg-[#171717] p-3">
            <div className="mb-2.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: col.c }} />
              <span className="text-[11px] font-semibold text-[#A3A3A3]">{col.n}</span>
            </div>
            <div className="space-y-2">
              {col.cards.map((card, i) => (
                <motion.div key={card.i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: .08 * (ci + i), duration: .4, ease: E }}
                  className="rounded-[9px] border border-white/[.04] bg-[#111] p-2.5">
                  <p className="text-[10.5px] font-medium text-zinc-200">{card.n}</p>
                  <p className="text-[9.5px] text-[#525252]">{card.v}</p>
                  <div className="mt-1.5 h-[2px] rounded-full"
                    style={{
                      background: col.c,
                      opacity: .5,
                      width: col.n === "Won" ? "100%" : col.n === "Qualified" ? "55%" : "28%",
                    }} />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PipelineHighlight() {
  return (
    <section id="pipeline" className="section-pad bg-base">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: .65, ease: E }}>
            <SectionLabel>Pipeline</SectionLabel>
            <h2 className="mt-4 heading-md text-white">
              Move deals forward with one drag
            </h2>
            <p className="mt-4 text-[17px] leading-[1.75] text-[#A3A3A3] sm:text-[18px]">
              A Kanban board built for speed. Every stage change appears for your whole team instantly.
            </p>
            <ul className="mt-7 space-y-3">
              {POINTS.map(p => (
                <li key={p} className="flex items-center gap-3 text-[15px] text-[#A3A3A3]">
                  <CheckCircle size={16} className="shrink-0 text-[#FACC15]" />{p}
                </li>
              ))}
            </ul>
            <Link href="/features#pipeline"
              className="mt-7 inline-flex items-center gap-1.5 text-[14px] font-semibold text-white transition-colors hover:text-[#FACC15]">
              Explore pipeline <ArrowRight size={14} />
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: .65, ease: E }}>
            <KanbanVisual />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
