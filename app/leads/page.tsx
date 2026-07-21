'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { Search, Plus, User, Building2, Mail, Phone, Filter, ChevronRight } from "lucide-react"

const STATUSES = ["All", "New", "Contacted", "Qualified", "Proposal", "Won", "Lost"]
const STATUS_COLORS: Record<string, string> = {
  New: "bg-blue-100 text-blue-600", Contacted: "bg-purple-100 text-purple-600",
  Qualified: "bg-cyan-100 text-cyan-600", Proposal: "bg-amber-100 text-amber-600",
  Won: "bg-green-100 text-green-600", Lost: "bg-red-100 text-red-600",
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } }
const cardAnim = { hidden: { opacity: 0, y: 12, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } }, exit: { opacity: 0, scale: 0.95 } }

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from("leads").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setLeads(data || []); setFiltered(data || []); setLoading(false)
    })
  }, [])

  useEffect(() => {
    let f = [...leads]
    if (search) f = f.filter(l => l.name?.toLowerCase().includes(search.toLowerCase()) || l.company?.toLowerCase().includes(search.toLowerCase()) || l.email?.toLowerCase().includes(search.toLowerCase()))
    if (status !== "All") f = f.filter(l => l.status === status)
    setFiltered(f)
  }, [search, status, leads])

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
          <p className="mt-0.5 text-[14px] text-[#8A93A8]">{loading ? "Loading..." : `${filtered.length} of ${leads.length} leads`}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/pipeline" className="flex items-center gap-1.5 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#0D1626] px-3.5 py-2 text-[13px] font-medium text-[#8A93A8] transition-all hover:border-[rgba(255,255,255,0.12)] hover:text-[#E7ECF6]">Pipeline <ChevronRight size={14} /></Link>
          <Link href="/leads/new" className="flex items-center gap-1.5 rounded-lg bg-[#38BDF8] px-3.5 py-2 text-[13px] font-medium text-white transition-all hover:opacity-90"><Plus size={15} /> Add Lead</Link>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {STATUSES.map(s => (
          <button key={s} onClick={() => setStatus(s)}
            className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all ${
              status === s ? "bg-[#38BDF8] text-white" : "bg-[#0D1626] border border-[rgba(255,255,255,0.09)] text-[#8A93A8] hover:border-[rgba(255,255,255,0.12)]"
            }`}>{s}</button>
        ))}
      </div>

      <div className="mb-6 flex gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#616B80]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="input-field pl-9 text-[13px]" />
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{[...Array(6)].map((_, i) => <div key={i} className="h-32 skeleton" />)}</div>
      ) : (
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map(lead => (
                <motion.div key={lead.id} variants={cardAnim} layout>
                  <Link href={`/leads/${lead.id}`} className="group card block p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0C2033] text-sm font-semibold text-[#38BDF8]">{lead.name?.[0]?.toUpperCase() || "?"}</div>
                        <div>
                          <h2 className="text-[14px] font-semibold text-[#E7ECF6] group-hover:text-[#38BDF8] transition-colors">{lead.name}</h2>
                          <span className={`mt-0.5 inline-block rounded px-1.5 py-0.5 text-[10px] font-medium ${STATUS_COLORS[lead.status] || "bg-zinc-100 text-zinc-500"}`}>{lead.status || "New"}</span>
                        </div>
                      </div>
                      <ChevronRight size={14} className="mt-1 shrink-0 text-[#616B80] transition group-hover:translate-x-0.5 group-hover:text-[#38BDF8]" />
                    </div>
                    <div className="mt-3 space-y-1 text-[13px] text-[#616B80]">
                      {lead.company && <div className="flex items-center gap-1.5"><Building2 size={12} /><span className="truncate">{lead.company}</span></div>}
                      {lead.email && <div className="flex items-center gap-1.5"><Mail size={12} /><span className="truncate">{lead.email}</span></div>}
                      {lead.phone && <div className="flex items-center gap-1.5"><Phone size={12} /><span>{lead.phone}</span></div>}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center py-20 text-center">
              <User size={36} className="mb-3 text-[#616B80]" />
              <p className="text-[15px] font-medium text-[#8A93A8]">No leads found</p>
              <Link href="/leads/new" className="mt-4 rounded-lg bg-[#38BDF8] px-5 py-2.5 text-[13px] font-medium text-white"><Plus size={14} /> Add First Lead</Link>
            </div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
