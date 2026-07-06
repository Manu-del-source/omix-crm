"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/ui/Container"

const E = [0.16, 1, 0.3, 1] as const

export function CTA() {
  return (
    <section className="section-pad bg-surface border-t border-white/[.05]">
      <Container>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: .6, ease: E }}
          className="relative overflow-hidden rounded-[24px] border border-white/[.08] bg-[#111] px-8 py-16 text-center sm:px-16 sm:py-20">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
          <div className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, #111 85%)" }} />
          <div className="animate-breathe pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2"
            style={{ background: "radial-gradient(circle, rgba(250,204,21,.13) 0%, transparent 70%)" }} />
          <div className="relative">
            <h2 className="mx-auto max-w-[520px] heading-lg text-white">
              Ready to grow your business?
            </h2>
            <p className="mx-auto mt-4 max-w-[380px] text-[17px] leading-[1.75] text-[#A3A3A3] sm:text-[18px]">
              Join hundreds of teams across Kenya already using Omix CRM.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: .97 }} className="mt-8 inline-block">
              <Link href="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-[#FACC15] px-8 py-4 text-[15px] font-bold text-black shadow-xl shadow-[#FACC15]/20 hover:shadow-[#FACC15]/35">
                Start Free Today <ArrowRight size={17} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
