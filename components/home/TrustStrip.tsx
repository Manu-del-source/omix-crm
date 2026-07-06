"use client"

const NAMES = [
  "Northbridge Realty", "Highlands Sacco", "Westfield Logistics", "Two Rivers Holdings",
  "Coastline Retailers", "Riverside Motors", "Solid Rock Insurance", "Apex Agencies",
  "Savanna Fintech", "Acacia Agro Traders",
]

export function TrustStrip() {
  const items = [...NAMES, ...NAMES]
  return (
    <div className="bg-surface border-y border-white/[.05] overflow-hidden py-8">
      <p className="mb-5 text-center text-[11px] font-bold uppercase tracking-[.18em] text-[#383838]">
        Trusted by businesses across East Africa
      </p>
      <div className="flex w-max marquee gap-14">
        {items.map((n, i) => (
          <span key={i} className="shrink-0 text-[13px] font-medium text-[#383838] transition-colors hover:text-[#737373]">
            {n}
          </span>
        ))}
      </div>
    </div>
  )
}
