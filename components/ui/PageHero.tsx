'use client'
import { motion } from "framer-motion"

const E = [0.16, 1, 0.3, 1] as const

export function PageHero({ label, heading, sub, children, centered = true }: {
  label: string; heading: string; sub: string; children?: React.ReactNode; centered?: boolean;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pb-24">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 55% at 50% 0%, transparent 25%, #0A0A0A 80%)" }} />
      <div className={`mx-auto max-w-[1280px] px-5 sm:px-8 ${centered ? "text-center" : ""}`}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: E }}>
          <p className="section-label mb-4">{label}</p>
          <h1 className="h2 max-w-[640px] text-white" style={centered ? {} : {}}>{heading}</h1>
          <p className={`mt-4 body-lg max-w-[480px] ${centered ? "mx-auto" : ""}`}>{sub}</p>
          {children && <div className={`mt-8 ${centered ? "flex justify-center" : ""}`}>{children}</div>}
        </motion.div>
      </div>
    </section>
  )
}
