'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Zap, Menu, X } from "lucide-react"

const NAV_LINKS = [
  { label: "Features",  href: "/features"  },
  { label: "Analytics", href: "/analytics" },
  { label: "Pricing",   href: "/pricing"   },
  { label: "Customers", href: "/customers" },
  { label: "About",     href: "/about"     },
  { label: "Contact",   href: "/contact"   },
]

export function SiteNav() {
  const path = usePathname()
  const [past, setPast] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const h = () => setPast(window.scrollY > 40)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])

  useEffect(() => { setOpen(false) }, [path])

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        past || open ? "border-b border-white/[0.07] bg-[#0A0A0A]/90 backdrop-blur-2xl" : "bg-transparent"
      }`}>
        <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#FACC15]">
              <Zap size={14} className="text-black" fill="black" />
            </span>
            <span className="text-[15px] font-bold tracking-[-0.025em] text-white">Omix CRM</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href}
                className={`rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors ${
                  path === l.href || (l.href !== "/" && path.startsWith(l.href))
                    ? "text-white" : "text-[#737373] hover:text-white"
                }`}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/login" className="rounded-lg px-4 py-2 text-[14px] font-medium text-[#737373] transition-colors hover:text-white">Sign in</Link>
            <Link href="/signup">
              <span className="inline-flex cursor-pointer rounded-full bg-[#FACC15] px-5 py-2.5 text-[13px] font-bold text-black shadow-md transition-shadow hover:shadow-lg">
                Get Started
              </span>
            </Link>
          </div>

          <button onClick={() => setOpen(o => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] text-white lg:hidden"
            aria-label={open ? "Close" : "Menu"}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-white/[0.07] bg-[#0A0A0A] lg:hidden">
              <div className="space-y-1 px-5 py-4">
                {NAV_LINKS.map(l => (
                  <Link key={l.href} href={l.href}
                    className={`flex items-center rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                      path === l.href ? "bg-white/[0.06] text-white" : "text-[#A3A3A3] hover:text-white"
                    }`}>
                    {l.label}
                  </Link>
                ))}
                <div className="mt-3 flex gap-3 border-t border-white/[0.07] pt-3">
                  <Link href="/login" className="flex-1 rounded-xl border border-white/[0.1] py-3 text-center text-[14px] font-medium text-[#A3A3A3]">Sign in</Link>
                  <Link href="/signup" className="flex-1 rounded-xl bg-[#FACC15] py-3 text-center text-[14px] font-bold text-black">Get Started</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <div className="h-[68px]" />
    </>
  )
}
