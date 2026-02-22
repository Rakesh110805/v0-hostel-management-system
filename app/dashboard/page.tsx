import {
  Home,
  Users,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  CalendarDays,
  UtensilsCrossed,
  Bell,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

const statCards = [
  {
    label: "Room Number",
    value: "A-204",
    sub: "Block A, 2nd Floor",
    icon: Home,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    label: "Roommate",
    value: "Arjun K.",
    sub: "Same batch",
    icon: Users,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    label: "Fee Status",
    value: "\u20B912,500",
    sub: "Due: Feb 15",
    icon: CreditCard,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    label: "Attendance",
    value: "92%",
    sub: "This month",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
]

const quickActions = [
  {
    label: "File Complaint",
    icon: AlertTriangle,
    href: "/dashboard/complaints",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    label: "Apply Leave",
    icon: CalendarDays,
    href: "/dashboard/leave",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "View Menu",
    icon: UtensilsCrossed,
    href: "/dashboard/mess-menu",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    label: "Notices",
    icon: Bell,
    href: "/dashboard/notices",
    color: "text-red-500",
    bg: "bg-red-50",
  },
]

const recentComplaints = [
  {
    title: "AC not working",
    date: "Jan 28",
    status: "In Progress",
    statusColor: "text-blue-600 bg-blue-50",
  },
  {
    title: "Water leakage",
    date: "Jan 25",
    status: "Resolved",
    statusColor: "text-emerald-600 bg-emerald-50",
  },
]

const latestNotices = [
  {
    title: "Hostel Day Celebration",
    date: "Feb 5",
    icon: Bell,
  },
  {
    title: "Water Supply Maintenance",
    date: "Feb 3",
    icon: Bell,
  },
]

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {"Good Morning, Rahul! \uD83D\uDC4B"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {"Here's what's happening in your hostel today"}
          </p>
        </div>
        <div className="relative">
          <Bell className="h-6 w-6 text-muted-foreground" />
          <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            3
          </span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.label}
              className={`rounded-xl border ${card.border} bg-card p-5`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {card.value}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {card.sub}
                  </p>
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
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
              >
                <div className={`rounded-lg ${action.bg} p-3`}>
                  <Icon className={`h-6 w-6 ${action.color}`} />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {action.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Complaints & Latest Notices */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Complaints */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">
              Recent Complaints
            </h2>
            <Link
              href="/dashboard/complaints"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 space-y-4">
            {recentComplaints.map((complaint) => (
              <div
                key={complaint.title}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-amber-50 p-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {complaint.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {complaint.date}
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${complaint.statusColor}`}
                >
                  {complaint.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Notices */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">
              Latest Notices
            </h2>
            <Link
              href="/dashboard/notices"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 space-y-4">
            {latestNotices.map((notice) => (
              <div
                key={notice.title}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-red-50 p-2">
                    <Bell className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {notice.title}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      {notice.date}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
