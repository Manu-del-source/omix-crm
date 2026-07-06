"use client"

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts"
import { Users, CheckCircle, XCircle, ClipboardList, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"

const COLORS = ["#f97316", "#3b82f6", "#10b981", "#8b5cf6", "#22c55e", "#ef4444"]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  delay = 0,
}: {
  icon: any
  label: string
  value: number | string
  color: string
  delay?: number
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="card-lift rounded-2xl border border-white/[0.06] bg-[#111111] p-6"
    >
      <div className="flex items-center justify-between">
        <div className={`rounded-xl p-2 ${color}`}>
          <Icon size={22} className="opacity-80" />
        </div>
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + delay, type: "spring", stiffness: 200 }}
          className="text-3xl font-bold"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {value}
        </motion.span>
      </div>
      <p className="mt-4 text-sm text-zinc-400">{label}</p>
    </motion.div>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-zinc-900 px-4 py-3 text-sm shadow-xl">
        <p className="font-medium text-white">{label}</p>
        <p className="text-orange-400">{payload[0].value} leads</p>
      </div>
    )
  }
  return null
}

export default function DashboardPage() {
  const [stats, setStats] = useState({ totalLeads: 0, wonDeals: 0, lostDeals: 0, tasks: 0 })
  const [chartData, setChartData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchDashboard = async () => {
    const { data: leads } = await supabase.from("leads").select("*")
    const { data: tasks } = await supabase.from("tasks").select("*")

    const totalLeads = leads?.length || 0
    const wonDeals = leads?.filter((l) => l.status === "Won").length || 0
    const lostDeals = leads?.filter((l) => l.status === "Lost").length || 0

    setStats({ totalLeads, wonDeals, lostDeals, tasks: tasks?.length || 0 })

    const stages = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"]
    setChartData(
      stages.map((name) => ({
        name,
        value: leads?.filter((l) => l.status === name).length || 0,
      }))
    )
    setLoading(false)
  }

  useEffect(() => { fetchDashboard() }, [])

  const conversionRate =
    stats.totalLeads > 0
      ? ((stats.wonDeals / stats.totalLeads) * 100).toFixed(1)
      : "0.0"

  const cards = [
    { icon: Users, label: "Total Leads", value: stats.totalLeads, color: "bg-blue-500/20 text-blue-400" },
    { icon: CheckCircle, label: "Won Deals", value: stats.wonDeals, color: "bg-green-500/20 text-green-400" },
    { icon: XCircle, label: "Lost Deals", value: stats.lostDeals, color: "bg-red-500/20 text-red-400" },
    { icon: ClipboardList, label: "Active Tasks", value: stats.tasks, color: "bg-orange-500/20 text-orange-400" },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] p-6">
        <div className="mb-8 h-8 w-48 skeleton" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl skeleton" />
          ))}
        </div>
        <div className="mt-8 h-96 rounded-2xl skeleton" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1
          className="text-3xl font-bold"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Dashboard
        </h1>
        <p className="mt-2 text-zinc-400">CRM performance overview</p>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {cards.map((c, i) => (
          <StatCard key={c.label} {...c} delay={i * 0.08} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8 rounded-2xl border border-white/[0.06] bg-[#111111] p-6"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2
              className="text-xl font-semibold"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Pipeline Analytics
            </h2>
            <p className="mt-1 text-sm text-zinc-500">Lead distribution by stage</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-orange-500/15 px-4 py-2 text-sm text-orange-400">
            <TrendingUp size={15} />
            {conversionRate}% Conversion Rate
          </div>
        </div>

        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barCategoryGap="30%">
              <XAxis
                dataKey="name"
                tick={{ fill: "#71717a", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#71717a", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
}
