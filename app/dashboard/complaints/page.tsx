"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Send,
  Filter,
  Search,
} from "lucide-react"

type ComplaintStatus = "In Progress" | "Resolved" | "Pending" | "Rejected"

interface Complaint {
  id: string
  title: string
  category: string
  description: string
  date: string
  status: ComplaintStatus
  priority: "High" | "Medium" | "Low"
  response?: string
  respondedBy?: string
  respondedOn?: string
}

const statusConfig: Record<
  ComplaintStatus,
  { color: string; bg: string; icon: typeof Clock }
> = {
  "In Progress": { color: "text-blue-600", bg: "bg-blue-50", icon: Clock },
  Resolved: {
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    icon: CheckCircle2,
  },
  Pending: { color: "text-amber-600", bg: "bg-amber-50", icon: Clock },
  Rejected: { color: "text-red-600", bg: "bg-red-50", icon: XCircle },
}

const priorityConfig: Record<string, { color: string; bg: string }> = {
  High: { color: "text-red-600", bg: "bg-red-50" },
  Medium: { color: "text-amber-600", bg: "bg-amber-50" },
  Low: { color: "text-emerald-600", bg: "bg-emerald-50" },
}

const stats = [
  {
    value: "3",
    label: "Total Complaints",
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    value: "1",
    label: "In Progress",
    icon: Clock,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    value: "1",
    label: "Resolved",
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
]

const complaints: Complaint[] = [
  {
    id: "CMP-001",
    title: "AC not working",
    category: "Electrical",
    description:
      "The air conditioner in room A-204 has stopped working since last night. The room temperature is very high and it is difficult to sleep or study.",
    date: "Jan 28, 2025",
    status: "In Progress",
    priority: "High",
    response:
      "Maintenance team has been assigned. Expected resolution by Feb 2.",
    respondedBy: "Maintenance Dept.",
    respondedOn: "Jan 29, 2025",
  },
  {
    id: "CMP-002",
    title: "Water leakage in bathroom",
    category: "Plumbing",
    description:
      "There is a continuous water leakage from the bathroom tap. Water is getting wasted and the floor remains wet all the time, making it slippery.",
    date: "Jan 25, 2025",
    status: "Resolved",
    priority: "Medium",
    response:
      "The tap washer has been replaced and leakage has been fixed. Please report if the issue persists.",
    respondedBy: "Plumbing Team",
    respondedOn: "Jan 27, 2025",
  },
  {
    id: "CMP-003",
    title: "Broken window latch",
    category: "Furniture",
    description:
      "The window latch in room A-204 is broken. The window cannot be closed properly which is a security concern especially at night.",
    date: "Jan 20, 2025",
    status: "Pending",
    priority: "Medium",
  },
  {
    id: "CMP-004",
    title: "WiFi connectivity issues",
    category: "Network",
    description:
      "The WiFi in Block A, 2nd floor has been extremely slow for the past week. Speed tests show less than 1 Mbps during peak hours.",
    date: "Jan 18, 2025",
    status: "Resolved",
    priority: "High",
    response:
      "Router has been upgraded and bandwidth allocation increased for Block A. Please check the connectivity now.",
    respondedBy: "IT Department",
    respondedOn: "Jan 22, 2025",
  },
  {
    id: "CMP-005",
    title: "Pest control needed",
    category: "Hygiene",
    description:
      "There are cockroaches spotted frequently in the room and corridor area of Block A, 2nd floor. Pest control service is urgently needed.",
    date: "Jan 15, 2025",
    status: "Rejected",
    priority: "Low",
    response:
      "Pest control is scheduled monthly. Next session is on Feb 1. Please use the pest repellent provided at the reception.",
    respondedBy: "Hostel Admin",
    respondedOn: "Jan 16, 2025",
  },
]

const categories = [
  "All",
  "Electrical",
  "Plumbing",
  "Furniture",
  "Network",
  "Hygiene",
]

export default function ComplaintsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewForm, setShowNewForm] = useState(false)
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    category: "Electrical",
    description: "",
    priority: "Medium" as "High" | "Medium" | "Low",
  })

  const filteredComplaints = complaints.filter((c) => {
    const matchesStatus = filterStatus === "All" || c.status === filterStatus
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Complaint Management
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            File and track your hostel complaints
          </p>
        </div>
        <button
          onClick={() => setShowNewForm(!showNewForm)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Complaint
        </button>
      </div>

      {/* New Complaint Form */}
      {showNewForm && (
        <div className="mt-6 rounded-xl border border-primary/30 bg-card p-6">
          <h2 className="text-lg font-bold text-foreground">
            File New Complaint
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground">
                Title
              </label>
              <input
                type="text"
                value={newComplaint.title}
                onChange={(e) =>
                  setNewComplaint({ ...newComplaint, title: e.target.value })
                }
                placeholder="Brief description of the issue"
                className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                Category
              </label>
              <select
                value={newComplaint.category}
                onChange={(e) =>
                  setNewComplaint({
                    ...newComplaint,
                    category: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {categories.filter((c) => c !== "All").map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                Priority
              </label>
              <select
                value={newComplaint.priority}
                onChange={(e) =>
                  setNewComplaint({
                    ...newComplaint,
                    priority: e.target.value as "High" | "Medium" | "Low",
                  })
                }
                className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-foreground">
                Description
              </label>
              <textarea
                value={newComplaint.description}
                onChange={(e) =>
                  setNewComplaint({
                    ...newComplaint,
                    description: e.target.value,
                  })
                }
                rows={3}
                placeholder="Describe the issue in detail..."
                className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              <Send className="h-4 w-4" />
              Submit Complaint
            </button>
            <button
              onClick={() => setShowNewForm(false)}
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
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

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search complaints..."
            className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex gap-2">
            {["All", "In Progress", "Pending", "Resolved", "Rejected"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    filterStatus === status
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {status}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Complaint List */}
      <div className="mt-6 space-y-4">
        {filteredComplaints.map((complaint) => {
          const isExpanded = expandedId === complaint.id
          const statusInfo = statusConfig[complaint.status]
          const StatusIcon = statusInfo.icon
          const priorityInfo = priorityConfig[complaint.priority]

          return (
            <div
              key={complaint.id}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedId(isExpanded ? null : complaint.id)
                }
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-amber-50 p-2.5">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-bold text-foreground">
                        {complaint.title}
                      </h3>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusInfo.bg} ${statusInfo.color}`}
                      >
                        {complaint.status}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityInfo.bg} ${priorityInfo.color}`}
                      >
                        {complaint.priority}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{complaint.id}</span>
                      <span>{"·"}</span>
                      <span>{complaint.category}</span>
                      <span>{"·"}</span>
                      <span>{complaint.date}</span>
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>

              {isExpanded && (
                <div className="border-t border-border px-5 pb-5 pt-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">
                      Description
                    </h4>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {complaint.description}
                    </p>
                  </div>

                  {complaint.response && (
                    <div className="mt-4 rounded-lg bg-muted/50 p-4">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-primary" />
                        <h4 className="text-sm font-semibold text-foreground">
                          Response
                        </h4>
                      </div>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                        {complaint.response}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>By {complaint.respondedBy}</span>
                        <span>{"·"}</span>
                        <span>{complaint.respondedOn}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
