'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { ArrowLeft, Loader2, UserPlus } from "lucide-react"
import Link from "next/link"

export default function NewLeadPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", status: "New", notes: "" })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) { toast.error("Name is required"); return }
    setLoading(true)
    const { error } = await supabase.from("leads").insert([{ ...form, created_at: new Date().toISOString() }])
    setLoading(false)
    if (error) { toast.error(error.message); return }
    toast.success("Lead created!"); router.push("/leads")
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <Link href="/leads" className="inline-flex items-center gap-1 text-[13px] text-[#78716C] hover:text-[#1C1917] transition-colors mb-4">
        <ArrowLeft size={14} /> Back to Leads
      </Link>
      <h1 className="text-xl font-semibold mb-6">New Lead</h1>
      <form onSubmit={submit} className="card p-6 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label">Name <span className="text-[#C73B2A]">*</span></label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="James Odhiambo" className="input-field !rounded-lg text-[13px]" required />
          </div>
          <div>
            <label className="label">Company</label>
            <input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Two Rivers Holdings" className="input-field !rounded-lg text-[13px]" />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="james@company.co.ke" className="input-field !rounded-lg text-[13px]" />
          </div>
          <div>
            <label className="label">Phone</label>
            <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+254 7XX XXX XXX" className="input-field !rounded-lg text-[13px]" />
          </div>
          <div>
            <label className="label">Status</label>
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="input-field !rounded-lg text-[13px] cursor-pointer">
              {["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="label">Notes</label>
          <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3} placeholder="Additional details..." className="input-field !rounded-lg text-[13px] resize-none" />
        </div>
        <button type="submit" disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#C73B2A] py-3 text-[13px] font-medium text-white transition-all hover:opacity-90 disabled:opacity-50">
          {loading ? <Loader2 size={15} className="animate-spin" /> : <UserPlus size={15} />}
          {loading ? "Creating..." : "Create Lead"}
        </button>
      </form>
    </div>
  )
}
