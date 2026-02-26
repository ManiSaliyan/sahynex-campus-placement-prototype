"use client"

import {
  Brain,
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Settings,
  Shield,
  BarChart3,
  ClipboardList,
  UserCheck,
  BookOpen,
} from "lucide-react"
import { useRole, type Role } from "@/lib/role-context"
import { cn } from "@/lib/utils"

const roleConfig: Record<
  Role,
  {
    label: string
    navItems: { label: string; icon: React.ElementType; id: string }[]
  }
> = {
  student: {
    label: "Student Portal",
    navItems: [
      { label: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
      { label: "AI Skill Profile", icon: Brain, id: "skills" },
      { label: "Job Recommendations", icon: Briefcase, id: "jobs" },
      { label: "Readiness Score", icon: BarChart3, id: "readiness" },
    ],
  },
  recruiter: {
    label: "Recruiter Portal",
    navItems: [
      { label: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
      { label: "Post New Job", icon: FileText, id: "post-job" },
      { label: "AI Shortlist", icon: UserCheck, id: "shortlist" },
      { label: "Analytics", icon: BarChart3, id: "analytics" },
    ],
  },
  admin: {
    label: "Admin Portal",
    navItems: [
      { label: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
      { label: "Student Database", icon: Users, id: "students" },
      { label: "Rule Engine", icon: Settings, id: "rules" },
      { label: "Audit Logs", icon: ClipboardList, id: "audit" },
      { label: "Analytics", icon: BarChart3, id: "analytics" },
    ],
  },
}

const roleLabels: Record<Role, { label: string; icon: React.ElementType }> = {
  student: { label: "Student", icon: BookOpen },
  recruiter: { label: "Recruiter", icon: Briefcase },
  admin: { label: "Placement Officer", icon: Shield },
}

interface AppSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function AppSidebar({
  activeSection,
  onSectionChange,
}: AppSidebarProps) {
  const { role, setRole } = useRole()
  const config = roleConfig[role]

  return (
    <aside className="flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
          <Brain className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-sidebar-foreground">PlaceAI</h1>
          <p className="text-xs text-sidebar-foreground/60">Intelligent Placement</p>
        </div>
      </div>

      <div className="px-4 py-4">
        <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/40">
          Switch Role
        </p>
        <div className="flex flex-col gap-1">
          {(Object.keys(roleLabels) as Role[]).map((r) => {
            const Icon = roleLabels[r].icon
            return (
              <button
                key={r}
                onClick={() => {
                  setRole(r)
                  onSectionChange("dashboard")
                }}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                  role === r
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {roleLabels[r].label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="border-t border-sidebar-border mx-4" />

      <nav className="flex-1 px-4 py-4">
        <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/40">
          {config.label}
        </p>
        <div className="flex flex-col gap-1">
          {config.navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                  activeSection === item.id
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            )
          })}
        </div>
      </nav>

      <div className="border-t border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold">
            {role === "student" ? "AS" : role === "recruiter" ? "TN" : "PO"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {role === "student"
                ? "Aarav Sharma"
                : role === "recruiter"
                  ? "TechNova HR"
                  : "Dr. Admin"}
            </p>
            <p className="text-xs text-sidebar-foreground/50 truncate">
              {roleLabels[role].label}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
