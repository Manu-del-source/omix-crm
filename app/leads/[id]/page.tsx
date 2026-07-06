'use client'
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { ArrowLeft, Building2, Mail, Phone, Calendar, Tag, Trash2, ExternalLink } from "lucide-react"
import Link from "next/link"

const statusColors: Record<string, string> = {
  New: "bg-blue-500/15 text-blue-400", Contacted: "bg-purple-500/15 text-purple-400",
  Qualified: "bg-cyan-500/15 text-cyan-400", Proposal: "bg-amber-500/15 text-amber-400",
  Won: "bg-green-500/15 text-green-400", Lost: "bg-red-500/15 text-red-400",
}

export default function LeadDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [lead, setLead] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from("leads").select("*").eq("id", id).single().then(({ data, error }) => {
      if (error || !data) { toast.error("Lead not found"); router.push("/leads") }
      else setLead(data)
      setLoading(false)
    })
  }, [id, router])

  const deleteLead = async () => {
    if (!confirm("Delete this lead permanently?")) return
    await supabase.from("leads").delete().eq("id", id)
    toast.success("Lead deleted")
    router.push("/leads")
  }

  if (loading) return <div className="p-6 lg:p-8"><div className="h-8 w-64 skeleton mb-6" /><div className="h-64 skeleton" /></div>
  if (!lead) return null

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <Link href="/leads" className="inline-flex items-center gap-1.5 text-sm text-[#737373] hover:text-white transition mb-4">
          <ArrowLeft size={15} /> Back to Leads
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 text-xl font-bold text-[#FACC15]">{lead.name?.[0]?.toUpperCase()}</div>
            <div>
              <h1 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{lead.name}</h1>
              <span className={`mt-1.5 inline-block rounded-full px-3 py-1 text-xs font-medium ${statusColors[lead.status] || "bg-zinc-800 text-zinc-400"}`}>{lead.status}</span>
            </div>
          </div>
          <button onClick={deleteLead} className="flex items-center gap-2 rounded-xl border border-red-500/20 px-4 py-2.5 text-sm text-red-400 transition-all hover:bg-red-500/10"><Trash2 size={15} /> Delete</button>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-6 space-y-4">
          <h2 className="text-sm font-semibold text-[#A3A3A3] uppercase tracking-wider">Contact Info</h2>
          {lead.email && <div className="flex items-center gap-3 text-sm"><Mail size={15} className="text-[#525252]" /><span>{lead.email}</span></div>}
          {lead.phone && <div className="flex items-center gap-3 text-sm"><Phone size={15} className="text-[#525252]" /><span>{lead.phone}</span></div>}
          {lead.company && <div className="flex items-center gap-3 text-sm"><Building2 size={15} className="text-[#525252]" /><span>{lead.company}</span></div>}
        </div>
        <div className="card p-6 space-y-4">
          <h2 className="text-sm font-semibold text-[#A3A3A3] uppercase tracking-wider">Details</h2>
          <div className="flex items-center gap-3 text-sm"><Tag size={15} className="text-[#525252]" /><span>Status: <strong>{lead.status}</strong></span></div>
          <div className="flex items-center gap-3 text-sm"><Calendar size={15} className="text-[#525252]" /><span>Created: {new Date(lead.created_at).toLocaleDateString()}</span></div>
        </div>
      </div>
    </div>
  )
}
