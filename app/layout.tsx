import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Omix CRM — Modern Sales CRM for African Businesses",
  description:
    "Track every lead, automate follow-ups, and close more deals. The modern CRM built for African sales teams and growing businesses.",
  openGraph: {
    title: "Omix CRM",
    description: "Modern CRM for African sales teams.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} bg-[#070B14]`}>
      <body className="antialiased">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
