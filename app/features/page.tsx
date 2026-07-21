'use client'
import Link from "next/link"
import { motion } from "framer-motion"
import { SiteNav } from "@/components/layout/SiteNav"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { PageHero } from "@/components/ui/PageHero"
import { Container } from "@/components/ui/Container"
import { KanbanSquare, BarChart3, Bell, Shield, Users, Zap, CheckCircle, ArrowRight, Smartphone, Globe } from "lucide-react"

const E = [0.16, 1, 0.3, 1] as const
const ALL = [
  { icon: KanbanSquare, title: "Visual Pipeline", desc: "Kanban board for every stage of your sales cycle." },
  { icon: Users, title: "Lead Management", desc: "Capture, organise, and follow up on every lead." },
  { icon: BarChart3, title: "Live Analytics", desc: "Revenue, conversion, and pipeline charts live." },
  { icon: Bell, title: "Smart Reminders", desc: "Automated follow-up alerts before things slip." },
  { icon: Shield, title: "Row-Level Security", desc: "Every account isolated by Supabase RLS." },
  { icon: Zap, title: "Real-time Sync", desc: "Team changes appear instantly everywhere." },
  { icon: Globe, title: "Works Everywhere", desc: "Browser-based — no install required." },
  { icon: Smartphone, title: "Mobile Ready", desc: "Fully responsive on any phone or tablet." },
]

export default function FeaturesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#070B14] text-[#E7ECF6]">
      <SiteNav />
      <PageHero label="Features" heading="Everything you need to close more deals"
        sub="Every feature exists to help your team capture leads faster, move deals forward, and win more business.">
        <Link href="/signup" className="btn-primary">Start Free <ArrowRight size={16} /></Link>
        <Link href="/pricing" className="btn-secondary">See Pricing</Link>
      </PageHero>

      <section className="section border-t border-[rgba(255,255,255,0.09)]">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ALL.map(f => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.65, ease: E }} whileHover={{ y: -4 }}
                className="card p-6 hover:shadow-md">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#38BDF8]/10"><f.icon size={18} className="text-[#38BDF8]" /></div>
                <h3 className="text-[15px] font-bold text-[#E7ECF6]">{f.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#8A93A8]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  )
}
