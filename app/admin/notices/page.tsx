"use client"

import { useState } from "react"
import { Bell, Plus, Send, Pin, Calendar, AlertTriangle, Wrench, Info, Filter, Building, Trash2 } from "lucide-react"

type NoticeType = "Event" | "Maintenance" | "Important" | "General" | "Admin"

interface Notice {
  id: string
  title: string
  description: string
  type: NoticeType
  date: string
  pinned: boolean
  author: string
  target: string
  blocks: string[]
}

const typeConfig: Record<NoticeType, { color: string; bg: string; icon: typeof Bell }> = {
  Event: { color: "text-primary", bg: "bg-primary/10", icon: Calendar },
  Maintenance: { color: "text-amber-600", bg: "bg-amber-50", icon: Wrench },
  Important: { color: "text-red-600", bg: "bg-red-50", icon: AlertTriangle },
  General: { color: "text-blue-600", bg: "bg-blue-50", icon: Info },
  Admin: { color: "text-purple-600", bg: "bg-purple-50", icon: Building },
}

const notices: Notice[] = [
  { id: "AN-001", title: "Annual Fee Revision Notice", description: "Hostel fees for the academic year 2025-26 have been revised. New fee structure: Single room - Rs. 30,000, Double sharing - Rs. 25,000, Triple sharing - Rs. 20,000 per semester. The revised fees will be applicable from August 2025.", type: "Important", date: "Feb 10, 2025", pinned: true, author: "Admin Office", target: "All Blocks", blocks: ["A", "B", "C", "D", "E"] },
  { id: "AN-002", title: "New Block F Construction Update", description: "Construction of Block F is progressing on schedule. Expected completion by July 2025. The new block will accommodate 200 additional students with modern amenities. Room allocation will begin in June.", type: "General", date: "Feb 8, 2025", pinned: true, author: "Admin Office", target: "All", blocks: [] },
  { id: "AN-003", title: "Warden Reassignment - Block C", description: "Dr. Reddy will be transitioning as warden of Block C. Dr. Iyer from the Chemistry department will take over from March 1, 2025. All Block C students should note this change.", type: "Admin", date: "Feb 5, 2025", pinned: false, author: "Admin Office", target: "Block C", blocks: ["C"] },
  { id: "AN-004", title: "Hostel Day Celebration", description: "Annual Hostel Day will be celebrated on Feb 15. Events include cultural programs, inter-block sports competition, and special dinner. Budget approved: Rs. 2,00,000.", type: "Event", date: "Feb 3, 2025", pinned: false, author: "Admin Office", target: "All Blocks", blocks: ["A", "B", "C", "D", "E"] },
  { id: "AN-005", title: "Campus-wide Water Tank Cleaning", description: "Water tanks across all hostel blocks will be cleaned on Feb 20-21. Block A and B on Feb 20, Block C, D and E on Feb 21. Students should store water in advance.", type: "Maintenance", date: "Feb 1, 2025", pinned: false, author: "Maintenance Dept.", target: "All Blocks", blocks: ["A", "B", "C", "D", "E"] },
  { id: "AN-006", title: "Fee Payment Deadline Extension", description: "Due to requests from multiple students, the hostel fee payment deadline for Spring 2025 has been extended from Feb 15 to Feb 28. Late fee charges will apply after the new deadline.", type: "Important", date: "Jan 28, 2025", pinned: false, author: "Accounts Office", target: "All", blocks: [] },
  { id: "AN-007", title: "Security System Upgrade", description: "CCTV cameras and biometric entry systems are being upgraded across all blocks. Installation will happen block by block from Feb 15 to March 1. Students should cooperate with the technical team.", type: "Admin", date: "Jan 25, 2025", pinned: false, author: "Admin Office", target: "All Blocks", blocks: ["A", "B", "C", "D", "E"] },
]

export default function AdminNotices() {
  const [showNewForm, setShowNewForm] = useState(false)
  const [filterType, setFilterType] = useState("All")

  const filtered = notices.filter(n => filterType === "All" || n.type === filterType)

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notice Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create and manage hostel-wide notices and announcements</p>
        </div>
        <button onClick={() => setShowNewForm(!showNewForm)} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"><Plus className="h-4 w-4" />New Notice</button>
      </div>

      {/* New Notice Form */}
      {showNewForm && (
        <div className="mt-6 rounded-xl border border-primary/30 bg-card p-6">
          <h2 className="text-lg font-bold text-foreground">Create Hostel-Wide Notice</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div><label className="text-sm font-medium text-foreground">Title</label><input type="text" placeholder="Notice title" className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /></div>
            <div><label className="text-sm font-medium text-foreground">Type</label><select className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">{["Event", "Maintenance", "Important", "General", "Admin"].map(t => <option key={t}>{t}</option>)}</select></div>
            <div><label className="text-sm font-medium text-foreground">Target</label><select className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"><option>All Blocks</option><option>Block A</option><option>Block B</option><option>Block C</option><option>Block D</option><option>Block E</option><option>Wardens Only</option></select></div>
            <div className="sm:col-span-3"><label className="text-sm font-medium text-foreground">Description</label><textarea rows={3} placeholder="Write notice content..." className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none" /></div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"><Send className="h-4 w-4" />Publish</button>
            <button onClick={() => setShowNewForm(false)} className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {["All", "Event", "Maintenance", "Important", "General", "Admin"].map(t => (
          <button key={t} onClick={() => setFilterType(t)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${filterType === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{t}</button>
        ))}
      </div>

      {/* Notices */}
      <div className="mt-6 space-y-4">
        {filtered.map((notice) => {
          const tc = typeConfig[notice.type]
          const TypeIcon = tc.icon
          return (
            <div key={notice.id} className={`rounded-xl border bg-card p-5 ${notice.pinned ? "border-primary/30 bg-primary/5" : "border-border"}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg ${tc.bg} p-2.5`}><TypeIcon className={`h-5 w-5 ${tc.color}`} /></div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-foreground">{notice.title}</h3>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tc.bg} ${tc.color}`}>{notice.type}</span>
                      {notice.pinned && <Pin className="h-3 w-3 text-primary" />}
                    </div>
                    <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>By {notice.author}</span><span>{notice.date}</span><span>To: {notice.target}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg bg-muted p-1.5 text-muted-foreground hover:text-foreground transition-colors"><Pin className="h-3.5 w-3.5" /></button>
                  <button className="rounded-lg bg-red-50 p-1.5 text-red-500 hover:text-red-600 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{notice.description}</p>
              {notice.blocks.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {notice.blocks.map(b => (
                    <span key={b} className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">Block {b}</span>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
