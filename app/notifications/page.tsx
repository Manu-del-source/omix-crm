'use client'
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { Bell, Clock, User, CheckCircle, AlertTriangle, RefreshCw } from "lucide-react"

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
const item = { hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.3 } } }

export default function NotificationsPage() {
  const [tasks, setTasks] = useState<any[]>([])
  const [recentLeads, setRecentLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = async () => {
    setLoading(true)
    const [{ data: t }, { data: l }] = await Promise.all([
      supabase.from("tasks").select("*, leads(name, company)").order("due_date", { ascending: true }),
      supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(8),
    ])
    setTasks(t || []); setRecentLeads(l || []); setLoading(false)
  }
  useEffect(() => { fetch() }, [])

  const now = new Date()
  const overdue = tasks.filter(t => !t.completed && t.due_date && new Date(t.due_date) < now)
  const upcoming = tasks.filter(t => !t.completed && (!t.due_date || new Date(t.due_date) >= now))
  const done = tasks.filter(t => t.completed)

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
          <p className="mt-0.5 text-[14px] text-[#78716C]">Tasks, reminders, and activity</p>
        </div>
        <button onClick={fetch} className="flex items-center gap-1.5 rounded-lg border border-[rgba(0,0,0,0.08)] bg-white px-3.5 py-2 text-[12px] font-medium text-[#78716C] transition-all hover:border-[rgba(0,0,0,0.12)]">
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        {[
          { label: "Overdue", count: overdue.length, color: "text-red-600", bg: "bg-red-50 border-red-200/50", icon: AlertTriangle },
          { label: "Upcoming", count: upcoming.length, color: "text-amber-600", bg: "bg-amber-50 border-amber-200/50", icon: Clock },
          { label: "Completed", count: done.length, color: "text-green-600", bg: "bg-green-50 border-green-200/50", icon: CheckCircle },
        ].map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className={`card p-4 ${s.bg}`}>
              <div className="flex items-center justify-between">
                <Icon size={17} className={s.color} />
                <span className="text-lg font-semibold text-[#1C1917]">{s.count}</span>
              </div>
              <p className="mt-1.5 text-[12px] text-[#78716C]">{s.label}</p>
            </div>
          )
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-4 flex items-center gap-2 text-[15px] font-semibold text-[#1C1917]"><Bell size={16} className="text-amber-500" /> Task Reminders</h2>
          {loading ? <div className="space-y-2">{[...Array(4)].map((_, i) => <div key={i} className="h-14 skeleton" />)}</div> : (
            <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-2">
              <AnimatePresence>
                {[...overdue, ...upcoming, ...done].slice(0, 8).map(task => {
                  const isOverdue = !task.completed && task.due_date && new Date(task.due_date) < now
                  return (
                    <motion.div key={task.id} variants={item}
                      className={`rounded-xl border p-3.5 ${task.completed ? "border-green-200/50 bg-green-50/50" : isOverdue ? "border-red-200/50 bg-red-50/50" : "border-[rgba(0,0,0,0.06)] bg-white"}`}>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {task.completed ? <CheckCircle size={15} className="shrink-0 text-green-500" /> : isOverdue ? <AlertTriangle size={15} className="shrink-0 text-red-500" /> : <Clock size={15} className="shrink-0 text-amber-500" />}
                          <div className="min-w-0">
                            <p className={`text-[13px] font-medium truncate ${task.completed ? "text-[#A8A29E] line-through" : "text-[#1C1917]"}`}>{task.title}</p>
                            {task.leads?.name && <p className="text-[11px] text-[#A8A29E] truncate">{task.leads.name}</p>}
                          </div>
                        </div>
                        <span className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-medium ${
                          task.completed ? "bg-green-100 text-green-600" : isOverdue ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
                        }`}>{task.completed ? "Done" : isOverdue ? "Overdue" : "Pending"}</span>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
              {tasks.length === 0 && <p className="py-6 text-center text-[13px] text-[#A8A29E]">No tasks yet</p>}
            </motion.div>
          )}
        </div>

        <div className="card p-5">
          <h2 className="mb-4 flex items-center gap-2 text-[15px] font-semibold text-[#1C1917]"><User size={16} className="text-blue-500" /> Recent Leads</h2>
          {loading ? <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="h-12 skeleton" />)}</div> : (
            <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-2">
              {recentLeads.map(lead => (
                <motion.div key={lead.id} variants={item}
                  className="flex items-center justify-between rounded-xl border border-[rgba(0,0,0,0.06)] bg-white p-3.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#FEF2F0] text-[12px] font-semibold text-[#C73B2A]">{lead.name?.[0]?.toUpperCase()}</div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium truncate">{lead.name}</p>
                      <p className="text-[11px] text-[#A8A29E] truncate">{lead.company}</p>
                    </div>
                  </div>
                  <span className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-medium ${
                    lead.status === "Won" ? "bg-green-100 text-green-600" : lead.status === "Lost" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
                  }`}>{lead.status}</span>
                </motion.div>
              ))}
              {recentLeads.length === 0 && <p className="py-6 text-center text-[13px] text-[#A8A29E]">No leads yet</p>}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
