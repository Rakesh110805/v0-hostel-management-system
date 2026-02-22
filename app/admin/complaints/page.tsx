"use client"

import { useState } from "react"
import { AlertTriangle, Search, Filter, ChevronDown, ChevronUp, Clock, CheckCircle2, XCircle, Users, Building } from "lucide-react"

type Status = "Pending" | "In Progress" | "Resolved" | "Rejected"

interface Complaint {
  id: string
  title: string
  student: string
  room: string
  block: string
  warden: string
  category: string
  description: string
  date: string
  status: Status
  priority: "High" | "Medium" | "Low"
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
  { id: "CMP-101", title: "Water heater not working", student: "Rahul Sharma", room: "A-204", block: "A", warden: "Dr. Sharma", category: "Electrical", description: "Geyser stopped working. No hot water for 2 days.", date: "Feb 10, 2025", status: "Pending", priority: "High" },
  { id: "CMP-102", title: "Broken cupboard lock", student: "Karan Malhotra", room: "B-101", block: "B", warden: "Dr. Patel", category: "Furniture", description: "Cupboard lock broken, cannot secure belongings.", date: "Feb 9, 2025", status: "In Progress", priority: "Medium" },
  { id: "CMP-103", title: "Mosquito infestation", student: "Vikram Singh", room: "A-101", block: "A", warden: "Dr. Sharma", category: "Hygiene", description: "Heavy mosquito problem on entire 1st floor.", date: "Feb 8, 2025", status: "Pending", priority: "High" },
  { id: "CMP-104", title: "Elevator not working", student: "Nikhil Tiwari", room: "C-305", block: "C", warden: "Dr. Reddy", category: "Infrastructure", description: "Block C elevator has been out of service for a week.", date: "Feb 7, 2025", status: "In Progress", priority: "High" },
  { id: "CMP-105", title: "Leaking ceiling", student: "Pradeep N.", room: "B-202", block: "B", warden: "Dr. Patel", category: "Plumbing", description: "Ceiling leaks when it rains, damaging books.", date: "Feb 7, 2025", status: "In Progress", priority: "High" },
  { id: "CMP-106", title: "Poor mess food quality", student: "Rohit Patel", room: "D-105", block: "D", warden: "Dr. Kumar", category: "Mess", description: "Food quality has deteriorated significantly this month.", date: "Feb 6, 2025", status: "Pending", priority: "Medium" },
  { id: "CMP-107", title: "WiFi connectivity issues", student: "Ananya Reddy", room: "E-202", block: "E", warden: "Dr. Singh", category: "Network", description: "WiFi is extremely slow in Block E.", date: "Feb 5, 2025", status: "Resolved", priority: "Medium" },
  { id: "CMP-108", title: "Parking area lighting", student: "Suresh Kamath", room: "D-201", block: "D", warden: "Dr. Kumar", category: "Infrastructure", description: "Parking area lights are not working, safety concern.", date: "Feb 4, 2025", status: "Resolved", priority: "Low" },
  { id: "CMP-109", title: "Common room TV broken", student: "Sneha Gupta", room: "E-310", block: "E", warden: "Dr. Singh", category: "Furniture", description: "Common room TV screen cracked, needs replacement.", date: "Feb 3, 2025", status: "Pending", priority: "Low" },
  { id: "CMP-110", title: "Drainage blockage", student: "Manish Kapoor", room: "C-203", block: "C", warden: "Dr. Reddy", category: "Plumbing", description: "Bathroom drain is completely blocked, water overflowing.", date: "Feb 2, 2025", status: "Resolved", priority: "High" },
]

export default function AdminComplaints() {
  const [filterStatus, setFilterStatus] = useState("All")
  const [filterBlock, setFilterBlock] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const stats = [
    { value: complaints.length.toString(), label: "Total", color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
    { value: complaints.filter(c => c.status === "Pending").length.toString(), label: "Pending", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
    { value: complaints.filter(c => c.status === "In Progress").length.toString(), label: "In Progress", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
    { value: complaints.filter(c => c.status === "Resolved").length.toString(), label: "Resolved", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  ]

  const filtered = complaints.filter((c) => {
    const matchStatus = filterStatus === "All" || c.status === filterStatus
    const matchBlock = filterBlock === "All" || c.block === filterBlock
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.student.toLowerCase().includes(searchQuery.toLowerCase()) || c.block.toLowerCase().includes(searchQuery.toLowerCase())
    return matchStatus && matchBlock && matchSearch
  })

  return (
    <div className="p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">All Complaints</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage complaints across all hostel blocks</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-xl border ${s.border} bg-card p-5 text-center`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search complaints..." className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {["All", "Pending", "In Progress", "Resolved"].map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${filterStatus === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{s}</button>
          ))}
          <span className="mx-1 text-muted-foreground">|</span>
          {["All", "A", "B", "C", "D", "E"].map((b) => (
            <button key={b} onClick={() => setFilterBlock(b)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${filterBlock === b ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{b === "All" ? "All" : `Block ${b}`}</button>
          ))}
        </div>
      </div>

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
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" />{c.student}</span>
                      <span className="flex items-center gap-1"><Building className="h-3 w-3" />Block {c.block}, Room {c.room}</span>
                      <span>{c.category}</span>
                      <span>{c.date}</span>
                    </div>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
              </button>
              {isExpanded && (
                <div className="border-t border-border px-5 pb-5 pt-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>Assigned Warden: <span className="font-semibold text-foreground">{c.warden}</span></span>
                  </div>
                  {(c.status === "Pending" || c.status === "In Progress") && (
                    <div className="mt-3 flex items-center gap-2">
                      <button className="rounded-lg bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-600 hover:bg-emerald-100 transition-colors">Mark Resolved</button>
                      <button className="rounded-lg bg-primary/10 px-4 py-2 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">Reassign Warden</button>
                      <button className="rounded-lg bg-red-50 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors">Escalate</button>
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
