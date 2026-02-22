"use client"

import { useState } from "react"
import {
  User,
  Mail,
  Phone,
  Home,
  Calendar,
  GraduationCap,
  Building2,
  MapPin,
  Edit3,
  Save,
  X,
  Shield,
  Users,
  CreditCard,
} from "lucide-react"

const studentInfo = {
  name: "Rahul Sharma",
  studentId: "STU-2024-0156",
  email: "rahul.sharma@college.edu",
  phone: "+91 98765 43210",
  parentPhone: "+91 87654 32109",
  dateOfBirth: "Aug 15, 2003",
  bloodGroup: "B+",
  course: "B.Tech Computer Science",
  year: "2nd Year",
  batch: "2023-2027",
  hostelBlock: "Block A",
  roomNumber: "A-204",
  floor: "2nd Floor",
  roommate: "Arjun K.",
  joinDate: "Aug 1, 2023",
  address: "42, Sector 15, Gurgaon, Haryana - 122001",
  guardianName: "Mr. Suresh Sharma",
  guardianRelation: "Father",
}

const emergencyContacts = [
  {
    name: "Mr. Suresh Sharma",
    relation: "Father",
    phone: "+91 87654 32109",
  },
  {
    name: "Mrs. Priya Sharma",
    relation: "Mother",
    phone: "+91 76543 21098",
  },
]

const feeHistory = [
  {
    semester: "Sem 3 (Current)",
    amount: "12,500",
    status: "Pending",
    dueDate: "Feb 15, 2025",
  },
  {
    semester: "Sem 2",
    amount: "12,000",
    status: "Paid",
    paidDate: "Aug 10, 2024",
  },
  {
    semester: "Sem 1",
    amount: "12,000",
    status: "Paid",
    paidDate: "Feb 5, 2024",
  },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    phone: studentInfo.phone,
    parentPhone: studentInfo.parentPhone,
    address: studentInfo.address,
  })

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View and manage your personal information
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            isEditing
              ? "border border-border text-foreground hover:bg-muted"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {isEditing ? (
            <>
              <X className="h-4 w-4" />
              Cancel
            </>
          ) : (
            <>
              <Edit3 className="h-4 w-4" />
              Edit Profile
            </>
          )}
        </button>
      </div>

      {/* Profile Card */}
      <div className="mt-6 rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <User className="h-12 w-12 text-primary" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-foreground">
              {studentInfo.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {studentInfo.studentId}
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {studentInfo.course}
              </span>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
                {studentInfo.year}
              </span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                {studentInfo.batch}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Personal Information */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <User className="h-5 w-5 text-primary" />
            Personal Information
          </h3>
          <div className="mt-4 space-y-4">
            <InfoRow
              icon={Mail}
              label="Email"
              value={studentInfo.email}
            />
            <InfoRow
              icon={Phone}
              label="Phone"
              value={
                isEditing ? (
                  <input
                    type="text"
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({ ...editData, phone: e.target.value })
                    }
                    className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                ) : (
                  studentInfo.phone
                )
              }
            />
            <InfoRow
              icon={Calendar}
              label="Date of Birth"
              value={studentInfo.dateOfBirth}
            />
            <InfoRow
              icon={Shield}
              label="Blood Group"
              value={studentInfo.bloodGroup}
            />
            <InfoRow
              icon={MapPin}
              label="Address"
              value={
                isEditing ? (
                  <textarea
                    value={editData.address}
                    onChange={(e) =>
                      setEditData({ ...editData, address: e.target.value })
                    }
                    rows={2}
                    className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  />
                ) : (
                  studentInfo.address
                )
              }
            />
          </div>
        </div>

        {/* Hostel Information */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Building2 className="h-5 w-5 text-primary" />
            Hostel Information
          </h3>
          <div className="mt-4 space-y-4">
            <InfoRow
              icon={Home}
              label="Room Number"
              value={studentInfo.roomNumber}
            />
            <InfoRow
              icon={Building2}
              label="Block & Floor"
              value={`${studentInfo.hostelBlock}, ${studentInfo.floor}`}
            />
            <InfoRow
              icon={Users}
              label="Roommate"
              value={studentInfo.roommate}
            />
            <InfoRow
              icon={Calendar}
              label="Join Date"
              value={studentInfo.joinDate}
            />
            <InfoRow
              icon={GraduationCap}
              label="Course"
              value={studentInfo.course}
            />
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Phone className="h-5 w-5 text-red-500" />
            Emergency Contacts
          </h3>
          <div className="mt-4 space-y-4">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.name}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {contact.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {contact.relation}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {contact.phone}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fee History */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <CreditCard className="h-5 w-5 text-amber-600" />
            Fee History
          </h3>
          <div className="mt-4 space-y-3">
            {feeHistory.map((fee) => (
              <div
                key={fee.semester}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {fee.semester}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {fee.status === "Paid"
                      ? `Paid on ${fee.paidDate}`
                      : `Due: ${fee.dueDate}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">
                    {"\u20B9"}{fee.amount}
                  </p>
                  <span
                    className={`text-xs font-medium ${
                      fee.status === "Paid"
                        ? "text-emerald-600"
                        : "text-amber-600"
                    }`}
                  >
                    {fee.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      )}
    </div>
  )
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
      <div className="flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="mt-0.5 text-sm font-medium text-foreground">
          {value}
        </div>
      </div>
    </div>
  )
}
