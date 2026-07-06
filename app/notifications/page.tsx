"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { Bell, Clock, User, CheckCircle, AlertTriangle, RefreshCw } from "lucide-react"

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const item = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
}

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
    setTasks(t || [])
    setRecentLeads(l || [])
    setLoading(false)
  }

  useEffect(() => { fetch() }, [])

  const now = new Date()
  const overdue = tasks.filter((t) => !t.completed && t.due_date && new Date(t.due_date) < now)
  const upcoming = tasks.filter((t) => !t.completed && (!t.due_date || new Date(t.due_date) >= now))
  const done = tasks.filter((t) => t.completed)

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6 text-white">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Notifications
          </h1>
          <p className="mt-2 text-zinc-400">CRM activity, reminders, and overdue tasks</p>
        </div>
        <motion.button whileTap={{ scale: 0.93 }} onClick={fetch}
          className="flex items-center gap-2 rounded-xl border border-white/[0.06] px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/10 hover:text-white">
          <RefreshCw size={15} /> Refresh
        </motion.button>
      </motion.div>

      {/* Summary pills */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="mb-8 grid grid-cols-3 gap-4">
        {[
          { label: "Overdue", count: overdue.length, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", icon: AlertTriangle },
          { label: "Upcoming", count: upcoming.length, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", icon: Clock },
          { label: "Completed", count: done.length, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20", icon: CheckCircle },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className={`card-lift rounded-2xl border ${s.bg} p-5`}>
              <div className="flex items-center justify-between">
                <Icon size={20} className={s.color} />
                <span className={`text-3xl font-bold ${s.color}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {s.count}
                </span>
              </div>
              <p className="mt-3 text-sm text-zinc-400">{s.label} Tasks</p>
            </div>
          )
        })}
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Tasks */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-2xl border border-white/[0.06] bg-[#111111] p-6">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <Bell size={18} className="text-orange-400" /> Task Reminders
          </h2>
          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => <div key={i} className="h-16 rounded-xl skeleton" />)}
            </div>
          ) : (
            <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-3">
              <AnimatePresence>
                {[...overdue, ...upcoming, ...done].slice(0, 8).map((task) => {
                  const isOverdue = !task.completed && task.due_date && new Date(task.due_date) < now
                  return (
                    <motion.div key={task.id} variants={item}
                      className={`rounded-xl border p-4 ${task.completed
                        ? "border-green-500/20 bg-green-500/5"
                        : isOverdue
                        ? "border-red-500/20 bg-red-500/5"
                        : "border-white/[0.06] bg-zinc-900/60"}`}>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          {task.completed
                            ? <CheckCircle size={16} className="shrink-0 text-green-400" />
                            : isOverdue
                            ? <AlertTriangle size={16} className="shrink-0 text-red-400" />
                            : <Clock size={16} className="shrink-0 text-orange-400" />}
                          <div className="min-w-0">
                            <p className={`text-sm font-medium truncate ${task.completed ? "text-zinc-500 line-through" : "text-white"}`}>
                              {task.title}
                            </p>
                            {task.leads?.name && (
                              <p className="text-xs text-zinc-500 truncate">{task.leads.name} · {task.leads.company}</p>
                            )}
                          </div>
                        </div>
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                          task.completed ? "bg-green-500/20 text-green-400"
                          : isOverdue ? "bg-red-500/20 text-red-400"
                          : "bg-orange-500/20 text-orange-400"}`}>
                          {task.completed ? "Done" : isOverdue ? "Overdue" : "Pending"}
                        </span>
                      </div>
                      {task.due_date && (
                        <p className="mt-2 ml-7 text-xs text-zinc-600">
                          Due {new Date(task.due_date).toLocaleString()}
                        </p>
                      )}
                    </motion.div>
                  )
                })}
              </AnimatePresence>
              {tasks.length === 0 && <p className="text-sm text-zinc-600 text-center py-8">No tasks yet</p>}
            </motion.div>
          )}
        </motion.div>

        {/* Recent Leads */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-2xl border border-white/[0.06] bg-[#111111] p-6">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <User size={18} className="text-blue-400" /> Recent Leads
          </h2>
          {loading ? (
            <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-14 rounded-xl skeleton" />)}</div>
          ) : (
            <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-3">
              {recentLeads.map((lead) => (
                <motion.div key={lead.id} variants={item}
                  className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-zinc-900/60 p-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/30 to-blue-500/30 text-sm font-semibold">
                      {lead.name?.[0]?.toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{lead.name}</p>
                      <p className="text-xs text-zinc-500 truncate">{lead.company}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      lead.status === "Won" ? "bg-green-500/20 text-green-400"
                      : lead.status === "Lost" ? "bg-red-500/20 text-red-400"
                      : "bg-orange-500/20 text-orange-400"}`}>
                      {lead.status}
                    </span>
                    <span className="text-xs text-zinc-600">{new Date(lead.created_at).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              ))}
              {recentLeads.length === 0 && <p className="text-sm text-zinc-600 text-center py-8">No leads yet</p>}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
