"use client"

import { useState } from "react"
import { Users, Search, Filter, Download, Plus, Phone, Mail, ChevronDown, ChevronUp, Home, GraduationCap } from "lucide-react"

interface Student {
  id: string
  name: string
  room: string
  block: string
  course: string
  year: string
  phone: string
  email: string
  attendance: number
  feeStatus: "Paid" | "Pending" | "Overdue"
  feeDue: string
  admissionDate: string
}

const students: Student[] = [
  { id: "STU001", name: "Rahul Sharma", room: "A-204", block: "A", course: "B.Tech CSE", year: "3rd", phone: "9876543210", email: "rahul@college.edu", attendance: 92, feeStatus: "Pending", feeDue: "12,500", admissionDate: "Aug 2023" },
  { id: "STU002", name: "Arjun Kumar", room: "A-204", block: "A", course: "B.Tech ECE", year: "3rd", phone: "9876543211", email: "arjun@college.edu", attendance: 88, feeStatus: "Paid", feeDue: "0", admissionDate: "Aug 2023" },
  { id: "STU003", name: "Priya Mishra", room: "E-115", block: "E", course: "B.Tech CSE", year: "2nd", phone: "9876543212", email: "priya@college.edu", attendance: 95, feeStatus: "Paid", feeDue: "0", admissionDate: "Aug 2024" },
  { id: "STU004", name: "Vikram Singh", room: "A-101", block: "A", course: "B.Tech ME", year: "4th", phone: "9876543213", email: "vikram@college.edu", attendance: 78, feeStatus: "Overdue", feeDue: "25,000", admissionDate: "Aug 2022" },
  { id: "STU005", name: "Deepak Mehta", room: "B-102", block: "B", course: "BCA", year: "1st", phone: "9876543214", email: "deepak@college.edu", attendance: 85, feeStatus: "Paid", feeDue: "0", admissionDate: "Aug 2025" },
  { id: "STU006", name: "Karan Malhotra", room: "B-101", block: "B", course: "B.Tech CSE", year: "2nd", phone: "9876543215", email: "karan@college.edu", attendance: 91, feeStatus: "Pending", feeDue: "12,500", admissionDate: "Aug 2024" },
  { id: "STU007", name: "Nikhil Tiwari", room: "C-305", block: "C", course: "B.Tech IT", year: "3rd", phone: "9876543216", email: "nikhil@college.edu", attendance: 82, feeStatus: "Paid", feeDue: "0", admissionDate: "Aug 2023" },
  { id: "STU008", name: "Suresh Kamath", room: "D-201", block: "D", course: "B.Tech EE", year: "2nd", phone: "9876543217", email: "suresh@college.edu", attendance: 90, feeStatus: "Paid", feeDue: "0", admissionDate: "Aug 2024" },
  { id: "STU009", name: "Manish Kapoor", room: "C-203", block: "C", course: "MCA", year: "1st", phone: "9876543218", email: "manish@college.edu", attendance: 76, feeStatus: "Overdue", feeDue: "30,000", admissionDate: "Aug 2025" },
  { id: "STU010", name: "Ananya Reddy", room: "E-202", block: "E", course: "B.Tech CSE", year: "4th", phone: "9876543219", email: "ananya@college.edu", attendance: 94, feeStatus: "Paid", feeDue: "0", admissionDate: "Aug 2022" },
  { id: "STU011", name: "Rohit Patel", room: "D-105", block: "D", course: "B.Tech CE", year: "1st", phone: "9876543220", email: "rohit@college.edu", attendance: 87, feeStatus: "Pending", feeDue: "12,500", admissionDate: "Aug 2025" },
  { id: "STU012", name: "Sneha Gupta", room: "E-310", block: "E", course: "B.Sc Physics", year: "2nd", phone: "9876543221", email: "sneha@college.edu", attendance: 93, feeStatus: "Paid", feeDue: "0", admissionDate: "Aug 2024" },
]

const feeColors: Record<string, { color: string; bg: string }> = {
  Paid: { color: "text-emerald-600", bg: "bg-emerald-50" },
  Pending: { color: "text-amber-600", bg: "bg-amber-50" },
  Overdue: { color: "text-red-600", bg: "bg-red-50" },
}

