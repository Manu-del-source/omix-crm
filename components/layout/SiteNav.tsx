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
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])
  useEffect(() => { setOpen(false) }, [path])

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        scrolled || open ? "bg-white/90 backdrop-blur-lg border-b border-[rgba(0,0,0,0.06)]" : "bg-transparent"
      }`}>
        <div className="mx-auto flex h-[52px] max-w-[1200px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-[#C73B2A] to-[#E85D3A]">
              <span className="text-white text-[8px] font-bold">O</span>
            </span>
            <span className="text-[13px] font-semibold text-[#1C1917]">Omix</span>
          </Link>

          <nav className="hidden items-center gap-5 md:flex">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href}
                className={`text-[12px] font-medium transition-colors ${
                  path === l.href || (l.href !== "/" && path.startsWith(l.href))
                    ? "text-[#C73B2A]" : "text-[#78716C] hover:text-[#1C1917]"
                }`}>{l.label}</Link>
            ))}
            <div className="flex items-center gap-2 ml-3 pl-3 border-l border-[rgba(0,0,0,0.06)]">
              <Link href="/login" className="text-[12px] font-medium text-[#78716C] hover:text-[#1C1917]">Sign in</Link>
              <Link href="/signup" className="rounded-md bg-gradient-to-r from-[#C73B2A] to-[#E85D3A] px-3.5 py-1.5 text-[12px] font-medium text-white hover:opacity-90 transition-opacity shadow-sm">Get Started</Link>
            </div>
          </nav>

          <button onClick={() => setOpen(o => !o)}
            className="flex h-8 w-8 items-center justify-center rounded border border-[rgba(0,0,0,0.08)] text-[#78716C] md:hidden"
            aria-label={open ? "Close" : "Menu"}>
            {open ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-[rgba(0,0,0,0.06)] bg-white md:hidden">
            <div className="px-6 py-3 space-y-0.5">
              {NAV_LINKS.map(l => (
                <Link key={l.href} href={l.href}
                  className={`flex items-center rounded px-3 py-2 text-[13px] font-medium transition-colors ${
                    path === l.href ? "bg-[#FEF2F0] text-[#C73B2A]" : "text-[#78716C] hover:text-[#1C1917]"
                  }`}>{l.label}</Link>
              ))}
              <div className="flex gap-2 pt-3 mt-2 border-t border-[rgba(0,0,0,0.06)]">
                <Link href="/login" className="flex-1 rounded border border-[rgba(0,0,0,0.08)] py-2 text-center text-[12px] font-medium text-[#78716C]">Sign in</Link>
                <Link href="/signup" className="flex-1 rounded bg-[#C73B2A] py-2 text-center text-[12px] font-medium text-white">Get Started</Link>
              </div>
            </div>
          </div>
        )}
      </header>
      <div className="h-[52px]" />
    </>
  )
}
