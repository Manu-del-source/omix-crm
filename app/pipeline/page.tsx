"use client"

import { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import Link from "next/link"
import { Plus, ExternalLink } from "lucide-react"

const stages = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"]

const stageConfig: Record<string, { color: string; dot: string; bg: string }> = {
  New:       { color: "text-blue-400",   dot: "bg-blue-400",   bg: "bg-blue-500/10 border-blue-500/20" },
  Contacted: { color: "text-purple-400", dot: "bg-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  Qualified: { color: "text-cyan-400",   dot: "bg-cyan-400",   bg: "bg-cyan-500/10 border-cyan-500/20" },
  Proposal:  { color: "text-orange-400", dot: "bg-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  Won:       { color: "text-green-400",  dot: "bg-green-400",  bg: "bg-green-500/10 border-green-500/20" },
  Lost:      { color: "text-red-400",    dot: "bg-red-400",    bg: "bg-red-500/10 border-red-500/20" },
}

export default function PipelinePage() {
  const [columns, setColumns] = useState<Record<string, any[]>>({})
  const [loading, setLoading] = useState(true)

  const fetchLeads = async () => {
    const { data, error } = await supabase.from("leads").select("*")
    if (error) { toast.error("Failed to load pipeline"); return }

    const grouped: Record<string, any[]> = {}
    stages.forEach((s) => { grouped[s] = [] })
    data?.forEach((lead) => {
      const s = lead.status || "New"
      if (!grouped[s]) grouped[s] = []
      grouped[s].push(lead)
    })
    setColumns(grouped)
    setLoading(false)
  }

  useEffect(() => { fetchLeads() }, [])

  const onDragEnd = async (result: any) => {
    const { source, destination } = result
    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    const srcItems = [...(columns[source.droppableId] || [])]
    const dstItems = source.droppableId === destination.droppableId
      ? srcItems
      : [...(columns[destination.droppableId] || [])]

    const [removed] = srcItems.splice(source.index, 1)
    removed.status = destination.droppableId
    dstItems.splice(destination.index, 0, removed)

    setColumns({
      ...columns,
      [source.droppableId]: srcItems,
      [destination.droppableId]: dstItems,
    })

    const { error } = await supabase.from("leads").update({ status: destination.droppableId }).eq("id", removed.id)
    if (error) { toast.error("Failed to update"); fetchLeads() }
    else toast.success(`Moved to ${destination.droppableId}`)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6 text-white">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Sales Pipeline
          </h1>
          <p className="mt-2 text-zinc-400">Drag cards between columns to update lead status</p>
        </div>
        <Link href="/leads/new"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-blue-500 px-5 py-3 text-sm font-semibold transition hover:opacity-90">
          <Plus size={16} /> Add Lead
        </Link>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-6">
          {stages.map((s) => <div key={s} className="h-80 rounded-2xl skeleton" />)}
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-6">
            {stages.map((stage, colIdx) => {
              const cfg = stageConfig[stage]
              return (
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: colIdx * 0.06 }}
                  className={`rounded-2xl border ${cfg.bg}`}
                >
                  <div className="p-4 border-b border-white/[0.06]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${cfg.dot} live-dot`} />
                        <h2 className={`text-sm font-semibold ${cfg.color}`}>{stage}</h2>
                      </div>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-zinc-400">
                        {columns[stage]?.length || 0}
                      </span>
                    </div>
                  </div>

                  <Droppable droppableId={stage}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-[200px] space-y-3 p-3 transition-colors ${snapshot.isDraggingOver ? "bg-[#111111]" : ""}`}
                      >
                        {columns[stage]?.map((lead, idx) => (
                          <Draggable draggableId={String(lead.id)} index={idx} key={lead.id}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`group rounded-xl border border-white/[0.06] bg-[#0A0A0A]/60 p-3 transition ${
                                  snapshot.isDragging ? "shadow-lg shadow-orange-500/10 border-orange-500/30 scale-105" : "hover:border-orange-500/30"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-1">
                                  <h3 className="text-sm font-medium leading-snug">{lead.name}</h3>
                                  <Link href={`/leads/${lead.id}`} className="shrink-0 opacity-0 group-hover:opacity-100 transition">
                                    <ExternalLink size={12} className="text-zinc-500 hover:text-white" />
                                  </Link>
                                </div>
                                {lead.company && <p className="mt-1 text-xs text-zinc-500">{lead.company}</p>}
                                {lead.email && <p className="mt-2 text-xs text-zinc-600 truncate">{lead.email}</p>}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        {(!columns[stage] || columns[stage].length === 0) && !snapshot.isDraggingOver && (
                          <div className="flex items-center justify-center py-8 text-xs text-zinc-700">
                            Drop here
                          </div>
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
