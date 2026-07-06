"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { Briefcase, Mail, Phone, Building2, ChevronRight, Trophy } from "lucide-react"

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const card = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
}

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from("leads").select("*").eq("status", "Won").order("created_at", { ascending: false })
      .then(({ data }) => { setClients(data || []); setLoading(false) })
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6 text-white">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Clients
        </h1>
        <p className="mt-2 text-zinc-400">
          {loading ? "Loading…" : `${clients.length} won deal${clients.length !== 1 ? "s" : ""} converted to clients`}
        </p>
      </motion.div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(4)].map((_, i) => <div key={i} className="h-36 rounded-2xl skeleton" />)}
        </div>
      ) : clients.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center">
          <Trophy size={48} className="mb-4 text-zinc-700" />
          <p className="text-lg font-medium text-zinc-500">No clients yet</p>
          <p className="mt-2 text-sm text-zinc-600">Leads marked as "Won" will appear here</p>
          <Link href="/leads" className="mt-6 flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-blue-500 px-6 py-3 text-sm font-semibold transition hover:opacity-90">
            View Leads <ChevronRight size={15} />
          </Link>
        </motion.div>
      ) : (
        <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {clients.map((c) => (
            <motion.div key={c.id} variants={card}>
              <Link href={`/leads/${c.id}`}
                className="card-lift group block rounded-2xl border border-green-500/20 bg-green-500/5 p-6 transition hover:border-green-400/40">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/20 text-lg font-bold text-green-400">
                      {c.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <h2 className="font-semibold group-hover:text-green-300 transition">{c.name}</h2>
                      <span className="mt-0.5 inline-block rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-400">Won ✓</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-green-400" />
                </div>
                <div className="mt-4 space-y-2 text-sm text-zinc-400">
                  {c.company && <div className="flex items-center gap-2"><Building2 size={13} className="text-zinc-600" />{c.company}</div>}
                  {c.email && <div className="flex items-center gap-2"><Mail size={13} className="text-zinc-600" />{c.email}</div>}
                  {c.phone && <div className="flex items-center gap-2"><Phone size={13} className="text-zinc-600" />{c.phone}</div>}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
