"use client"

import { useState } from "react"
import { DoorOpen, CheckCircle2, Wrench, Users, Building, Search, Filter } from "lucide-react"

interface BlockSummary {
  name: string
  warden: string
  totalRooms: number
  occupied: number
  vacant: number
  maintenance: number
  capacity: number
  students: number
}

const blocks: BlockSummary[] = [
  { name: "Block A", warden: "Dr. Sharma", totalRooms: 130, occupied: 118, vacant: 9, maintenance: 3, capacity: 260, students: 248 },
  { name: "Block B", warden: "Dr. Patel", totalRooms: 120, occupied: 112, vacant: 6, maintenance: 2, capacity: 240, students: 230 },
  { name: "Block C", warden: "Dr. Reddy", totalRooms: 150, occupied: 140, vacant: 8, maintenance: 2, capacity: 300, students: 285 },
  { name: "Block D", warden: "Dr. Kumar", totalRooms: 140, occupied: 125, vacant: 12, maintenance: 3, capacity: 280, students: 260 },
  { name: "Block E (Girls)", warden: "Dr. Singh", totalRooms: 100, occupied: 92, vacant: 5, maintenance: 3, capacity: 200, students: 184 },
]

const totalRooms = blocks.reduce((s, b) => s + b.totalRooms, 0)
const totalOccupied = blocks.reduce((s, b) => s + b.occupied, 0)
const totalVacant = blocks.reduce((s, b) => s + b.vacant, 0)
const totalMaintenance = blocks.reduce((s, b) => s + b.maintenance, 0)

export default function AdminRooms() {
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)

  return (
    <div className="p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Room Management</h1>
        <p className="mt-1 text-sm text-muted-foreground">Overview of room allocation across all hostel blocks</p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="flex items-center gap-4 rounded-xl border border-primary/20 bg-card p-5">
          <div className="rounded-lg bg-primary/10 p-2.5"><DoorOpen className="h-5 w-5 text-primary" /></div>
          <div><p className="text-2xl font-bold text-foreground">{totalRooms}</p><p className="text-sm text-muted-foreground">Total Rooms</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-emerald-200 bg-card p-5">
          <div className="rounded-lg bg-emerald-50 p-2.5"><CheckCircle2 className="h-5 w-5 text-emerald-600" /></div>
          <div><p className="text-2xl font-bold text-foreground">{totalOccupied}</p><p className="text-sm text-muted-foreground">Occupied</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-blue-200 bg-card p-5">
          <div className="rounded-lg bg-blue-50 p-2.5"><DoorOpen className="h-5 w-5 text-blue-600" /></div>
          <div><p className="text-2xl font-bold text-foreground">{totalVacant}</p><p className="text-sm text-muted-foreground">Vacant</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-amber-200 bg-card p-5">
          <div className="rounded-lg bg-amber-50 p-2.5"><Wrench className="h-5 w-5 text-amber-600" /></div>
          <div><p className="text-2xl font-bold text-foreground">{totalMaintenance}</p><p className="text-sm text-muted-foreground">Maintenance</p></div>
        </div>
      </div>

      {/* Block Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {blocks.map((block) => {
          const occupancyRate = Math.round((block.occupied / block.totalRooms) * 100)
          return (
            <div key={block.name} className={`rounded-xl border bg-card p-6 cursor-pointer transition-all hover:shadow-md ${selectedBlock === block.name ? "border-primary ring-2 ring-primary/20" : "border-border"}`} onClick={() => setSelectedBlock(selectedBlock === block.name ? null : block.name)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2.5"><Building className="h-5 w-5 text-primary" /></div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">{block.name}</h3>
                    <p className="text-xs text-muted-foreground">Warden: {block.warden}</p>
                  </div>
                </div>
                <span className={`text-lg font-bold ${occupancyRate >= 90 ? "text-emerald-600" : occupancyRate >= 80 ? "text-amber-600" : "text-red-600"}`}>{occupancyRate}%</span>
              </div>

              <div className="mt-4">
                <div className="h-2.5 w-full rounded-full bg-muted">
                  <div className="h-2.5 rounded-full bg-emerald-500 transition-all" style={{ width: `${occupancyRate}%` }} />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-lg font-bold text-foreground">{block.totalRooms}</p>
                  <p className="text-xs text-muted-foreground">Total Rooms</p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-3">
                  <p className="text-lg font-bold text-emerald-600">{block.occupied}</p>
                  <p className="text-xs text-muted-foreground">Occupied</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-3">
                  <p className="text-lg font-bold text-blue-600">{block.vacant}</p>
                  <p className="text-xs text-muted-foreground">Vacant</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-3">
                  <p className="text-lg font-bold text-amber-600">{block.maintenance}</p>
                  <p className="text-xs text-muted-foreground">Maintenance</p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{block.students} students</span>
                <span>Capacity: {block.capacity}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
