'use client'
import { motion } from "framer-motion"
const E = [0.16, 1, 0.3, 1] as const
export function PageHero({ label, heading, sub, children, centered = true }: {
  label: string; heading: string; sub: string; children?: React.ReactNode; centered?: boolean;
}) {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pb-20">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className={`mx-auto max-w-[1200px] px-6 ${centered ? "text-center" : ""}`}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: E }}>
          <p className="section-label mb-3">{label}</p>
          <h1 className="h2 max-w-[600px]" style={centered ? {marginLeft: "auto", marginRight: "auto"} : {}}>{heading}</h1>
          <p className={`mt-3 body-lg max-w-[460px] ${centered ? "mx-auto" : ""}`}>{sub}</p>
          {children && <div className={`mt-6 flex flex-wrap gap-4 ${centered ? "justify-center" : ""}`}>{children}</div>}
        </motion.div>
      </div>
    </section>
  )
}
