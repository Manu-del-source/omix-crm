"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F6F3] px-6 text-[#1C1917] text-center">
      <div className="grid-bg pointer-events-none fixed inset-0 opacity-40" />
      <motion.div className="relative" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, type: "spring" }}>
        <div className="h1 text-8xl font-black text-transparent bg-gradient-to-r from-[#C73B2A] to-[#E85D3A] bg-clip-text">
          404
        </div>
        <h1 className="mt-4 text-2xl font-bold">Page Not Found</h1>
        <p className="mt-3 text-[#78716C]">The page you are looking for doesn&apos;t exist or has been moved.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#C73B2A] to-[#E85D3A] px-6 py-3 font-semibold text-white shadow-lg shadow-[#C73B2A]/20 transition hover:opacity-90">
            <Home size={16} /> Go Home
          </Link>
          <button onClick={() => history.back()} className="flex items-center gap-2 rounded-xl border border-[rgba(0,0,0,0.1)] px-6 py-3 text-[#78716C] transition hover:bg-white hover:text-[#1C1917]">
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}
