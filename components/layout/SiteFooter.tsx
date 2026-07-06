import Link from "next/link"
import { Zap, Github, Twitter, Linkedin } from "lucide-react"

const links = {
  Product: [
    { l: "Features", h: "/features" }, { l: "Analytics", h: "/analytics" },
    { l: "Pricing", h: "/pricing" }, { l: "Customers", h: "/customers" },
  ],
  Company: [
    { l: "About", h: "/about" }, { l: "Contact", h: "/contact" },
    { l: "Blog", h: "#" }, { l: "Careers", h: "#" },
  ],
  Account: [
    { l: "Sign up free", h: "/signup" }, { l: "Sign in", h: "/login" },
    { l: "Privacy", h: "#" }, { l: "Terms", h: "#" },
  ],
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0A0A0A]">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-[1.8fr_1fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#FACC15]">
                <Zap size={14} className="text-black" fill="black" />
              </span>
              <span className="text-[15px] font-bold text-white">Omix CRM</span>
            </Link>
            <p className="mt-4 max-w-[240px] text-[14px] leading-relaxed text-[#525252]">
              The modern CRM built for African sales teams and growing businesses.
            </p>
            <div className="mt-6 flex gap-2">
              {[{ icon: Github, href: "https://github.com/Manu-del-source/omix-crm" },
                { icon: Twitter, href: "#" }, { icon: Linkedin, href: "#" },
              ].map(({ icon: Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] text-[#525252] transition-colors hover:border-white/[0.15] hover:text-white">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#404040]">{title}</p>
              <ul className="space-y-3">
                {items.map(({ l, h }) => (
                  <li key={l}><Link href={h} className="text-[14px] text-[#525252] transition-colors hover:text-zinc-200">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/[0.05] pt-8 sm:flex-row sm:items-center">
          <p className="text-[13px] text-[#404040]">&copy; {new Date().getFullYear()} Omix CRM. All rights reserved.</p>
          <p className="text-[13px] text-[#404040]">Made in Kenya &middot; Built on Next.js &amp; Supabase</p>
        </div>
      </div>
    </footer>
  )
}
