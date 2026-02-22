"use client"

import { useState } from "react"
import {
  DoorOpen,
  Search,
  Filter,
  Users,
  CheckCircle2,
  XCircle,
  Wrench,
} from "lucide-react"

type RoomStatus = "Occupied" | "Vacant" | "Under Maintenance"

interface Room {
  number: string
  block: string
  floor: string
  capacity: number
  occupants: string[]
  status: RoomStatus
}

const statusConfig: Record<RoomStatus, { color: string; bg: string; icon: typeof CheckCircle2 }> = {
  Occupied: { color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle2 },
  Vacant: { color: "text-blue-600", bg: "bg-blue-50", icon: DoorOpen },
  "Under Maintenance": { color: "text-amber-600", bg: "bg-amber-50", icon: Wrench },
}

const rooms: Room[] = [
  { number: "A-101", block: "A", floor: "1st", capacity: 2, occupants: ["Vikram S.", "Raj P."], status: "Occupied" },
  { number: "A-102", block: "A", floor: "1st", capacity: 2, occupants: ["Deepak M."], status: "Occupied" },
  { number: "A-103", block: "A", floor: "1st", capacity: 2, occupants: [], status: "Vacant" },
  { number: "A-104", block: "A", floor: "1st", capacity: 2, occupants: [], status: "Under Maintenance" },
  { number: "A-201", block: "A", floor: "2nd", capacity: 2, occupants: ["Suresh K.", "Mohan R."], status: "Occupied" },
  { number: "A-202", block: "A", floor: "2nd", capacity: 2, occupants: ["Ankit J.", "Vishal D."], status: "Occupied" },
  { number: "A-203", block: "A", floor: "2nd", capacity: 2, occupants: [], status: "Vacant" },
  { number: "A-204", block: "A", floor: "2nd", capacity: 2, occupants: ["Rahul S.", "Arjun K."], status: "Occupied" },
  { number: "B-101", block: "B", floor: "1st", capacity: 3, occupants: ["Karan M.", "Nikhil T.", "Ravi B."], status: "Occupied" },
  { number: "B-102", block: "B", floor: "1st", capacity: 3, occupants: ["Sanjay L.", "Amit G."], status: "Occupied" },
  { number: "B-103", block: "B", floor: "1st", capacity: 3, occupants: [], status: "Vacant" },
  { number: "B-201", block: "B", floor: "2nd", capacity: 3, occupants: [], status: "Under Maintenance" },
  { number: "B-202", block: "B", floor: "2nd", capacity: 3, occupants: ["Pradeep N.", "Gaurav S.", "Harsh V."], status: "Occupied" },
  { number: "B-203", block: "B", floor: "2nd", capacity: 3, occupants: ["Manish K.", "Rohit P."], status: "Occupied" },
]

const stats = [
  { value: "130", label: "Total Rooms", icon: DoorOpen, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
  { value: "118", label: "Occupied", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  { value: "9", label: "Vacant", icon: DoorOpen, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
  { value: "3", label: "Maintenance", icon: Wrench, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
]

export default function RoomManagement() {
  const [filterBlock, setFilterBlock] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = rooms.filter((r) => {
    const matchBlock = filterBlock === "All" || r.block === filterBlock
    const matchStatus = filterStatus === "All" || r.status === filterStatus
    const matchSearch = r.number.toLowerCase().includes(searchQuery.toLowerCase()) || r.occupants.some(o => o.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchBlock && matchStatus && matchSearch
  })

  return (
    <div className="p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Room Management</h1>
        <p className="mt-1 text-sm text-muted-foreground">View and manage room allocations across blocks</p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className={`flex items-center gap-4 rounded-xl border ${stat.border} bg-card p-5`}>
              <div className={`rounded-lg ${stat.bg} p-2.5`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by room or student..." className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Block:</span>
            {["All", "A", "B"].map((b) => (
              <button key={b} onClick={() => setFilterBlock(b)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${filterBlock === b ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{b === "All" ? "All" : `Block ${b}`}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Status:</span>
            {["All", "Occupied", "Vacant", "Under Maintenance"].map((s) => (
              <button key={s} onClick={() => setFilterStatus(s)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${filterStatus === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Room Grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((room) => {
          const sc = statusConfig[room.status]
          const StatusIcon = sc.icon
          return (
            <div key={room.number} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">{room.number}</h3>
                <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${sc.bg} ${sc.color}`}>
                  <StatusIcon className="h-3 w-3" />
                  {room.status}
                </span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                <p>Block {room.block} - {room.floor} Floor</p>
                <p className="mt-0.5">Capacity: {room.capacity}</p>
              </div>
              {room.occupants.length > 0 && (
                <div className="mt-3 border-t border-border pt-3">
                  <p className="text-xs font-semibold text-foreground mb-1.5">Occupants:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {room.occupants.map((name) => (
                      <span key={name} className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        <Users className="h-3 w-3" />
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {room.status === "Vacant" && (
                <button className="mt-3 w-full rounded-lg bg-primary py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Assign Student</button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
