import {
  CheckCircle2,
  Clock,
  CalendarDays,
  Plus,
  ChevronRight,
  Calendar,
} from "lucide-react"

const stats = [
  {
    value: "2",
    label: "Approved",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  {
    value: "1",
    label: "Pending",
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    value: "7",
    label: "Days Taken",
    icon: CalendarDays,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
]

const leaveHistory = [
  {
    title: "Home Visit",
    status: "Approved",
    statusColor: "text-emerald-600 bg-emerald-50",
    reason: "Family function - Sister's wedding",
    from: "Feb 5, 2025",
    to: "Feb 8, 2025",
    days: 4,
    appliedOn: "Jan 28, 2025",
    approvedBy: "Dr. Sharma (Warden)",
  },
  {
    title: "Medical",
    status: "Pending",
    statusColor: "text-amber-600 bg-amber-50",
    reason: "Doctor appointment for regular checkup",
    from: "Feb 12, 2025",
    to: "Feb 12, 2025",
    days: 1,
    appliedOn: "Jan 30, 2025",
    approvedBy: null,
  },
  {
    title: "Emergency",
    status: "Approved",
    statusColor: "text-emerald-600 bg-emerald-50",
    reason: "Family emergency - Grandfather hospitalized",
    from: "Jan 15, 2025",
    to: "Jan 18, 2025",
    days: 4,
    appliedOn: "Jan 14, 2025",
    approvedBy: "Dr. Sharma (Warden)",
  },
]

export default function LeavePage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Leave Management
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Apply for leave and track your requests
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          Apply Leave
        </button>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className={`flex items-center gap-4 rounded-xl border ${stat.border} bg-card p-5`}
            >
              <div className={`rounded-lg ${stat.bg} p-2.5`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Leave History */}
      <div className="mt-6 rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold text-foreground">Leave History</h2>

        <div className="mt-4 divide-y divide-border">
          {leaveHistory.map((leave) => (
            <div key={leave.title} className="py-5 first:pt-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-bold text-foreground">
                    {leave.title}
                  </h3>
                  <span
                    className={`rounded-full px-3 py-0.5 text-xs font-medium ${leave.statusColor}`}
                  >
                    {leave.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Applied on</p>
                  <p className="text-sm font-medium text-foreground">
                    {leave.appliedOn}
                  </p>
                </div>
              </div>

              <p className="mt-1.5 text-sm text-muted-foreground">
                {leave.reason}
              </p>

              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{leave.from}</span>
                <ChevronRight className="h-4 w-4" />
                <Calendar className="h-4 w-4" />
                <span>{leave.to}</span>
                <span className="text-muted-foreground">
                  ({leave.days} {leave.days === 1 ? "day" : "days"})
                </span>
              </div>

              {leave.approvedBy && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Approved by {leave.approvedBy}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
