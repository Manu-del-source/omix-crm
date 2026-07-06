'use client'
import { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import Link from "next/link"
import { Plus, ExternalLink } from "lucide-react"

const STAGES = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"]
const CFG: Record<string, { color: string; dot: string; bg: string }> = {
  New: { color: "text-blue-600", dot: "bg-blue-500", bg: "bg-blue-50/50 border-blue-200/50" },
  Contacted: { color: "text-purple-600", dot: "bg-purple-500", bg: "bg-purple-50/50 border-purple-200/50" },
  Qualified: { color: "text-cyan-600", dot: "bg-cyan-500", bg: "bg-cyan-50/50 border-cyan-200/50" },
  Proposal: { color: "text-amber-600", dot: "bg-amber-500", bg: "bg-amber-50/50 border-amber-200/50" },
  Won: { color: "text-green-600", dot: "bg-green-500", bg: "bg-green-50/50 border-green-200/50" },
  Lost: { color: "text-red-600", dot: "bg-red-500", bg: "bg-red-50/50 border-red-200/50" },
}

export default function PipelinePage() {
  const [columns, setColumns] = useState<Record<string, any[]>>({})
  const [loading, setLoading] = useState(true)

  const fetchLeads = async () => {
    const { data } = await supabase.from("leads").select("*")
    const grouped: Record<string, any[]> = {}
    STAGES.forEach(s => grouped[s] = [])
    data?.forEach(lead => { const s = lead.status || "New"; if (!grouped[s]) grouped[s] = []; grouped[s].push(lead) })
    setColumns(grouped); setLoading(false)
  }
  useEffect(() => { fetchLeads() }, [])

  const onDragEnd = async (result: any) => {
    const { source, destination } = result
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) return
    const src = [...(columns[source.droppableId] || [])]
    const dst = source.droppableId === destination.droppableId ? src : [...(columns[destination.droppableId] || [])]
    const [removed] = src.splice(source.index, 1)
    removed.status = destination.droppableId
    dst.splice(destination.index, 0, removed)
    setColumns({ ...columns, [source.droppableId]: src, [destination.droppableId]: dst })
    const { error } = await supabase.from("leads").update({ status: destination.droppableId }).eq("id", removed.id)
    if (error) { toast.error("Failed to update"); fetchLeads() } else toast.success(`Moved to ${destination.droppableId}`)
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Sales Pipeline</h1>
          <p className="mt-0.5 text-[14px] text-[#78716C]">Drag cards between columns</p>
        </div>
        <Link href="/leads/new" className="flex items-center gap-1.5 rounded-lg bg-[#C73B2A] px-3.5 py-2 text-[13px] font-medium text-white"><Plus size={15} /> Add Lead</Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-6">{STAGES.map(s => <div key={s} className="h-64 skeleton" />)}</div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-2 gap-3 xl:grid-cols-6">
            {STAGES.map((stage, ci) => {
              const cfg = CFG[stage]
              return (
                <motion.div key={stage} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ci * 0.04 }}
                  className={`rounded-xl border ${cfg.bg}`}>
                  <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.04)] px-3.5 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                      <h2 className={`text-[12px] font-semibold ${cfg.color}`}>{stage}</h2>
                    </div>
                    <span className="rounded-full bg-[rgba(0,0,0,0.04)] px-1.5 py-0.5 text-[11px] text-[#A8A29E]">{columns[stage]?.length || 0}</span>
                  </div>
                  <Droppable droppableId={stage}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}
                        className={`min-h-[160px] space-y-2 p-2.5 transition-colors ${snapshot.isDraggingOver ? "bg-[rgba(0,0,0,0.02)]" : ""}`}>
                        {columns[stage]?.map((lead, idx) => (
                          <Draggable draggableId={String(lead.id)} index={idx} key={lead.id}>
                            {(provided, snapshot) => (
                              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                className={`group rounded-xl border border-[rgba(0,0,0,0.06)] bg-white p-3.5 transition ${
                                  snapshot.isDragging ? "shadow-lg border-[#C73B2A]/30 scale-[1.02]" : "hover:border-[#C73B2A]/20"
                                }`}>
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-center gap-2.5">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#FEF2F0] text-[10px] font-semibold text-[#C73B2A]">{lead.name?.[0]}</div>
                                    <div>
                                      <p className="text-[13px] font-medium text-[#1C1917]">{lead.name}</p>
                                      {lead.company && <p className="text-[11px] text-[#A8A29E]">{lead.company}</p>}
                                    </div>
                                  </div>
                                  <Link href={`/leads/${lead.id}`} className="shrink-0 opacity-0 group-hover:opacity-100 transition"><ExternalLink size={11} className="text-[#A8A29E] hover:text-[#1C1917]" /></Link>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        {(!columns[stage] || columns[stage].length === 0) && !snapshot.isDraggingOver && (
                          <div className="flex items-center justify-center py-6 text-[11px] text-[#A8A29E]">Drop here</div>
                        )}
                      </div>
                    )}
                  </Droppable>
                </motion.div>
              )
            })}
          </div>
        </DragDropContext>
      )}
    </div>
  )
}
