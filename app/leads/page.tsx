'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { Search, Plus, User, Building2, Mail, Phone, Filter, ChevronRight, Loader2 } from "lucide-react"

const statuses = ["All", "New", "Contacted", "Qualified", "Proposal", "Won", "Lost"]
const statusColors: Record<string, string> = {
  New: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  Contacted: "bg-purple-500/15 text-purple-400 border-purple-500/25",
  Qualified: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
  Proposal: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  Won: "bg-green-500/15 text-green-400 border-green-500/25",
  Lost: "bg-red-500/15 text-red-400 border-red-500/25",
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
const cardAnim = { hidden: { opacity: 0, y: 16, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } }, exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } } }

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("All")
  const [loading, setLoading] = useState(true)

  const fetchLeads = async () => {
    setLoading(true)
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false })
    setLeads(data || [])
    setFiltered(data || [])
    setLoading(false)
  }
  useEffect(() => { fetchLeads() }, [])

  useEffect(() => {
    let f = [...leads]
    if (search) f = f.filter(l => l.name?.toLowerCase().includes(search.toLowerCase()) || l.company?.toLowerCase().includes(search.toLowerCase()) || l.email?.toLowerCase().includes(search.toLowerCase()))
    if (status !== "All") f = f.filter(l => l.status === status)
    setFiltered(f)
  }, [search, status, leads])

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Leads</h1>
          <p className="mt-1.5 text-sm text-[#737373]">{loading ? "Loading..." : `${filtered.length} of ${leads.length} leads`}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/pipeline" className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm font-medium transition-all hover:bg-white/[0.08]">Pipeline <ChevronRight size={15} /></Link>
          <Link href="/leads/new" className="flex items-center gap-2 rounded-xl bg-[#FACC15] px-4 py-2.5 text-sm font-bold text-black transition-all hover:bg-[#FDE68A]"><Plus size={16} /> Add Lead</Link>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#525252]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, company, email..." className="input-field pl-11" />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#525252]" />
          <select value={status} onChange={e => setStatus(e.target.value)} className="input-field pl-11 appearance-none cursor-pointer">
            {statuses.map(s => <option key={s} value={s} className="bg-[#0D0D0D]">{s}</option>)}
          </select>
        </div>
      </motion.div>

      <div className="mb-6 flex flex-wrap gap-2">
        {statuses.map(s => (
          <button key={s} onClick={() => setStatus(s)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
              status === s ? "border-[#FACC15]/40 bg-[#FACC15]/10 text-[#FACC15]" : "border-white/[0.08] text-[#737373] hover:border-white/[0.15] hover:text-white"
            }`}>{s}</button>
        ))}
      </div>

      {loading ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{[...Array(6)].map((_, i) => <div key={i} className="h-36 skeleton" />)}</div>
      ) : (
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map(lead => (
                <motion.div key={lead.id} variants={cardAnim} layout>
                  <Link href={`/leads/${lead.id}`} className="group card block p-6 hover:border-amber-500/30">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 text-sm font-semibold text-[#FACC15]">{lead.name?.[0]?.toUpperCase() || "?"}</div>
                        <div>
                          <h2 className="text-base font-semibold group-hover:text-[#FACC15] transition">{lead.name}</h2>
                          <span className={`inline-block mt-1 rounded-full border px-2 py-0.5 text-xs font-medium ${statusColors[lead.status] || "bg-zinc-800 text-zinc-400"}`}>{lead.status || "New"}</span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="mt-1 shrink-0 text-[#404040] transition group-hover:translate-x-1 group-hover:text-[#FACC15]" />
                    </div>
                    <div className="mt-4 space-y-1.5 text-sm text-[#737373]">
                      {lead.company && <div className="flex items-center gap-2"><Building2 size={13} className="shrink-0 text-[#525252]" /><span className="truncate">{lead.company}</span></div>}
                      {lead.email && <div className="flex items-center gap-2"><Mail size={13} className="shrink-0 text-[#525252]" /><span className="truncate">{lead.email}</span></div>}
                      {lead.phone && <div className="flex items-center gap-2"><Phone size={13} className="shrink-0 text-[#525252]" /><span>{lead.phone}</span></div>}
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-white/[0.05] pt-3">
                      <span className="text-xs text-[#525252]">{lead.created_at ? new Date(lead.created_at).toLocaleDateString() : ""}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-24 text-center">
              <User size={48} className="mb-4 text-[#404040]" />
              <p className="text-lg font-medium text-[#737373]">No leads found</p>
              <p className="mt-2 text-sm text-[#525252]">{search || status !== "All" ? "Try adjusting your filters" : "Add your first lead to get started"}</p>
              <Link href="/leads/new" className="mt-6 flex items-center gap-2 rounded-xl bg-[#FACC15] px-6 py-3 text-sm font-bold text-black"><Plus size={16} /> Add First Lead</Link>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
