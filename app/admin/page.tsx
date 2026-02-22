import {
  Users,
  CreditCard,
  DoorOpen,
  AlertTriangle,
  Bell,
  ChevronRight,
  TrendingUp,
  Building,
  IndianRupee,
  Shield,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

const statCards = [
  { label: "Total Students", value: "1,247", sub: "+23 this semester", icon: Users, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
  { label: "Total Revenue", value: "\u20B948.5L", sub: "This semester", icon: IndianRupee, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  { label: "Fee Pending", value: "\u20B912.3L", sub: "127 students", icon: CreditCard, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  { label: "Open Complaints", value: "34", sub: "12 high priority", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
]

const hostelBlocks = [
  { name: "Block A", warden: "Dr. Sharma", rooms: 130, occupied: 118, students: 248, feeCollected: 82 },
  { name: "Block B", warden: "Dr. Patel", rooms: 120, occupied: 112, students: 230, feeCollected: 78 },
  { name: "Block C", warden: "Dr. Reddy", rooms: 150, occupied: 140, students: 285, feeCollected: 85 },
  { name: "Block D", warden: "Dr. Kumar", rooms: 140, occupied: 125, students: 260, feeCollected: 75 },
  { name: "Block E (Girls)", warden: "Dr. Singh", rooms: 100, occupied: 92, students: 184, feeCollected: 90 },
]

const quickActions = [
  { label: "Student Records", icon: Users, href: "/admin/students", color: "text-primary", bg: "bg-primary/10" },
  { label: "Fee Collection", icon: CreditCard, href: "/admin/fees", color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Room Allocation", icon: DoorOpen, href: "/admin/rooms", color: "text-amber-500", bg: "bg-amber-50" },
  { label: "Complaints", icon: AlertTriangle, href: "/admin/complaints", color: "text-red-500", bg: "bg-red-50" },
  { label: "Wardens", icon: Shield, href: "/admin/wardens", color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Reports", icon: BarChart3, href: "/admin/reports", color: "text-teal-600", bg: "bg-teal-50" },
]

const recentFees = [
  { student: "Rahul S.", amount: "\u20B912,500", date: "Feb 10", block: "A", status: "Paid" },
  { student: "Vikram S.", amount: "\u20B925,000", date: "Feb 10", block: "A", status: "Overdue" },
  { student: "Priya M.", amount: "\u20B912,500", date: "Feb 9", block: "B", status: "Paid" },
  { student: "Manish K.", amount: "\u20B930,000", date: "Feb 8", block: "B", status: "Overdue" },
]

const recentNotices = [
  { title: "Annual Fee Revision Notice", date: "Feb 10", type: "Important" },
  { title: "New Block F Construction Update", date: "Feb 8", type: "General" },
  { title: "Warden Reassignment - Block C", date: "Feb 5", type: "Admin" },
]

export default function AdminDashboard() {
  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">College Hostel Hub - Complete Overview</p>
        </div>
        <div className="relative">
          <Bell className="h-6 w-6 text-muted-foreground" />
          <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">8</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className={`rounded-xl border ${card.border} bg-card p-5`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">{card.value}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{card.sub}</p>
                </div>
                <div className={`rounded-lg ${card.bg} p-2`}><Icon className={`h-5 w-5 ${card.color}`} /></div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold text-foreground">Quick Actions</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link key={action.label} href={action.href} className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md">
                <div className={`rounded-lg ${action.bg} p-3`}><Icon className={`h-5 w-5 ${action.color}`} /></div>
                <span className="text-xs font-medium text-foreground text-center">{action.label}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Hostel Blocks Overview */}
      <div className="mt-6 rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Hostel Blocks Overview</h2>
          <Link href="/admin/rooms" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">View details <ChevronRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 font-semibold text-muted-foreground">Block</th>
                <th className="pb-3 font-semibold text-muted-foreground">Warden</th>
                <th className="pb-3 font-semibold text-muted-foreground">Rooms</th>
                <th className="pb-3 font-semibold text-muted-foreground">Occupancy</th>
                <th className="pb-3 font-semibold text-muted-foreground">Students</th>
                <th className="pb-3 font-semibold text-muted-foreground">Fee Collected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {hostelBlocks.map((block) => (
                <tr key={block.name}>
                  <td className="py-3 font-medium text-foreground">{block.name}</td>
                  <td className="py-3 text-muted-foreground">{block.warden}</td>
                  <td className="py-3 text-muted-foreground">{block.occupied}/{block.rooms}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${(block.occupied / block.rooms) * 100}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{Math.round((block.occupied / block.rooms) * 100)}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-muted-foreground">{block.students}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${block.feeCollected >= 85 ? "bg-emerald-50 text-emerald-600" : block.feeCollected >= 75 ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"}`}>{block.feeCollected}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Fees & Notices */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Recent Fee Activity</h2>
            <Link href="/admin/fees" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">View all <ChevronRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-4 space-y-3">
            {recentFees.map((fee, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{fee.student}</p>
                  <p className="text-xs text-muted-foreground">Block {fee.block} - {fee.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{fee.amount}</p>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${fee.status === "Paid" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>{fee.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Recent Notices</h2>
            <Link href="/admin/notices" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">View all <ChevronRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-4 space-y-3">
            {recentNotices.map((notice, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-red-50 p-2"><Bell className="h-4 w-4 text-red-500" /></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{notice.title}</p>
                    <p className="text-xs text-muted-foreground">{notice.date}</p>
                  </div>
                </div>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{notice.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
