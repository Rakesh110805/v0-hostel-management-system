import {
  Home,
  Users,
  AlertTriangle,
  CalendarCheck,
  DoorOpen,
  UtensilsCrossed,
  Bell,
  ChevronRight,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

const statCards = [
  {
    label: "Total Students",
    value: "248",
    sub: "Block A & B",
    icon: Users,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    label: "Rooms Occupied",
    value: "118/130",
    sub: "90.7% occupancy",
    icon: DoorOpen,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  {
    label: "Pending Complaints",
    value: "7",
    sub: "3 high priority",
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    label: "Leave Requests",
    value: "5",
    sub: "Awaiting approval",
    icon: CalendarCheck,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
]

const quickActions = [
  { label: "Room Allocation", icon: DoorOpen, href: "/warden/rooms", color: "text-primary", bg: "bg-primary/10" },
  { label: "Student Details", icon: Users, href: "/warden/students", color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "View Complaints", icon: AlertTriangle, href: "/warden/complaints", color: "text-amber-500", bg: "bg-amber-50" },
  { label: "Leave Approvals", icon: CalendarCheck, href: "/warden/leave-approvals", color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Mess Menu", icon: UtensilsCrossed, href: "/warden/mess-menu", color: "text-teal-600", bg: "bg-teal-50" },
  { label: "Send Notice", icon: Bell, href: "/warden/notices", color: "text-red-500", bg: "bg-red-50" },
]

const pendingLeaves = [
  { student: "Rahul S.", room: "A-204", reason: "Medical - Doctor visit", days: 1, date: "Feb 10, 2025" },
  { student: "Priya M.", room: "B-115", reason: "Family function", days: 3, date: "Feb 9, 2025" },
  { student: "Arjun K.", room: "A-204", reason: "Personal work", days: 2, date: "Feb 8, 2025" },
]

const recentComplaints = [
  { title: "Water heater not working", room: "A-310", status: "Pending", priority: "High", date: "Feb 10" },
  { title: "Broken cupboard lock", room: "B-205", status: "In Progress", priority: "Medium", date: "Feb 9" },
  { title: "Mosquito problem", room: "A-108", status: "Pending", priority: "High", date: "Feb 8" },
]

const attendanceOverview = [
  { block: "Block A", present: 112, total: 124, percentage: 90 },
  { block: "Block B", present: 108, total: 124, percentage: 87 },
]

export default function WardenDashboard() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome, Dr. Sharma
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {"Here's an overview of your hostel today"}
          </p>
        </div>
        <div className="relative">
          <Bell className="h-6 w-6 text-muted-foreground" />
          <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            12
          </span>
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
                <div className={`rounded-lg ${card.bg} p-2`}>
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </div>
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
                <div className={`rounded-lg ${action.bg} p-3`}>
                  <Icon className={`h-5 w-5 ${action.color}`} />
                </div>
                <span className="text-xs font-medium text-foreground text-center">{action.label}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Attendance Overview */}
      <div className="mt-6 rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">{"Today's Attendance"}</h2>
          <Link href="/warden/attendance" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View details <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {attendanceOverview.map((block) => (
            <div key={block.block} className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">{block.block}</h3>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-bold text-emerald-600">{block.percentage}%</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                  <span>{block.present} present</span>
                  <span>{block.total - block.present} absent</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-muted">
                  <div className="h-2.5 rounded-full bg-emerald-500 transition-all" style={{ width: `${block.percentage}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Leaves & Recent Complaints */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pending Leaves */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Pending Leave Requests</h2>
            <Link href="/warden/leave-approvals" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {pendingLeaves.map((leave) => (
              <div key={leave.student} className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{leave.student}</p>
                    <span className="text-xs text-muted-foreground">Room {leave.room}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{leave.reason} ({leave.days} {leave.days === 1 ? "day" : "days"})</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-600 hover:bg-emerald-100 transition-colors">
                    Approve
                  </button>
                  <button className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Complaints */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Recent Complaints</h2>
            <Link href="/warden/complaints" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {recentComplaints.map((c) => (
              <div key={c.title} className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-amber-50 p-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{c.title}</p>
                    <p className="text-xs text-muted-foreground">Room {c.room} - {c.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${c.priority === "High" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}>
                    {c.priority}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${c.status === "Pending" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"}`}>
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
