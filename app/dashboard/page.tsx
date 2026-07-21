'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Users, CheckCircle, XCircle, ClipboardList, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"

const COLORS = ["#3b82f6", "#8b5cf6", "#f59e0b", "#22c55e", "#38BDF8", "#ef4444"]
const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }

export default function DashboardPage() {
  const [stats, setStats] = useState({ totalLeads: 0, wonDeals: 0, lostDeals: 0, tasks: 0 })
  const [chartData, setChartData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const [{ data: leads }, { data: tasks }] = await Promise.all([
        supabase.from("leads").select("*"),
        supabase.from("tasks").select("*"),
      ])
      const total = leads?.length || 0
      const won = leads?.filter(l => l.status === "Won").length || 0
      const lost = leads?.filter(l => l.status === "Lost").length || 0
      setStats({ totalLeads: total, wonDeals: won, lostDeals: lost, tasks: tasks?.length || 0 })
      setChartData(["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"].map(name => ({ name, value: leads?.filter(l => l.status === name).length || 0 })))
      setLoading(false)
    })()
  }, [])

  const conv = stats.totalLeads > 0 ? ((stats.wonDeals / stats.totalLeads) * 100).toFixed(1) : "0.0"
  const cards = [
    { icon: Users, label: "Total Leads", value: stats.totalLeads, color: "bg-gradient-to-br from-blue-500 to-blue-600 text-white" },
    { icon: CheckCircle, label: "Won Deals", value: stats.wonDeals, color: "bg-gradient-to-br from-green-500 to-green-600 text-white" },
    { icon: XCircle, label: "Lost Deals", value: stats.lostDeals, color: "bg-gradient-to-br from-red-500 to-red-600 text-white" },
    { icon: ClipboardList, label: "Active Tasks", value: stats.tasks, color: "bg-gradient-to-br from-amber-500 to-amber-600 text-white" },
  ]

  if (loading) return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 h-7 w-40 skeleton" />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{[...Array(4)].map((_, i) => <div key={i} className="h-24 skeleton" />)}</div>
      <div className="mt-8 h-80 skeleton" />
    </div>
  )

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-[14px] text-[#8A93A8]">CRM performance overview</p>
      </motion.div>
      <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(c => (
          <motion.div key={c.label} variants={fadeUp} className="card p-5">
            <div className="flex items-center justify-between">
              <div className={`rounded-lg p-2.5 ${c.color}`}><c.icon size={18} /></div>
              <span className="text-xl font-semibold text-[#E7ECF6]">{c.value}</span>
            </div>
            <p className="mt-2 text-[13px] text-[#8A93A8]">{c.label}</p>
          </motion.div>
        ))}
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="mt-8 card p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#E7ECF6]">Pipeline Analytics</h2>
            <p className="mt-0.5 text-[13px] text-[#8A93A8]">Lead distribution by stage</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-[#0C2033] px-3 py-1.5 text-[12px] font-medium text-[#38BDF8]">
            <TrendingUp size={14} /> {conv}% Conversion
          </div>
        </div>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barCategoryGap="25%">
              <XAxis dataKey="name" tick={{ fill: "#616B80", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#616B80", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }}
                contentStyle={{ background: "white", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 10, boxShadow: "0 2px 8px rgba(255,255,255,0.06)" }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.7} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
}
