'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, BarChart3, Briefcase, Bell, Settings, LogOut } from "lucide-react"
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
  const logout = async () => { await supabase.auth.signOut(); window.location.href = "/login" }

  return (
    <aside className="flex min-h-screen w-60 flex-col border-r border-[rgba(0,0,0,0.06)] bg-white max-lg:hidden">
      <div className="flex items-center gap-2 border-b border-[rgba(0,0,0,0.06)] px-5 py-4">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[#C73B2A] to-[#E85D3A]">
          <span className="text-white text-[10px] font-bold">O</span>
        </span>
        <span className="text-[14px] font-bold text-[#1C1917]">Omix</span>
      </div>
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {links.map(l => {
          const Icon = l.icon
          const active = path === l.href || path.startsWith(l.href + "/")
          return (
            <Link key={l.href} href={l.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all ${
                active ? "bg-gradient-to-r from-[#C73B2A]/10 to-transparent text-[#C73B2A] border-r-2 border-[#C73B2A]" : "text-[#78716C] hover:bg-[#FAF8F5] hover:text-[#1C1917]"
              }`}>
              <Icon size={17} /> {l.name}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-[rgba(0,0,0,0.06)] p-3">
        <button onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-[#78716C] transition-all hover:bg-[#FEF2F0] hover:text-[#C73B2A]">
          <LogOut size={17} /> Logout
        </button>
      </div>
    </aside>
  )
}
