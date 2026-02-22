"use client"

import { useState } from "react"
import { Users, Search, Filter, Phone, Mail, ChevronDown, ChevronUp, Home, GraduationCap } from "lucide-react"

interface Student {
  id: string
  name: string
  room: string
  block: string
  course: string
  year: string
  phone: string
  email: string
  parentPhone: string
  attendance: number
  feeStatus: "Paid" | "Pending" | "Overdue"
  feeAmount: string
}

const students: Student[] = [
  { id: "STU001", name: "Rahul S.", room: "A-204", block: "A", course: "B.Tech CSE", year: "3rd Year", phone: "9876543210", email: "rahul@college.edu", parentPhone: "9876543200", attendance: 92, feeStatus: "Pending", feeAmount: "12,500" },
  { id: "STU002", name: "Arjun K.", room: "A-204", block: "A", course: "B.Tech ECE", year: "3rd Year", phone: "9876543211", email: "arjun@college.edu", parentPhone: "9876543201", attendance: 88, feeStatus: "Paid", feeAmount: "0" },
  { id: "STU003", name: "Priya M.", room: "B-115", block: "B", course: "B.Tech CSE", year: "2nd Year", phone: "9876543212", email: "priya@college.edu", parentPhone: "9876543202", attendance: 95, feeStatus: "Paid", feeAmount: "0" },
  { id: "STU004", name: "Vikram S.", room: "A-101", block: "A", course: "B.Tech ME", year: "4th Year", phone: "9876543213", email: "vikram@college.edu", parentPhone: "9876543203", attendance: 78, feeStatus: "Overdue", feeAmount: "25,000" },
  { id: "STU005", name: "Deepak M.", room: "A-102", block: "A", course: "BCA", year: "1st Year", phone: "9876543214", email: "deepak@college.edu", parentPhone: "9876543204", attendance: 85, feeStatus: "Paid", feeAmount: "0" },
  { id: "STU006", name: "Karan M.", room: "B-101", block: "B", course: "B.Tech CSE", year: "2nd Year", phone: "9876543215", email: "karan@college.edu", parentPhone: "9876543205", attendance: 91, feeStatus: "Pending", feeAmount: "12,500" },
  { id: "STU007", name: "Nikhil T.", room: "B-101", block: "B", course: "B.Tech IT", year: "3rd Year", phone: "9876543216", email: "nikhil@college.edu", parentPhone: "9876543206", attendance: 82, feeStatus: "Paid", feeAmount: "0" },
  { id: "STU008", name: "Suresh K.", room: "A-201", block: "A", course: "B.Tech EE", year: "2nd Year", phone: "9876543217", email: "suresh@college.edu", parentPhone: "9876543207", attendance: 90, feeStatus: "Paid", feeAmount: "0" },
  { id: "STU009", name: "Manish K.", room: "B-203", block: "B", course: "MCA", year: "1st Year", phone: "9876543218", email: "manish@college.edu", parentPhone: "9876543208", attendance: 76, feeStatus: "Overdue", feeAmount: "30,000" },
  { id: "STU010", name: "Pradeep N.", room: "B-202", block: "B", course: "B.Tech CSE", year: "4th Year", phone: "9876543219", email: "pradeep@college.edu", parentPhone: "9876543209", attendance: 94, feeStatus: "Paid", feeAmount: "0" },
]

const feeColors: Record<string, { color: string; bg: string }> = {
  Paid: { color: "text-emerald-600", bg: "bg-emerald-50" },
  Pending: { color: "text-amber-600", bg: "bg-amber-50" },
  Overdue: { color: "text-red-600", bg: "bg-red-50" },
}

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBlock, setFilterBlock] = useState("All")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = students.filter((s) => {
    const matchBlock = filterBlock === "All" || s.block === filterBlock
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase()) || s.room.toLowerCase().includes(searchQuery.toLowerCase())
    return matchBlock && matchSearch
  })

  return (
    <div className="p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Student Details</h1>
        <p className="mt-1 text-sm text-muted-foreground">View and manage all students in your hostel</p>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="flex items-center gap-4 rounded-xl border border-primary/20 bg-card p-5">
          <div className="rounded-lg bg-primary/10 p-2.5"><Users className="h-5 w-5 text-primary" /></div>
          <div>
            <p className="text-2xl font-bold text-foreground">248</p>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-emerald-200 bg-card p-5">
          <div className="rounded-lg bg-emerald-50 p-2.5"><GraduationCap className="h-5 w-5 text-emerald-600" /></div>
          <div>
            <p className="text-2xl font-bold text-foreground">89%</p>
            <p className="text-sm text-muted-foreground">Avg Attendance</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-amber-200 bg-card p-5">
          <div className="rounded-lg bg-amber-50 p-2.5"><Users className="h-5 w-5 text-amber-600" /></div>
          <div>
            <p className="text-2xl font-bold text-foreground">15</p>
            <p className="text-sm text-muted-foreground">Fee Pending</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-red-200 bg-card p-5">
          <div className="rounded-lg bg-red-50 p-2.5"><Users className="h-5 w-5 text-red-600" /></div>
          <div>
            <p className="text-2xl font-bold text-foreground">5</p>
            <p className="text-sm text-muted-foreground">Fee Overdue</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by name, ID or room..." className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {["All", "A", "B"].map((b) => (
            <button key={b} onClick={() => setFilterBlock(b)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${filterBlock === b ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{b === "All" ? "All Blocks" : `Block ${b}`}</button>
          ))}
        </div>
      </div>

      {/* Student List */}
      <div className="mt-6 space-y-3">
        {filtered.map((student) => {
          const isExpanded = expandedId === student.id
          const fc = feeColors[student.feeStatus]
          return (
            <div key={student.id} className="rounded-xl border border-border bg-card overflow-hidden">
              <button onClick={() => setExpandedId(isExpanded ? null : student.id)} className="flex w-full items-center justify-between p-5 text-left">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {student.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-bold text-foreground">{student.name}</h3>
                      <span className="text-xs text-muted-foreground">{student.id}</span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Home className="h-3 w-3" />Room {student.room}</span>
                      <span>{student.course} - {student.year}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className={`text-xs font-medium ${student.attendance >= 85 ? "text-emerald-600" : student.attendance >= 75 ? "text-amber-600" : "text-red-600"}`}>{student.attendance}% attendance</p>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${fc.bg} ${fc.color}`}>{student.feeStatus}</span>
                  </div>
                  {isExpanded ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                </div>
              </button>
              {isExpanded && (
                <div className="border-t border-border px-5 pb-5 pt-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground">Contact Info</p>
                      <div className="mt-2 space-y-1.5">
                        <p className="flex items-center gap-2 text-sm text-foreground"><Phone className="h-3.5 w-3.5 text-muted-foreground" />{student.phone}</p>
                        <p className="flex items-center gap-2 text-sm text-foreground"><Mail className="h-3.5 w-3.5 text-muted-foreground" />{student.email}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground">Parent Contact</p>
                      <div className="mt-2">
                        <p className="flex items-center gap-2 text-sm text-foreground"><Phone className="h-3.5 w-3.5 text-muted-foreground" />{student.parentPhone}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground">Fee Details</p>
                      <div className="mt-2">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${fc.bg} ${fc.color}`}>{student.feeStatus}{student.feeStatus !== "Paid" ? ` - \u20B9${student.feeAmount}` : ""}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
