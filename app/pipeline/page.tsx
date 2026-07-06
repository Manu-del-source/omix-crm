'use client'
import { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import Link from "next/link"
import { Plus, ExternalLink } from "lucide-react"

const stages = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"]
const stageConfig: Record<string, { color: string; dot: string; bg: string }> = {
  New: { color: "text-blue-400", dot: "bg-blue-400", bg: "bg-blue-500/5 border-blue-500/15" },
  Contacted: { color: "text-purple-400", dot: "bg-purple-400", bg: "bg-purple-500/5 border-purple-500/15" },
  Qualified: { color: "text-cyan-400", dot: "bg-cyan-400", bg: "bg-cyan-500/5 border-cyan-500/15" },
  Proposal: { color: "text-amber-400", dot: "bg-amber-400", bg: "bg-amber-500/5 border-amber-500/15" },
  Won: { color: "text-green-400", dot: "bg-green-400", bg: "bg-green-500/5 border-green-500/15" },
  Lost: { color: "text-red-400", dot: "bg-red-400", bg: "bg-red-500/5 border-red-500/15" },
}

export default function PipelinePage() {
  const [columns, setColumns] = useState<Record<string, any[]>>({})
  const [loading, setLoading] = useState(true)

  const fetchLeads = async () => {
    const { data, error } = await supabase.from("leads").select("*")
    if (error) { toast.error("Failed to load pipeline"); return }
    const grouped: Record<string, any[]> = {}
    stages.forEach(s => { grouped[s] = [] })
    data?.forEach(lead => { const s = lead.status || "New"; if (!grouped[s]) grouped[s] = []; grouped[s].push(lead) })
    setColumns(grouped)
    setLoading(false)
  }
  useEffect(() => { fetchLeads() }, [])

  const onDragEnd = async (result: any) => {
    const { source, destination } = result
    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return
    const srcItems = [...(columns[source.droppableId] || [])]
    const dstItems = source.droppableId === destination.droppableId ? srcItems : [...(columns[destination.droppableId] || [])]
    const [removed] = srcItems.splice(source.index, 1)
    removed.status = destination.droppableId
    dstItems.splice(destination.index, 0, removed)
    setColumns({ ...columns, [source.droppableId]: srcItems, [destination.droppableId]: dstItems })
    const { error } = await supabase.from("leads").update({ status: destination.droppableId }).eq("id", removed.id)
    if (error) { toast.error("Failed to update"); fetchLeads() }
    else toast.success(`Moved to ${destination.droppableId}`)
  }

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Sales Pipeline</h1>
          <p className="mt-1.5 text-sm text-[#737373]">Drag cards between columns to update lead status</p>
        </div>
        <Link href="/leads/new" className="flex items-center gap-2 rounded-xl bg-[#FACC15] px-4 py-2.5 text-sm font-bold text-black"><Plus size={16} /> Add Lead</Link>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-6">{stages.map(s => <div key={s} className="h-72 skeleton" />)}</div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-6">
            {stages.map((stage, ci) => {
              const cfg = stageConfig[stage]
              return (
                <motion.div key={stage} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ci * 0.05 }}
                  className={`rounded-xl border ${cfg.bg}`}>
                  <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                      <h2 className={`text-sm font-semibold ${cfg.color}`}>{stage}</h2>
                    </div>
                    <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-xs text-[#737373]">{columns[stage]?.length || 0}</span>
                  </div>
                  <Droppable droppableId={stage}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}
                        className={`min-h-[180px] space-y-2.5 p-3 transition-colors ${snapshot.isDraggingOver ? "bg-white/[0.03]" : ""}`}>
                        {columns[stage]?.map((lead, idx) => (
                          <Draggable draggableId={String(lead.id)} index={idx} key={lead.id}>
                            {(provided, snapshot) => (
                              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                className={`group rounded-xl border border-white/[0.06] bg-[#0D0D0D] p-3.5 transition ${
                                  snapshot.isDragging ? "shadow-lg shadow-amber-500/10 border-amber-500/30 scale-105" : "hover:border-amber-500/20"
                                }`}>
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-center gap-2.5">
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 text-[10px] font-semibold text-[#FACC15]">{lead.name?.[0]}</div>
                                    <div>
                                      <p className="text-sm font-medium">{lead.name}</p>
                                      {lead.company && <p className="text-xs text-[#737373]">{lead.company}</p>}
                                    </div>
                                  </div>
                                  <Link href={`/leads/${lead.id}`} className="shrink-0 opacity-0 group-hover:opacity-100 transition"><ExternalLink size={12} className="text-[#525252] hover:text-white" /></Link>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        {(!columns[stage] || columns[stage].length === 0) && !snapshot.isDraggingOver && (
                          <div className="flex items-center justify-center py-8 text-xs text-[#525252]">Drop here</div>
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
