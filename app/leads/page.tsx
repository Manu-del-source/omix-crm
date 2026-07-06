"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase"
import {
  Search, Plus, User, Building2, Mail, Phone,
  Filter, ChevronRight, Loader2,
} from "lucide-react"

const statuses = ["All", "New", "Contacted", "Qualified", "Proposal", "Won", "Lost"]

const statusColors: Record<string, string> = {
  New: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Contacted: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Qualified: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  Proposal: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Won: "bg-green-500/20 text-green-400 border-green-500/30",
  Lost: "bg-red-500/20 text-red-400 border-red-500/30",
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const cardAnim = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("All")
  const [loading, setLoading] = useState(true)

  const fetchLeads = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
    if (!error) {
      setLeads(data || [])
      setFiltered(data || [])
    }
    setLoading(false)
  }

  useEffect(() => { fetchLeads() }, [])

  useEffect(() => {
    let f = [...leads]
    if (search)
      f = f.filter(
        (l) =>
          l.name?.toLowerCase().includes(search.toLowerCase()) ||
          l.company?.toLowerCase().includes(search.toLowerCase()) ||
          l.email?.toLowerCase().includes(search.toLowerCase())
      )
    if (status !== "All") f = f.filter((l) => l.status === status)
    setFiltered(f)
  }, [search, status, leads])

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6 text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1
            className="text-3xl font-bold"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Leads
          </h1>
          <p className="mt-2 text-zinc-400">
            {loading ? "Loading…" : `${filtered.length} of ${leads.length} leads`}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/pipeline"
            className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-[#111111] px-5 py-3 text-sm font-medium transition hover:bg-white/10"
          >
            Pipeline View <ChevronRight size={15} />
          </Link>
          <Link
            href="/leads/new"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-blue-500 px-5 py-3 text-sm font-semibold transition hover:opacity-90"
          >
            <Plus size={16} /> Add Lead
          </Link>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 grid gap-4 md:grid-cols-2"
      >
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, company or email…"
            className="w-full rounded-xl border border-white/[0.06] bg-[#111111] py-4 pl-11 pr-4 text-sm outline-none transition focus:border-orange-400/50"
          />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full appearance-none rounded-xl border border-white/[0.06] bg-[#111111] py-4 pl-11 pr-4 text-sm outline-none transition focus:border-orange-400/50"
          >
            {statuses.map((s) => (
              <option key={s} value={s} className="bg-zinc-900">
                {s}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Status pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mb-6 flex flex-wrap gap-2"
      >
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
              status === s
                ? "border-orange-500/50 bg-orange-500/20 text-orange-400"
                : "border-white/[0.06] bg-[#111111] text-zinc-400 hover:border-white/20 hover:text-white"
            }`}
          >
            {s}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-40 rounded-2xl skeleton" />
          ))}
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {filtered.map((lead) => (
                <motion.div key={lead.id} variants={cardAnim} layout>
                  <Link
                    href={`/leads/${lead.id}`}
                    className="card-lift group block rounded-2xl border border-white/[0.06] bg-[#111111] p-6 transition hover:border-orange-500/40"
                  >
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/30 to-blue-500/30 text-sm font-semibold">
                            {lead.name?.[0]?.toUpperCase() || "?"}
                          </div>
                          <h2 className="truncate text-base font-semibold group-hover:text-orange-300 transition">
                            {lead.name}
                          </h2>
                        </div>
                      </div>
                      <span
                        className={`ml-2 shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${
                          statusColors[lead.status] || "bg-zinc-800 text-zinc-400 border-zinc-700"
                        }`}
                      >
                        {lead.status || "New"}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-zinc-400">
                      {lead.company && (
                        <div className="flex items-center gap-2">
                          <Building2 size={13} className="shrink-0 text-zinc-600" />
                          <span className="truncate">{lead.company}</span>
                        </div>
                      )}
                      {lead.email && (
                        <div className="flex items-center gap-2">
                          <Mail size={13} className="shrink-0 text-zinc-600" />
                          <span className="truncate">{lead.email}</span>
                        </div>
                      )}
                      {lead.phone && (
                        <div className="flex items-center gap-2">
                          <Phone size={13} className="shrink-0 text-zinc-600" />
                          <span>{lead.phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-zinc-600">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </span>
                      <ChevronRight
                        size={15}
                        className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-orange-400"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <User size={48} className="mb-4 text-zinc-700" />
              <p className="text-lg font-medium text-zinc-500">No leads found</p>
              <p className="mt-2 text-sm text-zinc-600">
                {search || status !== "All"
                  ? "Try adjusting your filters"
                  : "Add your first lead to get started"}
              </p>
              <Link
                href="/leads/new"
                className="mt-6 flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-blue-500 px-6 py-3 text-sm font-semibold transition hover:opacity-90"
              >
                <Plus size={16} /> Add First Lead
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
