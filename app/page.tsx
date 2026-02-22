"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  GraduationCap,
  Shield,
  KeyRound,
  Eye,
  EyeOff,
  Building2,
} from "lucide-react"

type Role = "student" | "warden" | "admin"

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<Role>("student")
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  const roles: { id: Role; label: string; icon: React.ReactNode }[] = [
    {
      id: "student",
      label: "Student",
      icon: <GraduationCap className="h-6 w-6" />,
    },
    {
      id: "warden",
      label: "Warden",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      id: "admin",
      label: "Admin",
      icon: <KeyRound className="h-6 w-6" />,
    },
  ]

  const placeholders: Record<Role, string> = {
    student: "Enter your email or student ID",
    warden: "Enter your email or warden ID",
    admin: "Enter your email or admin ID",
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-[#3366FF] via-[#2952CC] to-[#40C9A2] p-10 lg:flex">
        {/* Grid pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                College Hostel Hub
              </h2>
              <p className="text-sm text-white/80">
                Centralized Hostel Management
              </p>
            </div>
          </div>

          {/* Main heading */}
          <div className="mt-16">
            <h1 className="text-4xl font-bold leading-tight text-white">
              Simplify Your
              <br />
              Hostel Experience
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/80">
              One platform for all your hostel needs - from room management to
              mess menu, complaints to leave requests.
            </p>
          </div>
        </div>

        {/* Feature bullets */}
        <div className="relative z-10">
          <div className="grid grid-cols-2 gap-x-12 gap-y-4">
            {[
              "Room Management",
              "Fee Tracking",
              "Complaint System",
              "Mess Menu",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white" />
                <span className="text-sm font-medium text-white">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex w-full flex-col items-center justify-center px-6 lg:w-1/2 lg:px-16">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Select your role and sign in to continue
          </p>

          {/* Role Selection */}
          <div className="mt-8 flex gap-4">
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`flex flex-1 flex-col items-center gap-2 rounded-xl border-2 px-4 py-4 transition-all ${
                  selectedRole === role.id
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30"
                }`}
              >
                {role.icon}
                <span className="text-sm font-medium">{role.label}</span>
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Email / ID */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Email or ID
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholders[selectedRole]}
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me / Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary accent-primary"
                />
                <span className="text-sm text-muted-foreground">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Sign in as{" "}
              {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {"Need help? "}
            <button className="font-medium text-primary hover:underline">
              Contact IT Support
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
