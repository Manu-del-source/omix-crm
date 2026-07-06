'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { ArrowLeft, Loader2, UserPlus } from "lucide-react"
import Link from "next/link"

const statuses = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"]

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
    toast.success("Lead created!")
    router.push("/leads")
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Link href="/leads" className="inline-flex items-center gap-1.5 text-sm text-[#737373] hover:text-white transition mb-6">
          <ArrowLeft size={15} /> Back to Leads
        </Link>
        <h1 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>New Lead</h1>

        <form onSubmit={submit} className="card p-8 space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="label">Full name <span className="text-[#FACC15]">*</span></label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="James Odhiambo" className="input-field" required />
            </div>
            <div>
              <label className="label">Company</label>
              <input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Two Rivers Holdings" className="input-field" />
            </div>
            <div>
              <label className="label">Email</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="james@company.co.ke" className="input-field" />
            </div>
            <div>
              <label className="label">Phone</label>
              <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+254 7XX XXX XXX" className="input-field" />
            </div>
          </div>
          <div>
            <label className="label">Status</label>
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="input-field cursor-pointer">
              {statuses.map(s => <option key={s} value={s} className="bg-[#0D0D0D]">{s}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Notes</label>
            <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3} placeholder="Any additional details..." className="input-field resize-none" />
          </div>
          <button type="submit" disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FACC15] py-3.5 text-sm font-bold text-black transition-all hover:bg-[#FDE68A] disabled:opacity-60">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
            {loading ? "Creating..." : "Create Lead"}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
