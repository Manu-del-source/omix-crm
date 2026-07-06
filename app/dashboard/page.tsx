'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Users, CheckCircle, XCircle, ClipboardList, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"

const COLORS = ["#3b82f6", "#8b5cf6", "#f59e0b", "#22c55e", "#FACC15", "#ef4444"]
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }

export default function DashboardPage() {
  const [stats, setStats] = useState({ totalLeads: 0, wonDeals: 0, lostDeals: 0, tasks: 0 })
  const [chartData, setChartData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const [{ data: leads }, { data: tasks }] = await Promise.all([
      supabase.from("leads").select("*"),
      supabase.from("tasks").select("*"),
    ])
    const totalLeads = leads?.length || 0
    const wonDeals = leads?.filter((l) => l.status === "Won").length || 0
    const lostDeals = leads?.filter((l) => l.status === "Lost").length || 0
    setStats({ totalLeads, wonDeals, lostDeals, tasks: tasks?.length || 0 })
    const stages = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"]
    setChartData(stages.map((name) => ({ name, value: leads?.filter((l) => l.status === name).length || 0 })))
    setLoading(false)
  }
  useEffect(() => { fetchData() }, [])

  const conversion = stats.totalLeads > 0 ? ((stats.wonDeals / stats.totalLeads) * 100).toFixed(1) : "0.0"

  const cards = [
    { icon: Users, label: "Total Leads", value: stats.totalLeads, color: "bg-blue-500/15 text-blue-400" },
    { icon: CheckCircle, label: "Won Deals", value: stats.wonDeals, color: "bg-green-500/15 text-green-400" },
    { icon: XCircle, label: "Lost Deals", value: stats.lostDeals, color: "bg-red-500/15 text-red-400" },
    { icon: ClipboardList, label: "Active Tasks", value: stats.tasks, color: "bg-amber-500/15 text-amber-400" },
  ]

  if (loading) return (
    <div className="p-6">
      <div className="mb-8 h-8 w-48 skeleton" />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">{[...Array(4)].map((_, i) => <div key={i} className="h-28 skeleton" />)}</div>
      <div className="mt-8 h-96 skeleton" />
    </div>
  )

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Dashboard</h1>
        <p className="mt-1.5 body-sm text-[#737373]">CRM performance overview</p>
      </motion.div>

      <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <motion.div key={c.label} variants={fadeUp} className="card p-6">
            <div className="flex items-center justify-between">
              <div className={`rounded-xl p-2.5 ${c.color}`}><c.icon size={20} /></div>
              <span className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{c.value}</span>
            </div>
            <p className="mt-3 text-sm text-[#737373]">{c.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="mt-8 card p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Pipeline Analytics</h2>
            <p className="mt-1 text-sm text-[#737373]">Lead distribution by stage</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2 text-sm text-amber-400">
            <TrendingUp size={15} /> {conversion}% Conversion
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barCategoryGap="30%">
              <XAxis dataKey="name" tick={{ fill: "#525252", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#525252", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: "rgba(255,255,255,0.03)" }}
                contentStyle={{ background: "#181818", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontSize: 12, color: "#fff" }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.8} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
}
