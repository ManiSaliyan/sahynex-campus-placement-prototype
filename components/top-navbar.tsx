"use client"

import { Bell, Search, Menu } from "lucide-react"
import { useRole } from "@/lib/role-context"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface TopNavbarProps {
  onToggleSidebar?: () => void
}

export function TopNavbar({ onToggleSidebar }: TopNavbarProps) {
  const { role } = useRole()

  const title =
    role === "student"
      ? "Student Dashboard"
      : role === "recruiter"
        ? "Recruiter Dashboard"
        : "Placement Officer Dashboard"

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-muted-foreground hover:text-foreground"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </button>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <Badge variant="secondary" className="text-xs">
          {role === "student"
            ? "2025-26 Batch"
            : role === "recruiter"
              ? "Active Hiring"
              : "Admin Access"}
        </Badge>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="w-64 pl-9 bg-secondary border-none"
          />
        </div>
        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-medium">
            3
          </span>
          <span className="sr-only">Notifications</span>
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
          {role === "student" ? "AS" : role === "recruiter" ? "TN" : "PO"}
        </div>
      </div>
    </header>
  )
}
