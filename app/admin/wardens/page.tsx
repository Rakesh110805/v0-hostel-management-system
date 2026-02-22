"use client"

import { useState } from "react"
import { Shield, Phone, Mail, Building, Users, AlertTriangle, CheckCircle2, Plus, Search } from "lucide-react"

interface Warden {
  id: string
  name: string
  department: string
  phone: string
  email: string
  blocks: string[]
  totalStudents: number
  pendingComplaints: number
  pendingLeaves: number
  joinDate: string
  status: "Active" | "On Leave"
  rating: number
}

const wardens: Warden[] = [
  { id: "WRD-001", name: "Dr. Sharma", department: "Computer Science", phone: "9876543210", email: "sharma@college.edu", blocks: ["Block A"], totalStudents: 248, pendingComplaints: 3, pendingLeaves: 5, joinDate: "Jan 2020", status: "Active", rating: 4.5 },
  { id: "WRD-002", name: "Dr. Patel", department: "Electronics", phone: "9876543220", email: "patel@college.edu", blocks: ["Block B"], totalStudents: 230, pendingComplaints: 2, pendingLeaves: 3, joinDate: "Aug 2019", status: "Active", rating: 4.3 },
  { id: "WRD-003", name: "Dr. Reddy", department: "Mechanical", phone: "9876543230", email: "reddy@college.edu", blocks: ["Block C"], totalStudents: 285, pendingComplaints: 4, pendingLeaves: 2, joinDate: "Jan 2021", status: "Active", rating: 4.1 },
  { id: "WRD-004", name: "Dr. Kumar", department: "Civil", phone: "9876543240", email: "kumar@college.edu", blocks: ["Block D"], totalStudents: 260, pendingComplaints: 5, pendingLeaves: 4, joinDate: "Aug 2018", status: "Active", rating: 3.9 },
  { id: "WRD-005", name: "Dr. Singh", department: "Physics", phone: "9876543250", email: "singh@college.edu", blocks: ["Block E (Girls)"], totalStudents: 184, pendingComplaints: 1, pendingLeaves: 2, joinDate: "Jan 2022", status: "Active", rating: 4.7 },
  { id: "WRD-006", name: "Dr. Joshi", department: "Mathematics", phone: "9876543260", email: "joshi@college.edu", blocks: [], totalStudents: 0, pendingComplaints: 0, pendingLeaves: 0, joinDate: "Aug 2023", status: "On Leave", rating: 4.0 },
]

export default function AdminWardens() {
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = wardens.filter(w =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) || w.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Warden Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage and monitor warden assignments</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"><Plus className="h-4 w-4" />Add Warden</button>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl border border-primary/20 bg-card p-5">
          <div className="rounded-lg bg-primary/10 p-2.5"><Shield className="h-5 w-5 text-primary" /></div>
          <div><p className="text-2xl font-bold text-foreground">{wardens.length}</p><p className="text-sm text-muted-foreground">Total Wardens</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-emerald-200 bg-card p-5">
          <div className="rounded-lg bg-emerald-50 p-2.5"><CheckCircle2 className="h-5 w-5 text-emerald-600" /></div>
          <div><p className="text-2xl font-bold text-foreground">{wardens.filter(w => w.status === "Active").length}</p><p className="text-sm text-muted-foreground">Active</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-amber-200 bg-card p-5">
          <div className="rounded-lg bg-amber-50 p-2.5"><Building className="h-5 w-5 text-amber-600" /></div>
          <div><p className="text-2xl font-bold text-foreground">5</p><p className="text-sm text-muted-foreground">Blocks Assigned</p></div>
        </div>
      </div>

      <div className="mt-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search wardens..." className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>

      {/* Warden Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filtered.map((warden) => (
          <div key={warden.id} className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{warden.name.split(" ").pop()?.[0] || "W"}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-foreground">{warden.name}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${warden.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{warden.status}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{warden.department}</p>
                  <p className="text-xs text-muted-foreground">{warden.id} - Since {warden.joinDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1">
                <span className="text-sm font-bold text-amber-700">{warden.rating}</span>
                <span className="text-amber-400">{"*"}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" />{warden.phone}</span>
              <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />{warden.email}</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {warden.blocks.length > 0 ? warden.blocks.map(b => (
                <span key={b} className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"><Building className="h-3 w-3" />{b}</span>
              )) : (
                <span className="text-xs text-muted-foreground italic">No block assigned</span>
              )}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-muted/50 p-3 text-center">
                <p className="text-lg font-bold text-foreground">{warden.totalStudents}</p>
                <p className="text-xs text-muted-foreground">Students</p>
              </div>
              <div className="rounded-lg bg-amber-50 p-3 text-center">
                <p className="text-lg font-bold text-amber-600">{warden.pendingComplaints}</p>
                <p className="text-xs text-muted-foreground">Complaints</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-3 text-center">
                <p className="text-lg font-bold text-blue-600">{warden.pendingLeaves}</p>
                <p className="text-xs text-muted-foreground">Leave Req.</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
              <button className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">Edit Details</button>
              <button className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted/80 transition-colors">Reassign Block</button>
              <button className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted/80 transition-colors">View Performance</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
