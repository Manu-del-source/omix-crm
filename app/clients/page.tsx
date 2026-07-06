'use client'
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { Briefcase, Mail, Phone, Building2, ChevronRight, Trophy } from "lucide-react"

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
const card = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } }

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    supabase.from("leads").select("*").eq("status", "Won").order("created_at", { ascending: false })
      .then(({ data }) => { setClients(data || []); setLoading(false) })
  }, [])

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
        <p className="mt-0.5 text-[14px] text-[#78716C]">{loading ? "Loading..." : `${clients.length} won deal${clients.length !== 1 ? "s" : ""}`}</p>
      </div>
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{[...Array(4)].map((_, i) => <div key={i} className="h-28 skeleton" />)}</div>
      ) : clients.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <Trophy size={36} className="mb-3 text-[#A8A29E]" />
          <p className="text-[15px] font-medium text-[#78716C]">No clients yet</p>
          <p className="mt-1 text-[13px] text-[#A8A29E]">Leads marked as &quot;Won&quot; appear here</p>
          <Link href="/leads" className="mt-4 rounded-lg bg-[#C73B2A] px-5 py-2.5 text-[13px] font-medium text-white">View Leads</Link>
        </div>
      ) : (
        <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {clients.map(c => (
            <motion.div key={c.id} variants={card}>
              <Link href={`/leads/${c.id}`} className="group card block p-5 border-green-200/50 hover:border-green-400/50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-base font-bold text-green-600">{c.name?.[0]?.toUpperCase()}</div>
                    <div>
                      <h2 className="text-[14px] font-semibold text-[#1C1917] group-hover:text-green-600 transition-colors">{c.name}</h2>
                      <span className="mt-0.5 inline-block rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-medium text-green-600">Won</span>
                    </div>
                  </div>
                  <ChevronRight size={14} className="mt-1 shrink-0 text-[#A8A29E] group-hover:translate-x-0.5 group-hover:text-green-600 transition-all" />
                </div>
                <div className="mt-3 space-y-1 text-[13px] text-[#A8A29E]">
                  {c.company && <div className="flex items-center gap-1.5"><Building2 size={12} />{c.company}</div>}
                  {c.email && <div className="flex items-center gap-1.5"><Mail size={12} />{c.email}</div>}
                  {c.phone && <div className="flex items-center gap-1.5"><Phone size={12} />{c.phone}</div>}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
