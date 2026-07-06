'use client'
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { Settings, User, Mail, Lock, Shield, Loader2, CheckCircle } from "lucide-react"

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
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
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <Settings size={26} className="text-[#FACC15]" /> Settings
        </h1>
        <p className="mt-1.5 text-sm text-[#737373]">Manage your CRM account and preferences</p>
      </motion.div>

      <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto max-w-2xl space-y-6">
        {/* Account */}
        <motion.div variants={fadeUp} className="card p-6">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <User size={18} className="text-blue-400" /> Account Info
          </h2>
          <div className="space-y-4">
            <div>
              <label className="label">Email Address</label>
              <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3">
                <Mail size={15} className="text-[#525252]" />
                <span className="text-sm text-zinc-300">{email || "—"}</span>
                <CheckCircle size={15} className="ml-auto text-green-400" />
              </div>
            </div>
            <div>
              <label className="label">User ID</label>
              <div className="rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3">
                <span className="text-xs font-mono text-[#525252]">{user?.id || "—"}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Business */}
        <motion.div variants={fadeUp} className="card p-6">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <Shield size={18} className="text-amber-400" /> Business Profile
          </h2>
          <div className="space-y-4">
            <div>
              <label className="label">Business Name</label>
              <input placeholder="Your Company Ltd" className="input-field !rounded-xl" />
            </div>
            <button onClick={() => toast.success("Business profile saved!")}
              className="rounded-xl bg-[#FACC15] px-6 py-3 text-sm font-bold text-black transition-all hover:bg-[#FDE68A]">Save Profile</button>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div variants={fadeUp} className="card p-6">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <Lock size={18} className="text-purple-400" /> Security
          </h2>
          <div className="space-y-4">
            <div>
              <label className="label">New Password</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="••••••••" className="input-field !rounded-xl" />
            </div>
            <div>
              <label className="label">Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" className="input-field !rounded-xl" />
            </div>
            <button onClick={updatePassword} disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-purple-500/15 px-6 py-3 text-sm font-medium text-purple-400 transition-all hover:bg-purple-500/25 disabled:opacity-60">
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />} Update Password
            </button>
          </div>
        </motion.div>

        {/* Danger */}
        <motion.div variants={fadeUp} className="rounded-xl border border-red-500/15 bg-red-500/5 p-6">
          <h2 className="mb-4 text-lg font-semibold text-red-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Danger Zone</h2>
          <p className="mb-4 text-sm text-[#737373]">Once you delete your account, there is no going back.</p>
          <button className="rounded-xl border border-red-500/25 px-6 py-3 text-sm font-medium text-red-400 transition-all hover:bg-red-500/10">Delete Account</button>
        </motion.div>
      </motion.div>
    </div>
  )
}
