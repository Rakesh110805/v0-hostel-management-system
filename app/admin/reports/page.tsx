"use client"

import { useState } from "react"
import { BarChart3, TrendingUp, Users, CreditCard, DoorOpen, AlertTriangle, Download, Calendar } from "lucide-react"

const monthlyData = [
  { month: "Sep", feeCollected: 42, complaints: 28, occupancy: 88, attendance: 91 },
  { month: "Oct", feeCollected: 45, complaints: 22, occupancy: 90, attendance: 89 },
  { month: "Nov", feeCollected: 43, complaints: 35, occupancy: 91, attendance: 87 },
  { month: "Dec", feeCollected: 38, complaints: 18, occupancy: 89, attendance: 85 },
  { month: "Jan", feeCollected: 46, complaints: 30, occupancy: 90, attendance: 88 },
  { month: "Feb", feeCollected: 48, complaints: 34, occupancy: 91, attendance: 89 },
]

const blockWiseData = [
  { block: "Block A", students: 248, feeCollected: 82, complaints: 8, attendance: 90, occupancy: 91 },
  { block: "Block B", students: 230, feeCollected: 78, complaints: 6, attendance: 87, occupancy: 93 },
  { block: "Block C", students: 285, feeCollected: 85, complaints: 10, attendance: 88, occupancy: 93 },
  { block: "Block D", students: 260, feeCollected: 75, complaints: 12, attendance: 86, occupancy: 89 },
  { block: "Block E", students: 184, feeCollected: 90, complaints: 3, attendance: 93, occupancy: 92 },
]

const complaintCategories = [
  { category: "Electrical", count: 45, percentage: 28 },
  { category: "Plumbing", count: 32, percentage: 20 },
  { category: "Furniture", count: 25, percentage: 16 },
  { category: "Network", count: 22, percentage: 14 },
  { category: "Hygiene", count: 18, percentage: 11 },
  { category: "Infrastructure", count: 10, percentage: 6 },
  { category: "Others", count: 8, percentage: 5 },
]

const categoryColors = ["bg-primary", "bg-blue-500", "bg-amber-500", "bg-teal-500", "bg-red-500", "bg-purple-500", "bg-gray-400"]

export default function AdminReports() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Semester")

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">Comprehensive hostel performance insights</p>
        </div>
        <div className="flex gap-2">
          <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option>This Semester</option>
            <option>Last Semester</option>
            <option>This Year</option>
          </select>
          <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"><Download className="h-4 w-4" />Export</button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-primary/20 bg-card p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Users className="h-4 w-4" />Total Students</div>
          <p className="mt-2 text-3xl font-bold text-foreground">1,247</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-emerald-600"><TrendingUp className="h-3 w-3" />+23 from last sem</p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-card p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><CreditCard className="h-4 w-4" />Fee Collection</div>
          <p className="mt-2 text-3xl font-bold text-foreground">82%</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-emerald-600"><TrendingUp className="h-3 w-3" />+5% from last sem</p>
        </div>
        <div className="rounded-xl border border-blue-200 bg-card p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><DoorOpen className="h-4 w-4" />Occupancy Rate</div>
          <p className="mt-2 text-3xl font-bold text-foreground">91%</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-emerald-600"><TrendingUp className="h-3 w-3" />+2% from last sem</p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-card p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><AlertTriangle className="h-4 w-4" />Resolution Rate</div>
          <p className="mt-2 text-3xl font-bold text-foreground">78%</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-red-500"><TrendingUp className="h-3 w-3 rotate-180" />-3% from last sem</p>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="mt-6 rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold text-foreground">Monthly Trends</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-left font-semibold text-muted-foreground">Month</th>
                <th className="pb-3 text-left font-semibold text-muted-foreground">Fee Collected (L)</th>
                <th className="pb-3 text-left font-semibold text-muted-foreground">Complaints</th>
                <th className="pb-3 text-left font-semibold text-muted-foreground">Occupancy</th>
                <th className="pb-3 text-left font-semibold text-muted-foreground">Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {monthlyData.map((row) => (
                <tr key={row.month}>
                  <td className="py-3 font-medium text-foreground">{row.month} 2025</td>
                  <td className="py-3 text-foreground">{"\u20B9"}{row.feeCollected}L</td>
                  <td className="py-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${row.complaints > 30 ? "bg-red-50 text-red-600" : row.complaints > 20 ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>{row.complaints}</span></td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: `${row.occupancy}%` }} /></div>
                      <span className="text-xs text-muted-foreground">{row.occupancy}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`text-sm font-medium ${row.attendance >= 90 ? "text-emerald-600" : row.attendance >= 85 ? "text-amber-600" : "text-red-600"}`}>{row.attendance}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Block-wise Performance & Complaint Categories */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold text-foreground">Block-wise Performance</h2>
          <div className="mt-4 space-y-4">
            {blockWiseData.map((block) => (
              <div key={block.block} className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-foreground">{block.block}</h3>
                  <span className="text-xs text-muted-foreground">{block.students} students</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className={`text-sm font-bold ${block.feeCollected >= 85 ? "text-emerald-600" : block.feeCollected >= 75 ? "text-amber-600" : "text-red-600"}`}>{block.feeCollected}%</p>
                    <p className="text-xs text-muted-foreground">Fee</p>
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${block.attendance >= 90 ? "text-emerald-600" : "text-amber-600"}`}>{block.attendance}%</p>
                    <p className="text-xs text-muted-foreground">Attendance</p>
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${block.complaints <= 5 ? "text-emerald-600" : block.complaints <= 10 ? "text-amber-600" : "text-red-600"}`}>{block.complaints}</p>
                    <p className="text-xs text-muted-foreground">Complaints</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold text-foreground">Complaint Categories</h2>
          <div className="mt-4 space-y-3">
            {complaintCategories.map((cat, i) => (
              <div key={cat.category}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{cat.category}</span>
                  <span className="text-muted-foreground">{cat.count} ({cat.percentage}%)</span>
                </div>
                <div className="mt-1.5 h-2.5 w-full rounded-full bg-muted">
                  <div className={`h-2.5 rounded-full ${categoryColors[i]} transition-all`} style={{ width: `${cat.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg bg-muted/50 p-4">
            <h3 className="text-sm font-bold text-foreground">Summary</h3>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <div><p className="text-xl font-bold text-foreground">160</p><p className="text-xs text-muted-foreground">Total Complaints</p></div>
              <div><p className="text-xl font-bold text-emerald-600">125</p><p className="text-xs text-muted-foreground">Resolved</p></div>
              <div><p className="text-xl font-bold text-amber-600">5.2</p><p className="text-xs text-muted-foreground">Avg Days to Resolve</p></div>
              <div><p className="text-xl font-bold text-primary">78%</p><p className="text-xs text-muted-foreground">Resolution Rate</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
