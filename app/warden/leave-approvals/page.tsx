"use client"

import { useState } from "react"
import { CalendarCheck, CheckCircle2, Clock, XCircle, Calendar, ChevronRight, Filter, Search } from "lucide-react"

type LeaveStatus = "Pending" | "Approved" | "Rejected"

interface LeaveRequest {
  id: string
  student: string
  room: string
  type: string
  reason: string
  from: string
  to: string
  days: number
  appliedOn: string
  status: LeaveStatus
  parentApproval: boolean
}

const statusConfig: Record<LeaveStatus, { color: string; bg: string }> = {
  Pending: { color: "text-amber-600", bg: "bg-amber-50" },
  Approved: { color: "text-emerald-600", bg: "bg-emerald-50" },
  Rejected: { color: "text-red-600", bg: "bg-red-50" },
}

const leaveRequests: LeaveRequest[] = [
  { id: "LV-001", student: "Rahul S.", room: "A-204", type: "Medical", reason: "Doctor appointment for regular checkup", from: "Feb 12, 2025", to: "Feb 12, 2025", days: 1, appliedOn: "Feb 10, 2025", status: "Pending", parentApproval: true },
  { id: "LV-002", student: "Priya M.", room: "B-115", type: "Family", reason: "Family function - Brother's engagement", from: "Feb 14, 2025", to: "Feb 16, 2025", days: 3, appliedOn: "Feb 9, 2025", status: "Pending", parentApproval: true },
  { id: "LV-003", student: "Arjun K.", room: "A-204", type: "Personal", reason: "Personal work - Bank account opening", from: "Feb 13, 2025", to: "Feb 14, 2025", days: 2, appliedOn: "Feb 8, 2025", status: "Pending", parentApproval: false },
  { id: "LV-004", student: "Vikram S.", room: "A-101", type: "Home Visit", reason: "Semester break visit to hometown", from: "Feb 20, 2025", to: "Feb 24, 2025", days: 5, appliedOn: "Feb 7, 2025", status: "Pending", parentApproval: true },
  { id: "LV-005", student: "Karan M.", room: "B-101", type: "Medical", reason: "Dental surgery scheduled at hospital", from: "Feb 15, 2025", to: "Feb 17, 2025", days: 3, appliedOn: "Feb 6, 2025", status: "Pending", parentApproval: true },
  { id: "LV-006", student: "Deepak M.", room: "A-102", type: "Home Visit", reason: "Family function - Sister's wedding", from: "Feb 5, 2025", to: "Feb 8, 2025", days: 4, appliedOn: "Jan 28, 2025", status: "Approved", parentApproval: true },
  { id: "LV-007", student: "Suresh K.", room: "A-201", type: "Emergency", reason: "Grandfather hospitalized", from: "Feb 1, 2025", to: "Feb 3, 2025", days: 3, appliedOn: "Feb 1, 2025", status: "Approved", parentApproval: true },
  { id: "LV-008", student: "Manish K.", room: "B-203", type: "Personal", reason: "Internship interview in Bangalore", from: "Feb 3, 2025", to: "Feb 3, 2025", days: 1, appliedOn: "Jan 30, 2025", status: "Rejected", parentApproval: false },
]

export default function LeaveApprovalsPage() {
  const [filterStatus, setFilterStatus] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const pending = leaveRequests.filter(l => l.status === "Pending").length
  const approved = leaveRequests.filter(l => l.status === "Approved").length
  const rejected = leaveRequests.filter(l => l.status === "Rejected").length

  const filtered = leaveRequests.filter((l) => {
    const matchStatus = filterStatus === "All" || l.status === filterStatus
    const matchSearch = l.student.toLowerCase().includes(searchQuery.toLowerCase()) || l.type.toLowerCase().includes(searchQuery.toLowerCase()) || l.room.toLowerCase().includes(searchQuery.toLowerCase())
    return matchStatus && matchSearch
  })

  return (
    <div className="p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Leave Approvals</h1>
        <p className="mt-1 text-sm text-muted-foreground">Review and approve student leave requests</p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl border border-amber-200 bg-card p-5">
          <div className="rounded-lg bg-amber-50 p-2.5"><Clock className="h-5 w-5 text-amber-600" /></div>
          <div><p className="text-2xl font-bold text-foreground">{pending}</p><p className="text-sm text-muted-foreground">Pending</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-emerald-200 bg-card p-5">
          <div className="rounded-lg bg-emerald-50 p-2.5"><CheckCircle2 className="h-5 w-5 text-emerald-600" /></div>
          <div><p className="text-2xl font-bold text-foreground">{approved}</p><p className="text-sm text-muted-foreground">Approved</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-red-200 bg-card p-5">
          <div className="rounded-lg bg-red-50 p-2.5"><XCircle className="h-5 w-5 text-red-600" /></div>
          <div><p className="text-2xl font-bold text-foreground">{rejected}</p><p className="text-sm text-muted-foreground">Rejected</p></div>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by student, type or room..." className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {["All", "Pending", "Approved", "Rejected"].map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${filterStatus === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Leave List */}
      <div className="mt-6 space-y-4">
        {filtered.map((leave) => {
          const sc = statusConfig[leave.status]
          return (
            <div key={leave.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{leave.student.split(" ").map(n => n[0]).join("")}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-foreground">{leave.student}</h3>
                        <span className="text-xs text-muted-foreground">Room {leave.room}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{leave.type}</span>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${sc.bg} ${sc.color}`}>{leave.status}</span>
                        {leave.parentApproval && <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600">Parent Approved</span>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Applied on</p>
                  <p className="text-sm font-medium text-foreground">{leave.appliedOn}</p>
                </div>
              </div>

              <p className="mt-3 text-sm text-muted-foreground">{leave.reason}</p>

              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" /><span>{leave.from}</span><ChevronRight className="h-4 w-4" /><Calendar className="h-4 w-4" /><span>{leave.to}</span>
                <span className="text-muted-foreground">({leave.days} {leave.days === 1 ? "day" : "days"})</span>
              </div>

              {leave.status === "Pending" && (
                <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                  <button className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white hover:bg-emerald-700 transition-colors"><CheckCircle2 className="h-3.5 w-3.5" />Approve</button>
                  <button className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700 transition-colors"><XCircle className="h-3.5 w-3.5" />Reject</button>
                  <input placeholder="Add a note (optional)..." className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
