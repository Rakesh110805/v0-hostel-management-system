"use client"

import { useState } from "react"
import { CreditCard, IndianRupee, Search, Filter, Download, TrendingUp, Clock, CheckCircle2, AlertTriangle } from "lucide-react"

interface FeeRecord {
  id: string
  student: string
  studentId: string
  room: string
  block: string
  amount: string
  amountNum: number
  dueDate: string
  paidDate: string | null
  status: "Paid" | "Pending" | "Overdue"
  method: string | null
  semester: string
}

const records: FeeRecord[] = [
  { id: "FEE-001", student: "Rahul Sharma", studentId: "STU001", room: "A-204", block: "A", amount: "25,000", amountNum: 25000, dueDate: "Feb 15, 2025", paidDate: "Feb 10, 2025", status: "Paid", method: "UPI", semester: "Spring 2025" },
  { id: "FEE-002", student: "Vikram Singh", studentId: "STU004", room: "A-101", block: "A", amount: "25,000", amountNum: 25000, dueDate: "Jan 15, 2025", paidDate: null, status: "Overdue", method: null, semester: "Spring 2025" },
  { id: "FEE-003", student: "Priya Mishra", studentId: "STU003", room: "E-115", block: "E", amount: "22,000", amountNum: 22000, dueDate: "Feb 15, 2025", paidDate: "Feb 5, 2025", status: "Paid", method: "Net Banking", semester: "Spring 2025" },
  { id: "FEE-004", student: "Karan Malhotra", studentId: "STU006", room: "B-101", block: "B", amount: "25,000", amountNum: 25000, dueDate: "Feb 15, 2025", paidDate: null, status: "Pending", method: null, semester: "Spring 2025" },
  { id: "FEE-005", student: "Manish Kapoor", studentId: "STU009", room: "C-203", block: "C", amount: "30,000", amountNum: 30000, dueDate: "Jan 15, 2025", paidDate: null, status: "Overdue", method: null, semester: "Spring 2025" },
  { id: "FEE-006", student: "Deepak Mehta", studentId: "STU005", room: "B-102", block: "B", amount: "25,000", amountNum: 25000, dueDate: "Feb 15, 2025", paidDate: "Jan 28, 2025", status: "Paid", method: "Card", semester: "Spring 2025" },
  { id: "FEE-007", student: "Nikhil Tiwari", studentId: "STU007", room: "C-305", block: "C", amount: "25,000", amountNum: 25000, dueDate: "Feb 15, 2025", paidDate: "Feb 8, 2025", status: "Paid", method: "UPI", semester: "Spring 2025" },
  { id: "FEE-008", student: "Ananya Reddy", studentId: "STU010", room: "E-202", block: "E", amount: "22,000", amountNum: 22000, dueDate: "Feb 15, 2025", paidDate: "Feb 12, 2025", status: "Paid", method: "Net Banking", semester: "Spring 2025" },
  { id: "FEE-009", student: "Rohit Patel", studentId: "STU011", room: "D-105", block: "D", amount: "25,000", amountNum: 25000, dueDate: "Feb 15, 2025", paidDate: null, status: "Pending", method: null, semester: "Spring 2025" },
  { id: "FEE-010", student: "Sneha Gupta", studentId: "STU012", room: "E-310", block: "E", amount: "22,000", amountNum: 22000, dueDate: "Feb 15, 2025", paidDate: "Feb 1, 2025", status: "Paid", method: "UPI", semester: "Spring 2025" },
]

const feeColors: Record<string, { color: string; bg: string }> = {
  Paid: { color: "text-emerald-600", bg: "bg-emerald-50" },
  Pending: { color: "text-amber-600", bg: "bg-amber-50" },
  Overdue: { color: "text-red-600", bg: "bg-red-50" },
}

export default function AdminFees() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [filterBlock, setFilterBlock] = useState("All")

  const totalCollected = records.filter(r => r.status === "Paid").reduce((sum, r) => sum + r.amountNum, 0)
  const totalPending = records.filter(r => r.status === "Pending").reduce((sum, r) => sum + r.amountNum, 0)
  const totalOverdue = records.filter(r => r.status === "Overdue").reduce((sum, r) => sum + r.amountNum, 0)

  const filtered = records.filter((r) => {
    const matchStatus = filterStatus === "All" || r.status === filterStatus
    const matchBlock = filterBlock === "All" || r.block === filterBlock
    const matchSearch = r.student.toLowerCase().includes(searchQuery.toLowerCase()) || r.studentId.toLowerCase().includes(searchQuery.toLowerCase())
    return matchStatus && matchBlock && matchSearch
  })

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fee Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">Track and manage hostel fee collection</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"><Download className="h-4 w-4" />Export Report</button>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="flex items-center gap-4 rounded-xl border border-primary/20 bg-card p-5">
          <div className="rounded-lg bg-primary/10 p-2.5"><IndianRupee className="h-5 w-5 text-primary" /></div>
          <div><p className="text-2xl font-bold text-foreground">{"\u20B9"}48.5L</p><p className="text-sm text-muted-foreground">Total Expected</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-emerald-200 bg-card p-5">
          <div className="rounded-lg bg-emerald-50 p-2.5"><CheckCircle2 className="h-5 w-5 text-emerald-600" /></div>
          <div><p className="text-2xl font-bold text-foreground">{"\u20B9"}{(totalCollected / 1000).toFixed(0)}K</p><p className="text-sm text-muted-foreground">Collected</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-amber-200 bg-card p-5">
          <div className="rounded-lg bg-amber-50 p-2.5"><Clock className="h-5 w-5 text-amber-600" /></div>
          <div><p className="text-2xl font-bold text-foreground">{"\u20B9"}{(totalPending / 1000).toFixed(0)}K</p><p className="text-sm text-muted-foreground">Pending</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-red-200 bg-card p-5">
          <div className="rounded-lg bg-red-50 p-2.5"><AlertTriangle className="h-5 w-5 text-red-600" /></div>
          <div><p className="text-2xl font-bold text-foreground">{"\u20B9"}{(totalOverdue / 1000).toFixed(0)}K</p><p className="text-sm text-muted-foreground">Overdue</p></div>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by student name or ID..." className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {["All", "Paid", "Pending", "Overdue"].map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${filterStatus === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{s}</button>
          ))}
          <span className="mx-1 text-muted-foreground">|</span>
          {["All", "A", "B", "C", "D", "E"].map((b) => (
            <button key={b} onClick={() => setFilterBlock(b)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${filterBlock === b ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{b === "All" ? "All" : `Block ${b}`}</button>
          ))}
        </div>
      </div>

      {/* Fee Table */}
      <div className="mt-6 rounded-xl border border-border bg-card overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Student</th>
              <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Room</th>
              <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Amount</th>
              <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Due Date</th>
              <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Paid Date</th>
              <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Method</th>
              <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Status</th>
              <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((record) => {
              const fc = feeColors[record.status]
              return (
                <tr key={record.id}>
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-foreground">{record.student}</p>
                    <p className="text-xs text-muted-foreground">{record.studentId}</p>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{record.room}</td>
                  <td className="px-5 py-3.5 font-semibold text-foreground">{"\u20B9"}{record.amount}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{record.dueDate}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{record.paidDate || "-"}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{record.method || "-"}</td>
                  <td className="px-5 py-3.5"><span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${fc.bg} ${fc.color}`}>{record.status}</span></td>
                  <td className="px-5 py-3.5">
                    {record.status !== "Paid" && (
                      <button className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">Send Reminder</button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
