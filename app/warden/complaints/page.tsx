"use client"

import { useState } from "react"
import { AlertTriangle, Clock, CheckCircle2, XCircle, Search, Filter, Send, ChevronDown, ChevronUp, MessageSquare } from "lucide-react"

type Status = "Pending" | "In Progress" | "Resolved" | "Rejected"

interface Complaint {
  id: string
  title: string
  student: string
  room: string
  category: string
  description: string
  date: string
  status: Status
  priority: "High" | "Medium" | "Low"
  response?: string
}

const statusConfig: Record<Status, { color: string; bg: string }> = {
  Pending: { color: "text-amber-600", bg: "bg-amber-50" },
  "In Progress": { color: "text-blue-600", bg: "bg-blue-50" },
  Resolved: { color: "text-emerald-600", bg: "bg-emerald-50" },
  Rejected: { color: "text-red-600", bg: "bg-red-50" },
}

const priorityConfig: Record<string, { color: string; bg: string }> = {
  High: { color: "text-red-600", bg: "bg-red-50" },
  Medium: { color: "text-amber-600", bg: "bg-amber-50" },
  Low: { color: "text-emerald-600", bg: "bg-emerald-50" },
}

const complaints: Complaint[] = [
  { id: "CMP-001", title: "Water heater not working", student: "Rahul S.", room: "A-204", category: "Electrical", description: "The geyser in the bathroom has stopped working. No hot water available since two days.", date: "Feb 10, 2025", status: "Pending", priority: "High" },
  { id: "CMP-002", title: "Broken cupboard lock", student: "Karan M.", room: "B-101", category: "Furniture", description: "The cupboard lock is broken and I cannot secure my belongings. Need immediate replacement.", date: "Feb 9, 2025", status: "In Progress", priority: "Medium", response: "Carpenter has been assigned. Will be fixed by Feb 11." },
  { id: "CMP-003", title: "Mosquito problem in Block A", student: "Vikram S.", room: "A-101", category: "Hygiene", description: "Heavy mosquito infestation on the entire 1st floor of Block A. Students are getting sick.", date: "Feb 8, 2025", status: "Pending", priority: "High" },
  { id: "CMP-004", title: "Leaking ceiling", student: "Pradeep N.", room: "B-202", category: "Plumbing", description: "Water is leaking from the ceiling when it rains. Damaging books and electronics.", date: "Feb 7, 2025", status: "In Progress", priority: "High", response: "Plumber inspected. Repair scheduled for Feb 12." },
  { id: "CMP-005", title: "Fan making noise", student: "Deepak M.", room: "A-102", category: "Electrical", description: "The ceiling fan makes a loud grinding noise. Cannot sleep at night.", date: "Feb 6, 2025", status: "Resolved", priority: "Medium", response: "Fan bearing replaced. Issue resolved." },
  { id: "CMP-006", title: "WiFi not reaching room", student: "Manish K.", room: "B-203", category: "Network", description: "WiFi signal is very weak in room B-203. Speed is less than 0.5 Mbps.", date: "Feb 5, 2025", status: "Resolved", priority: "Low", response: "WiFi extender installed on 2nd floor Block B." },
  { id: "CMP-007", title: "Bathroom door hinge broken", student: "Suresh K.", room: "A-201", category: "Furniture", description: "The bathroom door hinge is broken and the door cannot close properly.", date: "Feb 4, 2025", status: "Rejected", priority: "Low", response: "Hinge is fine, the door alignment was off. Adjusted by maintenance." },
]

export default function WardenComplaints() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [responseText, setResponseText] = useState<Record<string, string>>({})

  const filtered = complaints.filter((c) => {
    const matchStatus = filterStatus === "All" || c.status === filterStatus
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.student.toLowerCase().includes(searchQuery.toLowerCase()) || c.room.toLowerCase().includes(searchQuery.toLowerCase())
    return matchStatus && matchSearch
  })

  const stats = [
    { value: complaints.length.toString(), label: "Total", color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
    { value: complaints.filter(c => c.status === "Pending").length.toString(), label: "Pending", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
    { value: complaints.filter(c => c.status === "In Progress").length.toString(), label: "In Progress", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
    { value: complaints.filter(c => c.status === "Resolved").length.toString(), label: "Resolved", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  ]

  return (
    <div className="p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Student Complaints</h1>
        <p className="mt-1 text-sm text-muted-foreground">Review and respond to complaints from students</p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-xl border ${s.border} bg-card p-5 text-center`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by complaint, student or room..." className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {["All", "Pending", "In Progress", "Resolved", "Rejected"].map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${filterStatus === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Complaint List */}
      <div className="mt-6 space-y-4">
        {filtered.map((c) => {
          const isExpanded = expandedId === c.id
          const sc = statusConfig[c.status]
          const pc = priorityConfig[c.priority]
          return (
            <div key={c.id} className="rounded-xl border border-border bg-card overflow-hidden">
              <button onClick={() => setExpandedId(isExpanded ? null : c.id)} className="flex w-full items-center justify-between p-5 text-left">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-amber-50 p-2.5"><AlertTriangle className="h-5 w-5 text-amber-500" /></div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-foreground">{c.title}</h3>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${sc.bg} ${sc.color}`}>{c.status}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${pc.bg} ${pc.color}`}>{c.priority}</span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{c.student}</span><span>Room {c.room}</span><span>{c.category}</span><span>{c.date}</span>
                    </div>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
              </button>
              {isExpanded && (
                <div className="border-t border-border px-5 pb-5 pt-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Description</h4>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{c.description}</p>
                  </div>
                  {c.response && (
                    <div className="rounded-lg bg-muted/50 p-4">
                      <div className="flex items-center gap-2"><MessageSquare className="h-4 w-4 text-primary" /><h4 className="text-sm font-semibold text-foreground">Your Response</h4></div>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{c.response}</p>
                    </div>
                  )}
                  {(c.status === "Pending" || c.status === "In Progress") && (
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Respond to complaint</h4>
                      <textarea value={responseText[c.id] || ""} onChange={(e) => setResponseText({ ...responseText, [c.id]: e.target.value })} placeholder="Write your response..." rows={2} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
                      <div className="mt-2 flex items-center gap-2">
                        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"><Send className="h-3.5 w-3.5" />Send Response</button>
                        <button className="rounded-lg bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-600 hover:bg-emerald-100 transition-colors">Mark Resolved</button>
                        {c.status === "Pending" && <button className="rounded-lg bg-blue-50 px-4 py-2 text-xs font-medium text-blue-600 hover:bg-blue-100 transition-colors">Mark In Progress</button>}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
