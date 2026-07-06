"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { ArrowLeft, User, Building2, Mail, Phone, Tag, Loader2 } from "lucide-react"
import Link from "next/link"

const statuses = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"]

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
}

function Field({
  label, icon: Icon, children,
}: { label: string; icon: any; children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
        <Icon size={14} className="text-zinc-600" /> {label}
      </label>
      {children}
    </motion.div>
  )
}

export default function NewLeadPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", status: "New",
  })

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const inputCls =
    "rounded-xl border border-white/[0.06] bg-[#111111] px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400/60 placeholder:text-zinc-600 w-full"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) { toast.error("Name is required"); return }

    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { toast.error("Not authenticated"); setLoading(false); return }

    const { error } = await supabase.from("leads").insert([{ ...form, user_id: user.id }])
    setLoading(false)

    if (error) { toast.error(error.message); return }
    toast.success("Lead added successfully!")
    router.push("/leads")
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6 text-white">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <Link href="/leads" className="mb-4 flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
          <ArrowLeft size={15} /> Back to Leads
        </Link>
        <h1 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Add New Lead
        </h1>
        <p className="mt-2 text-zinc-400">Fill in the details for your new lead</p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-xl rounded-2xl border border-white/[0.06] bg-[#111111] p-8"
      >
        <div className="grid gap-5">
          <Field label="Full Name *" icon={User}>
            <input value={form.name} onChange={set("name")} placeholder="John Kamau" className={inputCls} required />
          </Field>
          <Field label="Company" icon={Building2}>
            <input value={form.company} onChange={set("company")} placeholder="Acme Ltd" className={inputCls} />
          </Field>
          <Field label="Email Address" icon={Mail}>
            <input type="email" value={form.email} onChange={set("email")} placeholder="john@company.co.ke" className={inputCls} />
          </Field>
          <Field label="Phone Number" icon={Phone}>
            <input value={form.phone} onChange={set("phone")} placeholder="+254 7XX XXX XXX" className={inputCls} />
          </Field>
          <Field label="Status" icon={Tag}>
            <select value={form.status} onChange={set("status")} className={inputCls}>
              {statuses.map((s) => <option key={s} value={s} className="bg-zinc-900">{s}</option>)}
            </select>
          </Field>
        </div>

        <motion.div variants={fadeUp} className="mt-8 flex gap-3">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-blue-500 py-3 font-semibold transition disabled:opacity-60"
          >
            {loading ? <><Loader2 size={16} className="animate-spin" /> Adding…</> : "Add Lead"}
          </motion.button>
          <Link
            href="/leads"
            className="flex items-center justify-center rounded-xl border border-white/[0.06] px-6 py-3 text-sm text-zinc-400 transition hover:bg-white/10 hover:text-white"
          >
            Cancel
          </Link>
        </motion.div>
      </motion.form>
    </div>
  )
}
