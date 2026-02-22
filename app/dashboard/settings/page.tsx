"use client"

import { useState } from "react"
import {
  Settings,
  Bell,
  Moon,
  Shield,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  Save,
  Key,
  Globe,
  Volume2,
} from "lucide-react"

export default function SettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    complaints: true,
    leave: true,
    notices: true,
    mess: false,
  })
  const [preferences, setPreferences] = useState({
    language: "English",
    darkMode: false,
    compactView: false,
  })

  function toggleNotification(key: keyof typeof notifications) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account preferences and security
        </p>
      </div>

      <div className="mt-6 space-y-6">
        {/* Notification Settings */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Bell className="h-5 w-5 text-primary" />
            Notification Settings
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose what notifications you receive
          </p>

          <div className="mt-5 space-y-4">
            <ToggleRow
              icon={Mail}
              label="Email Notifications"
              description="Receive updates and alerts via email"
              checked={notifications.email}
              onToggle={() => toggleNotification("email")}
            />
            <ToggleRow
              icon={Smartphone}
              label="Push Notifications"
              description="Get real-time push notifications"
              checked={notifications.push}
              onToggle={() => toggleNotification("push")}
            />
            <div className="border-t border-border pt-4">
              <p className="mb-3 text-sm font-semibold text-foreground">
                Notification Categories
              </p>
              <div className="space-y-3">
                <ToggleRow
                  label="Complaint Updates"
                  description="Status changes on your complaints"
                  checked={notifications.complaints}
                  onToggle={() => toggleNotification("complaints")}
                />
                <ToggleRow
                  label="Leave Approvals"
                  description="Approval or rejection of leave requests"
                  checked={notifications.leave}
                  onToggle={() => toggleNotification("leave")}
                />
                <ToggleRow
                  label="New Notices"
                  description="Important hostel announcements"
                  checked={notifications.notices}
                  onToggle={() => toggleNotification("notices")}
                />
                <ToggleRow
                  label="Mess Menu Updates"
                  description="Daily menu changes and special meals"
                  checked={notifications.mess}
                  onToggle={() => toggleNotification("mess")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Shield className="h-5 w-5 text-primary" />
            Security
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Update your password and security preferences
          </p>

          <div className="mt-5 space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Key className="h-4 w-4" />
              Change Password
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Current Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowCurrentPassword(!showCurrentPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  New Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              <Key className="h-4 w-4" />
              Update Password
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Settings className="h-5 w-5 text-primary" />
            Preferences
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Customize your app experience
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Globe className="h-4 w-4 text-muted-foreground" />
                Language
              </label>
              <select
                value={preferences.language}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    language: e.target.value,
                  })
                }
                className="mt-1 w-full max-w-xs rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Tamil</option>
                <option>Telugu</option>
                <option>Kannada</option>
              </select>
            </div>
            <ToggleRow
              icon={Moon}
              label="Dark Mode"
              description="Switch to dark theme"
              checked={preferences.darkMode}
              onToggle={() =>
                setPreferences({
                  ...preferences,
                  darkMode: !preferences.darkMode,
                })
              }
            />
            <ToggleRow
              icon={Volume2}
              label="Compact View"
              description="Reduce spacing for more content"
              checked={preferences.compactView}
              onToggle={() =>
                setPreferences({
                  ...preferences,
                  compactView: !preferences.compactView,
                })
              }
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Save className="h-4 w-4" />
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  )
}

function ToggleRow({
  icon: Icon,
  label,
  description,
  checked,
  onToggle,
}: {
  icon?: typeof Bell
  label: string
  description: string
  checked: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-muted-foreground/30"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
        <span className="sr-only">
          Toggle {label}
        </span>
      </button>
    </div>
  )
}
