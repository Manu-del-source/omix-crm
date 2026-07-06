'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, BarChart3, Briefcase, Bell, Settings, LogOut, Zap } from "lucide-react"
import { supabase } from "@/lib/supabase"

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Pipeline", href: "/pipeline", icon: BarChart3 },
  { name: "Clients", href: "/clients", icon: Briefcase },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
]

export default function Sidebar() {
  const path = usePathname()

  const logout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-white/[0.06] bg-[#0D0D0D] max-lg:hidden">
      {/* Logo */}
      <div className="flex items-center gap-2.5 border-b border-white/[0.06] px-6 py-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#FACC15]">
          <Zap size={14} className="text-black" fill="black" />
        </span>
        <span className="text-[15px] font-bold tracking-[-0.025em] text-white">Omix CRM</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-5">
        {links.map((l) => {
          const Icon = l.icon
          const active = path === l.href || path.startsWith(l.href + "/")
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-[14px] font-medium transition-all ${
                active
                  ? "bg-[#FACC15]/10 text-[#FACC15]"
                  : "text-[#737373] hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <Icon size={18} />
              {l.name}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/[0.06] p-3">
        <button onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-[14px] font-medium text-red-400 transition-all hover:bg-red-500/10">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  )
}
