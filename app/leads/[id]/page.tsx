'use client'
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { ArrowLeft, Building2, Mail, Phone, Calendar, Tag, Trash2 } from "lucide-react"
import Link from "next/link"

const SC: Record<string, string> = {
  New: "bg-blue-100 text-blue-600", Contacted: "bg-purple-100 text-purple-600",
  Qualified: "bg-cyan-100 text-cyan-600", Proposal: "bg-amber-100 text-amber-600",
  Won: "bg-green-100 text-green-600", Lost: "bg-red-100 text-red-600",
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
    if (!confirm("Delete permanently?")) return
    await supabase.from("leads").delete().eq("id", id)
    toast.success("Deleted"); router.push("/leads")
  }

  if (loading) return <div className="p-6 lg:p-8"><div className="h-7 w-48 skeleton mb-4" /><div className="h-48 skeleton" /></div>
  if (!lead) return null

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <Link href="/leads" className="inline-flex items-center gap-1 text-[13px] text-[#8A93A8] hover:text-[#E7ECF6] transition-colors mb-4">
        <ArrowLeft size={14} /> Back to Leads
      </Link>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0C2033] text-lg font-bold text-[#38BDF8]">{lead.name?.[0]?.toUpperCase()}</div>
          <div>
            <h1 className="text-xl font-semibold">{lead.name}</h1>
            <span className={`mt-1 inline-block rounded px-2 py-0.5 text-[11px] font-medium ${SC[lead.status] || "bg-zinc-100 text-zinc-500"}`}>{lead.status}</span>
          </div>
        </div>
        <button onClick={deleteLead} className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3.5 py-2 text-[12px] font-medium text-red-600 transition-all hover:bg-red-50"><Trash2 size={13} /> Delete</button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-5 space-y-3">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[#616B80]">Contact</h2>
          {lead.email && <div className="flex items-center gap-2.5 text-[13px]"><Mail size={14} className="text-[#616B80]" /><span>{lead.email}</span></div>}
          {lead.phone && <div className="flex items-center gap-2.5 text-[13px]"><Phone size={14} className="text-[#616B80]" /><span>{lead.phone}</span></div>}
          {lead.company && <div className="flex items-center gap-2.5 text-[13px]"><Building2 size={14} className="text-[#616B80]" /><span>{lead.company}</span></div>}
        </div>
        <div className="card p-5 space-y-3">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[#616B80]">Details</h2>
          <div className="flex items-center gap-2.5 text-[13px]"><Tag size={14} className="text-[#616B80]" /><span>Status: <strong>{lead.status}</strong></span></div>
          <div className="flex items-center gap-2.5 text-[13px]"><Calendar size={14} className="text-[#616B80]" /><span>Created: {new Date(lead.created_at).toLocaleDateString()}</span></div>
        </div>
      </div>
    </div>
  )
}
