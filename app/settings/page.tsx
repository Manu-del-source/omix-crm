"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { Settings, User, Mail, Lock, Shield, Loader2, CheckCircle } from "lucide-react"

const inputCls = "w-full rounded-xl border border-white/[0.06] bg-[#0A0A0A]/30 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400/60 placeholder:text-zinc-600"

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number] } } }

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [bizName, setBizName] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setEmail(data.user?.email || "")
    })
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
    <div className="min-h-screen bg-[#0A0A0A] p-6 text-white">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="flex items-center gap-3 text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <Settings size={28} className="text-orange-400" /> Settings
        </h1>
        <p className="mt-2 text-zinc-400">Manage your CRM account and preferences</p>
      </motion.div>

      <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto max-w-2xl space-y-6">
        {/* Account Info */}
        <motion.div variants={fadeUp} className="rounded-2xl border border-white/[0.06] bg-[#111111] p-6">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <User size={18} className="text-blue-400" /> Account Info
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-zinc-400">Email Address</label>
              <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#0A0A0A]/30 px-4 py-3">
                <Mail size={15} className="text-zinc-600" />
                <span className="text-sm text-zinc-300">{email || "—"}</span>
                <CheckCircle size={15} className="ml-auto text-green-400" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm text-zinc-400">User ID</label>
              <div className="rounded-xl border border-white/[0.06] bg-[#0A0A0A]/30 px-4 py-3">
                <span className="text-xs text-zinc-600 font-mono">{user?.id || "—"}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Business */}
        <motion.div variants={fadeUp} className="rounded-2xl border border-white/[0.06] bg-[#111111] p-6">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <Shield size={18} className="text-orange-400" /> Business Profile
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-zinc-400">Business Name</label>
              <input value={bizName} onChange={(e) => setBizName(e.target.value)} placeholder="Your Company Ltd" className={inputCls} />
            </div>
            <div>
              <label className="mb-2 block text-sm text-zinc-400">Support Email</label>
              <input type="email" placeholder="support@company.co.ke" className={inputCls} />
            </div>
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => toast.success("Business profile saved!")}
              className="rounded-xl bg-gradient-to-r from-orange-500 to-blue-500 px-6 py-3 text-sm font-semibold transition hover:opacity-90">
              Save Profile
            </motion.button>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div variants={fadeUp} className="rounded-2xl border border-white/[0.06] bg-[#111111] p-6">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <Lock size={18} className="text-purple-400" /> Security
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-zinc-400">New Password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" className={inputCls} />
            </div>
            <div>
              <label className="mb-2 block text-sm text-zinc-400">Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className={inputCls} />
            </div>
            <motion.button whileTap={{ scale: 0.97 }} onClick={updatePassword} disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-purple-500/20 px-6 py-3 text-sm font-medium text-purple-400 transition hover:bg-purple-500/30 disabled:opacity-60">
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />}
              Update Password
            </motion.button>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div variants={fadeUp} className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
          <h2 className="mb-4 text-lg font-semibold text-red-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Danger Zone
          </h2>
          <p className="mb-4 text-sm text-zinc-400">Once you delete your account, there is no going back. Please be certain.</p>
          <button className="rounded-xl border border-red-500/30 px-6 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10">
            Delete Account
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
