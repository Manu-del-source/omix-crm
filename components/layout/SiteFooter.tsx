import Link from "next/link"

const cols = {
  Product: [{ l: "Features", h: "/features" }, { l: "Pricing", h: "/pricing" }, { l: "About", h: "/about" }],
  Resources: [{ l: "Contact", h: "/contact" }, { l: "Privacy", h: "#" }, { l: "Terms", h: "#" }],
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.09)] bg-[#0A1120]/60 backdrop-blur-xl">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-[2fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#38BDF8]">
                <span className="text-white text-[10px] font-bold">O</span>
              </span>
              <span className="text-[14px] font-semibold text-[#E7ECF6]">Omix</span>
            </Link>
            <p className="mt-3 max-w-[260px] text-[14px] leading-relaxed text-[#8A93A8]">
              The modern CRM built for African sales teams.
            </p>
          </div>
          {Object.entries(cols).map(([title, items]) => (
            <div key={title}>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-[#616B80]">{title}</p>
              <ul className="space-y-2.5">
                {items.map(({ l, h }) => (
                  <li key={l}><Link href={h} className="text-[14px] text-[#8A93A8] transition-colors hover:text-[#E7ECF6]">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-[rgba(255,255,255,0.09)] pt-8 sm:flex-row sm:items-center">
          <p className="text-[13px] text-[#616B80]">&copy; {new Date().getFullYear()} Omix CRM. All rights reserved.</p>
          <p className="text-[13px] text-[#616B80]">Made in Kenya</p>
        </div>
      </div>
    </footer>
  )
}
