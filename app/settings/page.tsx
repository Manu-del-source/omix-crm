'use client'
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { Settings, User, Mail, Lock, Shield, Loader2 } from "lucide-react"

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => { setUser(data.user); setEmail(data.user?.email || "") })
  }, [])

  const updatePassword = async () => {
    if (!newPassword) { toast.error("Enter a new password"); return }
    if (newPassword !== confirmPassword) { toast.error("Passwords do not match"); return }
    if (newPassword.length < 6) { toast.error("Password must be at least 6 characters"); return }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setLoading(false)
    if (error) toast.error(error.message)
    else { toast.success("Password updated!"); setNewPassword(""); setConfirmPassword("") }
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight"><Settings size={22} className="text-[#C73B2A]" /> Settings</h1>
        <p className="mt-0.5 text-[14px] text-[#78716C]">Manage your account</p>
      </div>
      <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto max-w-2xl space-y-5">
        <motion.div variants={fadeUp} className="card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-[15px] font-semibold"><User size={16} className="text-blue-500" /> Account Info</h2>
          <div className="space-y-3">
            <div>
              <label className="label">Email</label>
              <div className="flex items-center gap-2 rounded-lg border border-[rgba(0,0,0,0.06)] bg-white px-3.5 py-2.5">
                <Mail size={14} className="text-[#A8A29E]" />
                <span className="text-[13px] text-[#78716C]">{email || "—"}</span>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div variants={fadeUp} className="card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-[15px] font-semibold"><Shield size={16} className="text-amber-500" /> Business</h2>
          <input placeholder="Your Company Ltd" className="input-field !rounded-lg text-[13px]" />
          <button onClick={() => toast.success("Saved!")} className="mt-3 rounded-lg bg-[#C73B2A] px-5 py-2.5 text-[13px] font-medium text-white">Save</button>
        </motion.div>
        <motion.div variants={fadeUp} className="card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-[15px] font-semibold"><Lock size={16} className="text-purple-500" /> Security</h2>
          <div className="space-y-3">
            <div><label className="label">New Password</label><input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="••••••••" className="input-field !rounded-lg text-[13px]" /></div>
            <div><label className="label">Confirm Password</label><input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" className="input-field !rounded-lg text-[13px]" /></div>
            <button onClick={updatePassword} disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-purple-100 px-5 py-2.5 text-[13px] font-medium text-purple-600 transition-all hover:bg-purple-200 disabled:opacity-50">
              {loading ? <Loader2 size={13} className="animate-spin" /> : <Lock size={13} />} Update Password
            </button>
          </div>
        </motion.div>
        <motion.div variants={fadeUp} className="rounded-xl border border-red-200/50 bg-red-50/50 p-5">
          <h2 className="mb-2 text-[15px] font-semibold text-red-600">Danger Zone</h2>
          <p className="mb-3 text-[13px] text-[#78716C]">Once you delete your account, there is no going back.</p>
          <button className="rounded-lg border border-red-300 px-5 py-2.5 text-[13px] font-medium text-red-600 transition-all hover:bg-red-100">Delete Account</button>
        </motion.div>
      </motion.div>
    </div>
  )
}
