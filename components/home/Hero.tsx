"use client"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Play } from "lucide-react"
import { StatCounter } from "@/components/ui/StatCounter"
import { ParallaxCard } from "@/components/ui/ParallaxCard"

const E = [0.16, 1, 0.3, 1] as const
const STATS = [
  { end: 10000, suffix: "+", prefix: "", label: "Leads tracked" },
  { end: 4.2, suffix: "M", prefix: "KES ", label: "Pipeline value" },
  { end: 380, suffix: "+", prefix: "", label: "Active teams" },
  { end: 99.9, suffix: "%", prefix: "", label: "Uptime" },
]

/* ── Compact dashboard preview ── */
function Dashboard() {
  const bars = [40, 62, 35, 78, 53, 95, 74]
  const leads = [
    { i: "JO", n: "James Odhiambo",  s: "Hot",  c: "text-red-400 bg-red-500/10" },
    { i: "GW", n: "Grace Wanjiku",    s: "Warm", c: "text-amber-400 bg-amber-500/10" },
    { i: "SW", n: "Susan Waweru",     s: "Hot",  c: "text-red-400 bg-red-500/10" },
    { i: "DM", n: "David Mwangi",     s: "New",  c: "text-zinc-400 bg-zinc-500/10" },
  ]
  return (
    <div className="overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#111] shadow-[0_40px_100px_rgba(0,0,0,.8)]">
      {/* chrome */}
      <div className="flex items-center gap-1.5 border-b border-white/[.05] bg-[#0d0d0d] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/60"/>
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60"/>
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/60"/>
        <span className="ml-3 font-mono text-[10px] text-[#404040]">app.omixcrm.com/dashboard</span>
      </div>
      <div className="p-5">
        {/* KPIs */}
        <div className="mb-4 grid grid-cols-4 gap-2">
          {[{l:"Total Leads",v:"2,847",d:"+8%"},{l:"Pipeline",v:"KES 4.2M",d:"+14%"},{l:"Won Deals",v:"38",d:"+5%"},{l:"Win Rate",v:"68%",d:"+3%"}].map(k=>(
            <div key={k.l} className="rounded-[10px] border border-white/[.05] bg-[#171717] p-2.5">
              <p className="text-[9px] text-[#525252]">{k.l}</p>
              <p className="mt-0.5 text-[12px] font-bold text-white">{k.v}</p>
              <p className="mt-0.5 text-[9px] font-semibold text-[#FACC15]">{k.d}</p>
            </div>
          ))}
        </div>
        {/* Chart + leads */}
        <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-[10px] border border-white/[.05] bg-[#171717] p-3">
            <p className="mb-2 text-[10px] font-semibold text-[#737373]">Revenue · Monthly</p>
            <div className="flex h-[70px] items-end gap-1.5">
              {bars.map((h,i)=>(
                <motion.div key={i} initial={{height:0}} animate={{height:`${h}%`}}
                  transition={{delay:.1+i*.05,duration:.6,ease:E}}
                  className={`flex-1 rounded-t-[3px] ${i===5?"bg-[#FACC15]":"bg-white/[.07]"}`}/>
              ))}
            </div>
          </div>
          <div className="rounded-[10px] border border-white/[.05] bg-[#171717] p-3">
            <p className="mb-2 text-[10px] font-semibold text-[#737373]">Recent Leads</p>
            <div className="space-y-1.5">
              {leads.map(l=>(
                <div key={l.i} className="flex items-center justify-between rounded-[6px] bg-white/[.03] px-2 py-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[.07] text-[8px] font-bold">{l.i}</div>
                    <span className="text-[10px] font-medium text-zinc-200">{l.n}</span>
                  </div>
                  <span className={`rounded-full px-1.5 py-0.5 text-[8px] font-semibold ${l.c}`}>{l.s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 70])
  const op = useTransform(scrollYProgress, [0, .55], [1, 0])
  return (
    <section ref={ref} className="relative flex min-h-screen flex-col items-center overflow-hidden pb-0 pt-24 sm:pt-32">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 55% at 50% 0%, transparent 25%, #0A0A0A 80%)" }} />
      <div className="animate-breathe pointer-events-none absolute left-1/2 top-[-60px] h-[420px] w-[420px] -translate-x-1/2"
        style={{ background: "radial-gradient(circle, rgba(250,204,21,.11) 0%, transparent 70%)" }} />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5, ease: E }}
            className="inline-flex items-center gap-2 rounded-full border border-white/[.09] bg-white/[.04] px-4 py-1.5 text-[13px] font-medium text-[#A3A3A3]"
          >
            <span className="relative flex h-[7px] w-[7px]">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#FACC15]/40" />
              <span className="relative h-full w-full rounded-full bg-[#FACC15]" />
            </span>
            CRM built for African businesses
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .75, delay: .1, ease: E }}
            className="mt-8 max-w-[720px] heading-xl text-white"
          >
            Close more deals.<br />
            <span className="text-[#FACC15]">Move faster.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7, delay: .2, ease: E }}
            className="mt-6 max-w-[480px] text-[17px] leading-[1.75] text-[#A3A3A3] sm:text-[18px]"
          >
            The modern CRM built for African sales teams. Track every lead, automate follow-ups, and win more business.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .65, delay: .3, ease: E }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/signup">
              <motion.span whileHover={{ scale: 1.035 }} whileTap={{ scale: .965 }}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#FACC15] px-7 py-4 text-[15px] font-bold text-black shadow-lg shadow-[#FACC15]/20 transition-shadow hover:shadow-[#FACC15]/35">
                Start Free Today <ArrowRight size={17} />
              </motion.span>
            </Link>
            <Link href="/features"
              className="inline-flex items-center gap-2 rounded-full border border-white/[.11] bg-white/[.04] px-7 py-4 text-[15px] font-semibold text-[#A3A3A3] transition-all hover:border-white/[.2] hover:text-white">
              <Play size={15} className="text-[#737373]" /> Watch demo
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5, duration: .6 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-14"
          >
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-[clamp(1.4rem,2.8vw,1.9rem)] font-extrabold tracking-[-0.04em] text-white">
                  <StatCounter end={s.end} suffix={s.suffix} prefix={s.prefix} />
                </div>
                <div className="mt-1 text-[12px] text-[#525252]">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 56, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: .55, ease: E }}
          style={{ y, opacity: op }}
          className="relative mt-14 animate-float"
        >
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
          <div className="pointer-events-none absolute -inset-3 rounded-3xl"
            style={{ background: "radial-gradient(ellipse 55% 35% at 50% 110%, rgba(250,204,21,.08), transparent)" }} />
          <ParallaxCard><Dashboard /></ParallaxCard>
        </motion.div>
      </div>
    </section>
  )
}
