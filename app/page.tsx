"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { StudentDashboard } from "@/components/dashboards/student-dashboard"
import { RecruiterDashboard } from "@/components/dashboards/recruiter-dashboard"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"
import { useRole } from "@/lib/role-context"
import { cn } from "@/lib/utils"

export default function Page() {
  const { role } = useRole()
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 lg:relative lg:z-0 transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <AppSidebar
          activeSection={activeSection}
          onSectionChange={(section) => {
            setActiveSection(section)
            setSidebarOpen(false)
          }}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-6">
          {role === "student" && (
            <StudentDashboard activeSection={activeSection} />
          )}
          {role === "recruiter" && (
            <RecruiterDashboard activeSection={activeSection} />
          )}
          {role === "admin" && (
            <AdminDashboard activeSection={activeSection} />
          )}
        </main>
      </div>
    </div>
  )
}
