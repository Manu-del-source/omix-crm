'use client'
import { useState } from "react"
import { motion } from "framer-motion"
import { SiteNav } from "@/components/layout/SiteNav"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { PageHero } from "@/components/ui/PageHero"
import { Container } from "@/components/ui/Container"
import { Mail, MessageSquare, CalendarDays, CheckCircle, ArrowRight, Send } from "lucide-react"

const E = [0.16, 1, 0.3, 1] as const

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", intent: "demo" })

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    await new Promise(r => setTimeout(r, 900))
    setBusy(false)
    setSent(true)
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0A0A0A] text-white">
      <SiteNav />
      <PageHero label="Contact" heading="Let's talk"
        sub="Book a demo, ask about pricing, or just say hello. We respond to every message within one business day." />

      <section id="form" className="section border-t border-white/[0.06]">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_480px] lg:gap-20">
            <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: E }}>
              <span className="section-label">Get in Touch</span>
              <h2 className="mt-4 h3 text-white">Send us a message</h2>
              <p className="mt-4 body-lg">Fill in the form and we'll get back to you within one business day.</p>
              <div className="mt-10 space-y-5">
                {[{ t: "Response time", v: "Within 1 business day" }, { t: "Demo duration", v: "30 minutes" },
                  { t: "Sales enquiries", v: "hello@omixcrm.com" }, { t: "Customer support", v: "support@omixcrm.com" },
                ].map(r => (
                  <div key={r.t} className="card flex items-center justify-between px-5 py-4 rounded-[14px]">
                    <span className="text-[14px] text-[#737373]">{r.t}</span>
                    <span className="text-[14px] font-semibold text-white">{r.v}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: E }}>
              <div className="rounded-[24px] border border-white/[0.08] bg-[#111] p-8">
                {sent ? (
                  <div className="flex flex-col items-center py-10 text-center">
                    <CheckCircle size={48} className="text-[#FACC15]" />
                    <h3 className="mt-5 text-[22px] font-bold text-white">Message sent!</h3>
                    <p className="mt-3 text-[16px] leading-relaxed text-[#A3A3A3]">Thanks for reaching out. We'll get back to you within one business day.</p>
                    <button onClick={() => { setSent(false); setForm({ name: "", email: "", company: "", message: "", intent: "demo" }) }}
                      className="mt-7 rounded-full border border-white/[0.1] px-6 py-2.5 text-[14px] font-medium text-[#A3A3A3] hover:text-white">Send another</button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-5">
                    <div>
                      <label className="text-[13px] font-semibold text-[#A3A3A3] block mb-2">I want to...</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[{ v: "demo", l: "Book a Demo" }, { v: "sales", l: "Talk Sales" }, { v: "support", l: "Get Support" }].map(opt => (
                          <button key={opt.v} type="button" onClick={() => update("intent", opt.v)}
                            className={`rounded-[10px] border py-2.5 text-[12px] font-semibold transition-all ${form.intent === opt.v ? "border-[#FACC15]/30 bg-[#FACC15]/[.08] text-[#FACC15]" : "border-white/[0.07] text-[#737373] hover:border-white/[0.14] hover:text-white"}`}>
                            {opt.l}
                          </button>
                        ))}
                      </div>
                    </div>
                    {[{ k: "name", label: "Full name", type: "text", ph: "James Odhiambo", req: true },
                      { k: "email", label: "Work email", type: "email", ph: "james@company.co.ke", req: true },
                      { k: "company", label: "Company", type: "text", ph: "Two Rivers Holdings", req: false },
                    ].map(f => (
                      <div key={f.k}>
                        <label htmlFor={f.k} className="text-[13px] font-semibold text-[#A3A3A3] block mb-2">{f.label}{f.req && <span className="ml-0.5 text-[#FACC15]">*</span>}</label>
                        <input id={f.k} type={f.type} placeholder={f.ph} required={f.req}
                          value={form[f.k as keyof typeof form]} onChange={ev => update(f.k, ev.target.value)}
                          className="input-field !rounded-xl !pl-4" />
                      </div>
                    ))}
                    <div>
                      <label htmlFor="message" className="text-[13px] font-semibold text-[#A3A3A3] block mb-2">Message<span className="ml-0.5 text-[#FACC15]">*</span></label>
                      <textarea id="message" rows={4} required placeholder="Tell us about your team..."
                        value={form.message} onChange={ev => update("message", ev.target.value)}
                        className="input-field !rounded-xl !pl-4 resize-none" />
                    </div>
                    <button type="submit" disabled={busy}
                      className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#FACC15] py-3.5 text-[15px] font-bold text-black shadow-lg transition-all hover:bg-[#FDE68A] disabled:opacity-60">
                      {busy ? "Sending..." : <><Send size={16} /> Send Message</>}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
      <SiteFooter />
    </main>
  )
}
