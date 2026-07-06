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
    <div className="flex min-h-screen items-center justify-center bg-[#F8F6F3]">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#C73B2A] border-t-transparent" />
    </div>
  )

  return (
    <div className="flex min-h-screen bg-[#F8F6F3] text-[#1C1917]">
      <div className="fixed inset-x-0 top-0 z-50 flex h-12 items-center justify-between border-b border-[rgba(0,0,0,0.06)] bg-white px-4 lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-[#C73B2A]">
            <span className="text-white text-[9px] font-bold">O</span>
          </span>
          <span className="text-[13px] font-semibold text-[#1C1917]">Omix</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[rgba(0,0,0,0.08)] text-[#78716C]">
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex pt-12 lg:hidden">
          <div className="flex-1 bg-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="w-64 border-l border-[rgba(0,0,0,0.06)] bg-white"><Sidebar /></div>
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
