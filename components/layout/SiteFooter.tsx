import Link from "next/link"

const cols = {
  Product: [{ l: "Features", h: "/features" }, { l: "Pricing", h: "/pricing" }, { l: "About", h: "/about" }],
  Resources: [{ l: "Contact", h: "/contact" }, { l: "Privacy", h: "#" }, { l: "Terms", h: "#" }],
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(0,0,0,0.06)] bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-[2fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#C73B2A]">
                <span className="text-white text-[10px] font-bold">O</span>
              </span>
              <span className="text-[14px] font-semibold text-[#1C1917]">Omix</span>
            </Link>
            <p className="mt-3 max-w-[260px] text-[14px] leading-relaxed text-[#78716C]">
              The modern CRM built for African sales teams.
            </p>
          </div>
          {Object.entries(cols).map(([title, items]) => (
            <div key={title}>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-[#A8A29E]">{title}</p>
              <ul className="space-y-2.5">
                {items.map(({ l, h }) => (
                  <li key={l}><Link href={h} className="text-[14px] text-[#78716C] transition-colors hover:text-[#1C1917]">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-[rgba(0,0,0,0.06)] pt-8 sm:flex-row sm:items-center">
          <p className="text-[13px] text-[#A8A29E]">&copy; {new Date().getFullYear()} Omix CRM. All rights reserved.</p>
          <p className="text-[13px] text-[#A8A29E]">Made in Kenya</p>
        </div>
      </div>
    </footer>
  )
}
