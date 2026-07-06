'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { label: "Features", href: "/features" }, { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" }, { label: "Contact", href: "/contact" },
]

export function SiteNav() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])
  useEffect(() => { setOpen(false) }, [path])

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-white/90 backdrop-blur-lg border-b border-[rgba(0,0,0,0.06)]" : "bg-transparent"
      }`}>
        <div className="mx-auto flex h-[64px] max-w-[1200px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#C73B2A]">
              <span className="text-white text-[10px] font-bold">O</span>
            </span>
            <span className="text-[14px] font-semibold tracking-tight text-[#1C1917]">Omix</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href}
                className={`text-[13px] font-medium transition-colors ${
                  path === l.href || (l.href !== "/" && path.startsWith(l.href))
                    ? "text-[#C73B2A]" : "text-[#78716C] hover:text-[#1C1917]"
                }`}>{l.label}</Link>
            ))}
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-[rgba(0,0,0,0.06)]">
              <Link href="/login" className="text-[13px] font-medium text-[#78716C] hover:text-[#1C1917] transition-colors">Sign in</Link>
              <Link href="/signup" className="btn-primary text-[13px] px-5 py-2.5">Get Started</Link>
            </div>
          </nav>

          <button onClick={() => setOpen(o => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(0,0,0,0.08)] text-[#78716C] md:hidden"
            aria-label={open ? "Close" : "Menu"}>
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-[rgba(0,0,0,0.06)] bg-white md:hidden">
            <div className="space-y-1 px-6 py-4">
              {NAV_LINKS.map(l => (
                <Link key={l.href} href={l.href}
                  className={`flex items-center rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors ${
                    path === l.href ? "bg-[#FEF2F0] text-[#C73B2A]" : "text-[#78716C] hover:text-[#1C1917]"
                  }`}>{l.label}</Link>
              ))}
              <div className="flex gap-3 pt-3 mt-3 border-t border-[rgba(0,0,0,0.06)]">
                <Link href="/login" className="flex-1 rounded-lg border border-[rgba(0,0,0,0.08)] py-2.5 text-center text-[13px] font-medium text-[#78716C]">Sign in</Link>
                <Link href="/signup" className="flex-1 rounded-lg bg-[#C73B2A] py-2.5 text-center text-[13px] font-medium text-white">Get Started</Link>
              </div>
            </div>
          </div>
        )}
      </header>
      <div className="h-[64px]" />
    </>
  )
}
