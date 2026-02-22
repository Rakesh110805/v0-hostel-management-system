"use client"

import { useState } from "react"
import {
  Bell,
  Pin,
  Calendar,
  ChevronDown,
  ChevronUp,
  Megaphone,
  AlertCircle,
  Info,
  PartyPopper,
  Wrench,
} from "lucide-react"

type NoticeType = "Event" | "Maintenance" | "Important" | "General" | "Urgent"

interface Notice {
  id: string
  title: string
  type: NoticeType
  date: string
  postedBy: string
  description: string
  pinned: boolean
}

const typeConfig: Record<
  NoticeType,
  { color: string; bg: string; icon: typeof Bell }
> = {
  Event: { color: "text-purple-600", bg: "bg-purple-50", icon: PartyPopper },
  Maintenance: { color: "text-amber-600", bg: "bg-amber-50", icon: Wrench },
  Important: { color: "text-red-600", bg: "bg-red-50", icon: AlertCircle },
  General: { color: "text-blue-600", bg: "bg-blue-50", icon: Info },
  Urgent: { color: "text-red-600", bg: "bg-red-50", icon: Megaphone },
}

const notices: Notice[] = [
  {
    id: "NTC-001",
    title: "Hostel Day Celebration",
    type: "Event",
    date: "Feb 5, 2025",
    postedBy: "Hostel Warden",
    description:
      "Annual Hostel Day celebration will be held on Feb 10, 2025 in the hostel auditorium. All students are requested to participate in cultural events, games, and the grand dinner. Registration for events is open at the reception desk. Last date for registration is Feb 8, 2025.",
    pinned: true,
  },
  {
    id: "NTC-002",
    title: "Water Supply Maintenance",
    type: "Maintenance",
    date: "Feb 3, 2025",
    postedBy: "Maintenance Dept.",
    description:
      "Water supply will be disrupted on Feb 6, 2025 from 10:00 AM to 4:00 PM due to tank cleaning and pipeline maintenance. Students are advised to store sufficient water beforehand. Drinking water dispensers will remain functional.",
    pinned: true,
  },
  {
    id: "NTC-003",
    title: "Fee Payment Deadline Extended",
    type: "Important",
    date: "Feb 1, 2025",
    postedBy: "Admin Office",
    description:
      "The hostel fee payment deadline has been extended to Feb 20, 2025. Students who have not yet paid their fees are requested to clear the dues at the earliest. Late payment after the extended deadline will attract a penalty of Rs. 500. Payment can be made online through the student portal or at the accounts office.",
    pinned: false,
  },
  {
    id: "NTC-004",
    title: "New Mess Menu Implemented",
    type: "General",
    date: "Jan 30, 2025",
    postedBy: "Mess Committee",
    description:
      "A revised mess menu has been implemented starting from Feb 1, 2025, based on the feedback survey conducted last month. The new menu includes more variety in breakfast items and introduces a special Sunday brunch. Please check the Mess Menu section for the detailed schedule. Feedback forms are available at the mess reception.",
    pinned: false,
  },
  {
    id: "NTC-005",
    title: "Curfew Timing Update",
    type: "Urgent",
    date: "Jan 28, 2025",
    postedBy: "Chief Warden",
    description:
      "Effective immediately, the hostel curfew timing has been updated to 10:30 PM on weekdays and 11:00 PM on weekends. Students found outside the hostel premises after curfew without prior permission will face disciplinary action. For late entry requests, please apply through the student portal at least 24 hours in advance.",
    pinned: false,
  },
  {
    id: "NTC-006",
    title: "Laundry Service Schedule Change",
    type: "General",
    date: "Jan 25, 2025",
    postedBy: "Hostel Admin",
    description:
      "The laundry collection schedule has been changed effective Feb 1. Collection will now happen on Monday, Wednesday, and Friday between 8:00 AM - 10:00 AM. Delivery will be on the next working day by 6:00 PM. Please ensure clothes are properly tagged with your room number.",
    pinned: false,
  },
  {
    id: "NTC-007",
    title: "Sports Tournament Registration Open",
    type: "Event",
    date: "Jan 22, 2025",
    postedBy: "Sports Committee",
    description:
      "Inter-hostel sports tournament registrations are now open for Cricket, Badminton, Table Tennis, and Chess. Register in teams or individually at the sports room (Block C, Ground Floor) before Feb 5, 2025. Matches begin Feb 12. Prizes for top 3 positions in each category.",
    pinned: false,
  },
  {
    id: "NTC-008",
    title: "WiFi Upgrade Scheduled",
    type: "Maintenance",
    date: "Jan 20, 2025",
    postedBy: "IT Department",
    description:
      "WiFi infrastructure upgrade is scheduled for Jan 25-26, 2025. Internet connectivity may be intermittent during this period. The upgrade will increase bandwidth from 100 Mbps to 300 Mbps. Each student will get a dedicated 10 Mbps connection. New login credentials will be sent via email.",
    pinned: false,
  },
]