export default function AdminStudents() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBlock, setFilterBlock] = useState("All")
  const [filterFee, setFilterFee] = useState("All")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = students.filter((s) => {
    const matchBlock = filterBlock === "All" || s.block === filterBlock
    const matchFee = filterFee === "All" || s.feeStatus === filterFee
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase()) || s.room.toLowerCase().includes(searchQuery.toLowerCase())
    return matchBlock && matchFee && matchSearch
  })

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Student Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">View and manage all hostel students across blocks</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"><Download className="h-4 w-4" />Export</button>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"><Plus className="h-4 w-4" />Add Student</button>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="flex items-center gap-4 rounded-xl border border-primary/20 bg-card p-5">
          <div className="rounded-lg bg-primary/10 p-2.5"><Users className="h-5 w-5 text-primary" /></div>
          <div><p className="text-2xl font-bold text-foreground">1,247</p><p className="text-sm text-muted-foreground">Total Students</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-emerald-200 bg-card p-5">
          <div className="rounded-lg bg-emerald-50 p-2.5"><GraduationCap className="h-5 w-5 text-emerald-600" /></div>
          <div><p className="text-2xl font-bold text-foreground">88%</p><p className="text-sm text-muted-foreground">Avg Attendance</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-amber-200 bg-card p-5">
          <div className="rounded-lg bg-amber-50 p-2.5"><Users className="h-5 w-5 text-amber-600" /></div>
          <div><p className="text-2xl font-bold text-foreground">89</p><p className="text-sm text-muted-foreground">Fee Pending</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-red-200 bg-card p-5">
          <div className="rounded-lg bg-red-50 p-2.5"><Users className="h-5 w-5 text-red-600" /></div>
          <div><p className="text-2xl font-bold text-foreground">38</p><p className="text-sm text-muted-foreground">Fee Overdue</p></div>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by name, ID or room..." className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {["All", "A", "B", "C", "D", "E"].map((b) => (
            <button key={b} onClick={() => setFilterBlock(b)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${filterBlock === b ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{b === "All" ? "All" : `Block ${b}`}</button>
          ))}
          <span className="mx-1 text-muted-foreground">|</span>
          {["All", "Paid", "Pending", "Overdue"].map((f) => (
            <button key={f} onClick={() => setFilterFee(f)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${filterFee === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{f}</button>
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
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{student.name.split(" ").map(n => n[0]).join("")}</div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-bold text-foreground">{student.name}</h3>
                      <span className="text-xs text-muted-foreground">{student.id}</span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Home className="h-3 w-3" />{student.room} (Block {student.block})</span>
                      <span>{student.course} - {student.year} Year</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className={`text-xs font-medium ${student.attendance >= 85 ? "text-emerald-600" : student.attendance >= 75 ? "text-amber-600" : "text-red-600"}`}>{student.attendance}%</p>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${fc.bg} ${fc.color}`}>{student.feeStatus}{student.feeStatus !== "Paid" ? ` \u20B9${student.feeDue}` : ""}</span>
                  </div>
                  {isExpanded ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                </div>
              </button>
              {isExpanded && (
                <div className="border-t border-border px-5 pb-5 pt-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                    <div><p className="text-xs font-semibold text-muted-foreground">Contact</p><p className="mt-1 flex items-center gap-2 text-sm text-foreground"><Phone className="h-3.5 w-3.5 text-muted-foreground" />{student.phone}</p><p className="mt-0.5 flex items-center gap-2 text-sm text-foreground"><Mail className="h-3.5 w-3.5 text-muted-foreground" />{student.email}</p></div>
                    <div><p className="text-xs font-semibold text-muted-foreground">Admission</p><p className="mt-1 text-sm text-foreground">{student.admissionDate}</p></div>
                    <div><p className="text-xs font-semibold text-muted-foreground">Attendance</p><p className="mt-1 text-sm text-foreground">{student.attendance}%</p></div>
                    <div><p className="text-xs font-semibold text-muted-foreground">Fee Status</p><p className="mt-1"><span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${fc.bg} ${fc.color}`}>{student.feeStatus}{student.feeStatus !== "Paid" ? ` - \u20B9${student.feeDue}` : ""}</span></p></div>
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
