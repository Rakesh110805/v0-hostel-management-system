"use client"

import { useState } from "react"
import { Bell, Plus, Send, Pin, Clock, AlertTriangle, Wrench, Calendar, Info, Filter } from "lucide-react"

type NoticeType = "Event" | "Maintenance" | "Important" | "General" | "Urgent"

interface Notice {
  id: string
  title: string
  description: string
  type: NoticeType
  date: string
  pinned: boolean
  author: string
  target: string
}

const typeConfig: Record<NoticeType, { color: string; bg: string; icon: typeof Bell }> = {
  Event: { color: "text-primary", bg: "bg-primary/10", icon: Calendar },
  Maintenance: { color: "text-amber-600", bg: "bg-amber-50", icon: Wrench },
  Important: { color: "text-red-600", bg: "bg-red-50", icon: AlertTriangle },
  General: { color: "text-blue-600", bg: "bg-blue-50", icon: Info },
  Urgent: { color: "text-red-600", bg: "bg-red-50", icon: AlertTriangle },
}

const notices: Notice[] = [
  { id: "N-001", title: "Hostel Day Celebration", description: "Annual Hostel Day will be celebrated on Feb 15. Cultural programs, games, and dinner planned. All students must participate. Registration open at the warden office.", type: "Event", date: "Feb 5, 2025", pinned: true, author: "Dr. Sharma", target: "All Students" },
  { id: "N-002", title: "Water Supply Maintenance", description: "Water supply will be disrupted on Feb 12 from 10 AM to 4 PM for tank cleaning and pipeline maintenance. Students are advised to store water in advance.", type: "Maintenance", date: "Feb 8, 2025", pinned: true, author: "Dr. Sharma", target: "All Students" },
  { id: "N-003", title: "Fee Payment Deadline", description: "Last date for hostel fee payment is Feb 28. Late fee of Rs. 500 per week will be charged. Contact accounts office for payment modes.", type: "Important", date: "Feb 3, 2025", pinned: false, author: "Admin Office", target: "All Students" },
  { id: "N-004", title: "Night Curfew Update", description: "Night curfew timings updated to 10:30 PM from the current 10:00 PM effective from Feb 10. Gate will be locked at 10:30 PM sharp.", type: "General", date: "Feb 1, 2025", pinned: false, author: "Dr. Sharma", target: "All Students" },
  { id: "N-005", title: "Mess Committee Meeting", description: "Monthly mess committee meeting scheduled for Feb 14 at 5 PM in the common room. All floor representatives must attend.", type: "Event", date: "Jan 30, 2025", pinned: false, author: "Dr. Sharma", target: "Mess Committee" },
  { id: "N-006", title: "Pest Control Schedule", description: "Pest control will be conducted in Block A on Feb 16 and Block B on Feb 17. Students should keep rooms accessible from 9 AM to 12 PM.", type: "Maintenance", date: "Jan 28, 2025", pinned: false, author: "Maintenance Dept.", target: "All Students" },
]

export default function WardenNotices() {
  const [showNewForm, setShowNewForm] = useState(false)
  const [filterType, setFilterType] = useState("All")
  const [newNotice, setNewNotice] = useState({ title: "", description: "", type: "General" as NoticeType, target: "All Students", pinned: false })

  const filtered = notices.filter((n) => filterType === "All" || n.type === filterType)

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notice Board</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create and manage hostel notices</p>
        </div>
        <button onClick={() => setShowNewForm(!showNewForm)} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          New Notice
        </button>
      </div>

      {/* New Notice Form */}
      {showNewForm && (
        <div className="mt-6 rounded-xl border border-primary/30 bg-card p-6">
          <h2 className="text-lg font-bold text-foreground">Create New Notice</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground">Title</label>
              <input type="text" value={newNotice.title} onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })} placeholder="Notice title" className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Type</label>
              <select value={newNotice.type} onChange={(e) => setNewNotice({ ...newNotice, type: e.target.value as NoticeType })} className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                {["Event", "Maintenance", "Important", "General", "Urgent"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Target Audience</label>
              <select value={newNotice.target} onChange={(e) => setNewNotice({ ...newNotice, target: e.target.value })} className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                <option>All Students</option>
                <option>Block A</option>
                <option>Block B</option>
                <option>Mess Committee</option>
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex cursor-pointer items-center gap-2">
                <input type="checkbox" checked={newNotice.pinned} onChange={(e) => setNewNotice({ ...newNotice, pinned: e.target.checked })} className="h-4 w-4 rounded border-border text-primary accent-primary" />
                <span className="text-sm text-foreground">Pin this notice</span>
              </label>
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-foreground">Description</label>
              <textarea value={newNotice.description} onChange={(e) => setNewNotice({ ...newNotice, description: e.target.value })} rows={3} placeholder="Write notice content..." className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"><Send className="h-4 w-4" />Publish Notice</button>
            <button onClick={() => setShowNewForm(false)} className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="mt-6 flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {["All", "Event", "Maintenance", "Important", "General", "Urgent"].map((t) => (
          <button key={t} onClick={() => setFilterType(t)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${filterType === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{t}</button>
        ))}
      </div>

      {/* Pinned Notices */}
      {filtered.some(n => n.pinned) && (
        <div className="mt-6">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground"><Pin className="h-4 w-4 text-primary" />Pinned Notices</h2>
          <div className="mt-3 space-y-3">
            {filtered.filter(n => n.pinned).map((notice) => {
              const tc = typeConfig[notice.type]
              const TypeIcon = tc.icon
              return (
                <div key={notice.id} className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`rounded-lg ${tc.bg} p-2.5`}><TypeIcon className={`h-5 w-5 ${tc.color}`} /></div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-foreground">{notice.title}</h3>
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tc.bg} ${tc.color}`}>{notice.type}</span>
                          <Pin className="h-3 w-3 text-primary" />
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">By {notice.author} - {notice.date} - To: {notice.target}</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{notice.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* All Notices */}
      <div className="mt-6 space-y-3">
        {filtered.filter(n => !n.pinned).map((notice) => {
          const tc = typeConfig[notice.type]
          const TypeIcon = tc.icon
          return (
            <div key={notice.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg ${tc.bg} p-2.5`}><TypeIcon className={`h-5 w-5 ${tc.color}`} /></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-foreground">{notice.title}</h3>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tc.bg} ${tc.color}`}>{notice.type}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">By {notice.author} - {notice.date} - To: {notice.target}</p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{notice.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