const filterTypes = [
  "All",
  "Event",
  "Maintenance",
  "Important",
  "General",
  "Urgent",
]

export default function NoticesPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredNotices = notices.filter(
    (n) => activeFilter === "All" || n.type === activeFilter
  )

  const pinnedNotices = filteredNotices.filter((n) => n.pinned)
  const otherNotices = filteredNotices.filter((n) => !n.pinned)

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Notices</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Stay updated with hostel announcements and notices
        </p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl border border-primary/20 bg-card p-5">
          <div className="rounded-lg bg-primary/10 p-2.5">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              {notices.length}
            </p>
            <p className="text-sm text-muted-foreground">Total Notices</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-red-200 bg-card p-5">
          <div className="rounded-lg bg-red-50 p-2.5">
            <Pin className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              {notices.filter((n) => n.pinned).length}
            </p>
            <p className="text-sm text-muted-foreground">Pinned</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-amber-200 bg-card p-5">
          <div className="rounded-lg bg-amber-50 p-2.5">
            <Calendar className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">This Week</p>
            <p className="text-sm text-muted-foreground">Latest Updates</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        {filterTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveFilter(type)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeFilter === type
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Pinned Notices */}
      {pinnedNotices.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-4">
            <Pin className="h-4 w-4 text-red-500" />
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Pinned Notices
            </h2>
          </div>
          <div className="space-y-3">
            {pinnedNotices.map((notice) => {
              const isExpanded = expandedId === notice.id
              const config = typeConfig[notice.type]
              const TypeIcon = config.icon
              return (
                <div
                  key={notice.id}
                  className="rounded-xl border-2 border-primary/20 bg-card overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedId(isExpanded ? null : notice.id)
                    }
                    className="flex w-full items-center justify-between p-5 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`rounded-lg ${config.bg} p-2.5`}>
                        <TypeIcon className={`h-5 w-5 ${config.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-base font-bold text-foreground">
                            {notice.title}
                          </h3>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bg} ${config.color}`}
                          >
                            {notice.type}
                          </span>
                          <Pin className="h-3.5 w-3.5 text-red-400" />
                        </div>
                        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {notice.date}
                          </span>
                          <span>{"·"}</span>
                          <span>Posted by {notice.postedBy}</span>
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
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {notice.description}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Other Notices */}
      <div className="mt-6">
        {pinnedNotices.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              All Notices
            </h2>
          </div>
        )}
        <div className="space-y-3">
          {otherNotices.map((notice) => {
            const isExpanded = expandedId === notice.id
            const config = typeConfig[notice.type]
            const TypeIcon = config.icon
            return (
              <div
                key={notice.id}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedId(isExpanded ? null : notice.id)
                  }
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`rounded-lg ${config.bg} p-2.5`}>
                      <TypeIcon className={`h-5 w-5 ${config.color}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-base font-bold text-foreground">
                          {notice.title}
                        </h3>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bg} ${config.color}`}
                        >
                          {notice.type}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {notice.date}
                        </span>
                        <span>{"·"}</span>
                        <span>Posted by {notice.postedBy}</span>
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
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {notice.description}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
