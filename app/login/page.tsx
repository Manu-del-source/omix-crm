'use client'
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react"

const E = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const signInWithGoogle = async () => {
    setGoogleLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/auth/callback` } })
    if (error) { toast.error(error.message); setGoogleLoading(false) }
  }

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) { toast.error("Please enter your email address"); return }
    if (!password) { toast.error("Please enter your password"); return }
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) { toast.error(error.message === "Invalid login credentials" ? "Invalid email or password." : error.message); return }
    if (!data.session) { toast.error("Sign-in succeeded but no session returned."); return }
    toast.success("Welcome back!")
    router.refresh()
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070B14] px-4">
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-40" />
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: E }} className="relative w-full max-w-[400px]">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.09)] bg-[#0D1626] p-8 shadow-[0_2px_8px_rgba(255,255,255,0.06)] sm:p-10">
          <div className="mb-8 text-center">
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-[#38BDF8] to-[#818CF8]">
                <span className="text-white text-[11px] font-bold">O</span>
              </span>
              <span className="text-[14px] font-bold text-[#E7ECF6]">Omix</span>
            </Link>
            <h1 className="mt-5 text-xl font-semibold text-[#E7ECF6]">Welcome back</h1>
            <p className="mt-1 text-[14px] text-[#8A93A8]">Sign in to your account</p>
          </div>

          <button type="button" onClick={signInWithGoogle} disabled={googleLoading}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#0D1626] py-3 text-[14px] font-medium text-[#8A93A8] transition-all hover:border-[rgba(255,255,255,0.12)] hover:text-[#E7ECF6] disabled:opacity-50">
            {googleLoading ? <Loader2 size={16} className="animate-spin" /> : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" fill="#EA4335"/>
              </svg>
            )}
            {googleLoading ? "Connecting..." : "Continue with Google"}
          </button>

          <div className="relative my-6 flex items-center gap-3">
            <div className="flex-1 border-t border-[rgba(255,255,255,0.09)]" />
            <span className="text-[11px] font-medium text-[#616B80]">or</span>
            <div className="flex-1 border-t border-[rgba(255,255,255,0.09)]" />
          </div>

          <form onSubmit={signIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="label">Email address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#616B80] pointer-events-none" />
                <input id="email" type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)}
                  className="input-field pl-10" autoComplete="email" required />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="label mb-0">Password</label>
                <Link href="#" className="text-[11px] font-medium text-[#616B80] hover:text-[#38BDF8] transition-colors">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#616B80] pointer-events-none" />
                <input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password"
                  value={password} onChange={e => setPassword(e.target.value)} className="input-field pl-10 pr-10" autoComplete="current-password" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#616B80] hover:text-[#8A93A8]" aria-label={showPassword ? "Hide" : "Show"}>
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#38BDF8] to-[#818CF8] py-3 text-[14px] font-medium text-white shadow-lg shadow-[#38BDF8]/20 transition-all hover:shadow-xl disabled:opacity-50">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <>Sign In <ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="mt-6 text-center text-[13px] text-[#616B80]">
            Don't have an account?{" "}
            <Link href="/signup" className="font-medium text-[#38BDF8] hover:opacity-80 transition-opacity">Create account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
