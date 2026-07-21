'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push("/login")
      else setChecking(false)
    })
  }, [router])

  if (checking) return (
    <div className="flex min-h-screen items-center justify-center bg-[#070B14]">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#38BDF8] border-t-transparent" />
    </div>
  )

  return (
    <div className="flex min-h-screen bg-[#070B14] text-[#E7ECF6]">
      <div className="fixed inset-x-0 top-0 z-50 flex h-12 items-center justify-between border-b border-[rgba(255,255,255,0.09)] bg-[#070B14]/80 backdrop-blur-xl px-4 lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-[#38BDF8] to-[#818CF8]">
            <span className="text-white text-[9px] font-bold">O</span>
          </span>
          <span className="text-[13px] font-bold text-[#E7ECF6]">Omix</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.12)] text-[#8A93A8]">
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex pt-12 lg:hidden">
          <div className="flex-1 bg-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="w-64 border-l border-[rgba(255,255,255,0.09)] bg-[#0A1120]"><Sidebar /></div>
        </div>
      )}
      <Sidebar />
      <main className="flex-1 overflow-auto pt-12 lg:pt-0">
        <motion.div key={typeof window !== "undefined" ? window.location.pathname : ""}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}>
          {children}
        </motion.div>
      </main>
    </div>
  )
}
