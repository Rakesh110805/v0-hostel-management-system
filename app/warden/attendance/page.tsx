"use client"

import { useState } from "react"
import { ClipboardList, CheckCircle2, XCircle, Clock, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"

interface AttendanceRecord {
  id: string
  name: string
  room: string
  block: string
  status: "Present" | "Absent" | "Leave"
}

const allStudents: AttendanceRecord[] = [
  { id: "STU001", name: "Rahul S.", room: "A-204", block: "A", status: "Present" },
  { id: "STU002", name: "Arjun K.", room: "A-204", block: "A", status: "Present" },
  { id: "STU003", name: "Priya M.", room: "B-115", block: "B", status: "Present" },
  { id: "STU004", name: "Vikram S.", room: "A-101", block: "A", status: "Absent" },
  { id: "STU005", name: "Deepak M.", room: "A-102", block: "A", status: "Present" },
  { id: "STU006", name: "Karan M.", room: "B-101", block: "B", status: "Present" },
  { id: "STU007", name: "Nikhil T.", room: "B-101", block: "B", status: "Leave" },
  { id: "STU008", name: "Suresh K.", room: "A-201", block: "A", status: "Present" },
  { id: "STU009", name: "Manish K.", room: "B-203", block: "B", status: "Absent" },
  { id: "STU010", name: "Pradeep N.", room: "B-202", block: "B", status: "Present" },
  { id: "STU011", name: "Gaurav S.", room: "B-202", block: "B", status: "Present" },
  { id: "STU012", name: "Harsh V.", room: "B-202", block: "B", status: "Present" },
  { id: "STU013", name: "Mohan R.", room: "A-201", block: "A", status: "Present" },
  { id: "STU014", name: "Ankit J.", room: "A-202", block: "A", status: "Present" },
  { id: "STU015", name: "Vishal D.", room: "A-202", block: "A", status: "Absent" },
  { id: "STU016", name: "Rohit P.", room: "B-203", block: "B", status: "Present" },
  { id: "STU017", name: "Ravi B.", room: "B-101", block: "B", status: "Present" },
  { id: "STU018", name: "Sanjay L.", room: "B-102", block: "B", status: "Leave" },
  { id: "STU019", name: "Amit G.", room: "B-102", block: "B", status: "Present" },
  { id: "STU020", name: "Raj P.", room: "A-101", block: "A", status: "Present" },
]

const statusConfig = {
  Present: { color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle2 },
  Absent: { color: "text-red-600", bg: "bg-red-50", icon: XCircle },
  Leave: { color: "text-amber-600", bg: "bg-amber-50", icon: Clock },
}

const dates = ["Feb 8", "Feb 9", "Feb 10", "Feb 11", "Feb 12"]

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState("Feb 12")
  const [filterBlock, setFilterBlock] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const present = allStudents.filter(s => s.status === "Present").length
  const absent = allStudents.filter(s => s.status === "Absent").length
  const onLeave = allStudents.filter(s => s.status === "Leave").length

  const filtered = allStudents.filter((s) => {
    const matchBlock = filterBlock === "All" || s.block === filterBlock
    const matchStatus = filterStatus === "All" || s.status === filterStatus
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.room.toLowerCase().includes(searchQuery.toLowerCase())
    return matchBlock && matchStatus && matchSearch
  })

  return (
    <div className="p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Attendance Tracking</h1>
        <p className="mt-1 text-sm text-muted-foreground">Monitor and record daily student attendance</p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="flex items-center gap-4 rounded-xl border border-primary/20 bg-card p-5">
          <div className="rounded-lg bg-primary/10 p-2.5"><ClipboardList className="h-5 w-5 text-primary" /></div>
          <div><p className="text-2xl font-bold text-foreground">{allStudents.length}</p><p className="text-sm text-muted-foreground">Total Students</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-emerald-200 bg-card p-5">
          <div className="rounded-lg bg-emerald-50 p-2.5"><CheckCircle2 className="h-5 w-5 text-emerald-600" /></div>
          <div><p className="text-2xl font-bold text-foreground">{present}</p><p className="text-sm text-muted-foreground">Present</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-red-200 bg-card p-5">
          <div className="rounded-lg bg-red-50 p-2.5"><XCircle className="h-5 w-5 text-red-600" /></div>
          <div><p className="text-2xl font-bold text-foreground">{absent}</p><p className="text-sm text-muted-foreground">Absent</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-amber-200 bg-card p-5">
          <div className="rounded-lg bg-amber-50 p-2.5"><Clock className="h-5 w-5 text-amber-600" /></div>
          <div><p className="text-2xl font-bold text-foreground">{onLeave}</p><p className="text-sm text-muted-foreground">On Leave</p></div>
        </div>
      </div>

      {/* Date Selector */}
      <div className="mt-6 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"><ChevronLeft className="h-5 w-5" /></button>
          <div className="flex gap-2">
            {dates.map((d) => (
              <button key={d} onClick={() => setSelectedDate(d)} className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${selectedDate === d ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>{d}</button>
            ))}
          </div>
          <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search students..." className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {["All", "A", "B"].map((b) => (
            <button key={b} onClick={() => setFilterBlock(b)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${filterBlock === b ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{b === "All" ? "All" : `Block ${b}`}</button>
          ))}
          <span className="mx-1 text-muted-foreground">|</span>
          {["All", "Present", "Absent", "Leave"].map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${filterStatus === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Attendance List */}
      <div className="mt-4 rounded-xl border border-border bg-card overflow-hidden">
        <div className="grid grid-cols-5 gap-4 border-b border-border bg-muted/50 px-5 py-3 text-xs font-semibold text-muted-foreground">
          <span>Student</span>
          <span>ID</span>
          <span>Room</span>
          <span>Block</span>
          <span>Status</span>
        </div>
        <div className="divide-y divide-border">
          {filtered.map((student) => {
            const sc = statusConfig[student.status]
            const StatusIcon = sc.icon
            return (
              <div key={student.id} className="grid grid-cols-5 gap-4 px-5 py-3.5 items-center">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{student.name.split(" ").map(n => n[0]).join("")}</div>
                  <span className="text-sm font-medium text-foreground">{student.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{student.id}</span>
                <span className="text-sm text-muted-foreground">{student.room}</span>
                <span className="text-sm text-muted-foreground">Block {student.block}</span>
                <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${sc.bg} ${sc.color}`}>
                  <StatusIcon className="h-3 w-3" />
                  {student.status}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
