"use client"

import { useState, useMemo } from "react"
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Users,
  Briefcase,
  BarChart3,
  Shield,
  Clock,
  Settings,
  GraduationCap,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  students,
  jobs,
  branches,
  auditLogs,
  calculateMatchScore,
  checkEligibility,
} from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

function StudentDatabase() {
  const [searchTerm, setSearchTerm] = useState("")
  const [branchFilter, setBranchFilter] = useState("all")
  const [minCGPA, setMinCGPA] = useState("")

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesBranch =
        branchFilter === "all" || student.branch === branchFilter
      const matchesCGPA = !minCGPA || student.cgpa >= Number(minCGPA)
      return matchesSearch && matchesBranch && matchesCGPA
    })
  }, [searchTerm, branchFilter, minCGPA])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Users className="h-5 w-5 text-primary" />
          Student Database
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={branchFilter} onValueChange={setBranchFilter}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Filter by branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              {branches.map((branch) => (
                <SelectItem key={branch} value={branch}>
                  {branch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Min CGPA"
            value={minCGPA}
            onChange={(e) => setMinCGPA(e.target.value)}
            className="w-32"
            step="0.1"
            min="0"
            max="10"
          />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead className="text-center">CGPA</TableHead>
                <TableHead className="text-center">Backlogs</TableHead>
                <TableHead className="text-center">Skills</TableHead>
                <TableHead className="text-center">Readiness</TableHead>
                <TableHead className="text-center">Resume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {student.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {student.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {student.branch}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={
                        student.cgpa >= 8
                          ? "text-sm font-semibold text-success"
                          : student.cgpa >= 7
                            ? "text-sm font-semibold text-foreground"
                            : "text-sm font-semibold text-destructive"
                      }
                    >
                      {student.cgpa}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {student.backlogs === 0 ? (
                      <Badge className="bg-success/10 text-success border-success/20">
                        0
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">
                        {student.backlogs}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">
                    {student.skills.length}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={
                        student.readinessScore >= 80
                          ? "text-sm font-semibold text-success"
                          : student.readinessScore >= 60
                            ? "text-sm font-semibold text-foreground"
                            : "text-sm font-semibold text-destructive"
                      }
                    >
                      {student.readinessScore}%
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {student.resumeUploaded ? (
                      <CheckCircle2 className="h-4 w-4 text-success mx-auto" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground mx-auto" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <p className="text-xs text-muted-foreground">
          Showing {filteredStudents.length} of {students.length} students
        </p>
      </CardContent>
    </Card>
  )
}

function RuleEngine() {
  const [cgpaEnforced, setCgpaEnforced] = useState(true)
  const [backlogRestriction, setBacklogRestriction] = useState(true)
  const [maxAttempts, setMaxAttempts] = useState("3")
  const [minCGPA, setMinCGPA] = useState("7.5")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Settings className="h-5 w-5 text-primary" />
          Rule Engine Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-xl border border-border p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Eligibility Rules
            </h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Enforce CGPA Threshold</p>
                <p className="text-xs text-muted-foreground">
                  Automatically reject candidates below minimum CGPA
                </p>
              </div>
              <Switch
                checked={cgpaEnforced}
                onCheckedChange={setCgpaEnforced}
              />
            </div>
            {cgpaEnforced && (
              <div className="space-y-2">
                <Label>Minimum CGPA</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={minCGPA}
                  onChange={(e) => setMinCGPA(e.target.value)}
                />
              </div>
            )}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Backlog Restriction</p>
                <p className="text-xs text-muted-foreground">
                  Reject candidates with active backlogs
                </p>
              </div>
              <Switch
                checked={backlogRestriction}
                onCheckedChange={setBacklogRestriction}
              />
            </div>
          </div>

          <div className="space-y-4 rounded-xl border border-border p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Attempt Rules
            </h4>
            <div className="space-y-2">
              <Label>Max Placement Attempts</Label>
              <Select value={maxAttempts} onValueChange={setMaxAttempts}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 attempt</SelectItem>
                  <SelectItem value="2">2 attempts</SelectItem>
                  <SelectItem value="3">3 attempts</SelectItem>
                  <SelectItem value="5">5 attempts</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-lg bg-secondary/50 p-3">
              <h5 className="text-xs font-semibold text-foreground mb-2">
                Current Active Rules
              </h5>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {cgpaEnforced ? (
                    <CheckCircle2 className="h-3 w-3 text-success" />
                  ) : (
                    <XCircle className="h-3 w-3 text-muted-foreground" />
                  )}
                  CGPA Enforcement: {cgpaEnforced ? `Min ${minCGPA}` : "Disabled"}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {backlogRestriction ? (
                    <CheckCircle2 className="h-3 w-3 text-success" />
                  ) : (
                    <XCircle className="h-3 w-3 text-muted-foreground" />
                  )}
                  Backlog Restriction:{" "}
                  {backlogRestriction ? "Active" : "Disabled"}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3 text-success" />
                  Max Attempts: {maxAttempts}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="gap-2">
            {saved ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Rules Saved!
              </>
            ) : (
              <>
                <Shield className="h-4 w-4" />
                Save Rules
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function AuditLog() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Clock className="h-5 w-5 text-primary" />
          Audit Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Decision</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                    {log.timestamp}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-foreground">
                    {log.action}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {log.user}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                    {log.decision}
                  </TableCell>
                  <TableCell className="text-center">
                    {log.status === "completed" ? (
                      <Badge className="bg-success/10 text-success border-success/20">
                        Completed
                      </Badge>
                    ) : (
                      <Badge className="bg-warning/10 text-warning-foreground border-warning/20">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Flagged
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

function SystemAnalytics() {
  const totalStudents = students.length
  const eligibleStudents = students.filter(
    (s) => s.cgpa >= 7.5 && s.backlogs === 0
  ).length
  const activeJobs = jobs.length
  const avgMatch = Math.round(
    students.reduce((sum, s) => sum + calculateMatchScore(s, jobs[0]), 0) /
      students.length
  )

  const branchDistribution = useMemo(() => {
    const counts: Record<string, number> = {}
    students.forEach((s) => {
      counts[s.branch] = (counts[s.branch] || 0) + 1
    })
    return Object.entries(counts).map(([name, count]) => ({ name, count }))
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Students"
          value={totalStudents.toString()}
          icon={Users}
          accent="primary"
        />
        <StatCard
          label="Eligible Students"
          value={eligibleStudents.toString()}
          icon={CheckCircle2}
          accent="success"
        />
        <StatCard
          label="Active Jobs"
          value={activeJobs.toString()}
          icon={Briefcase}
          accent="primary"
        />
        <StatCard
          label="Avg Match Score"
          value={`${avgMatch}%`}
          icon={BarChart3}
          accent="success"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BarChart3 className="h-5 w-5 text-primary" />
            Students by Branch
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.01 260)" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid oklch(0.91 0.01 260)",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" fill="oklch(0.45 0.18 264)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface AdminDashboardProps {
  activeSection: string
}

export function AdminDashboard({ activeSection }: AdminDashboardProps) {
  if (activeSection === "students") {
    return <StudentDatabase />
  }

  if (activeSection === "rules") {
    return <RuleEngine />
  }

  if (activeSection === "audit") {
    return <AuditLog />
  }

  if (activeSection === "analytics") {
    return <SystemAnalytics />
  }

  // Default dashboard overview
  const totalStudents = students.length
  const eligibleStudents = students.filter(
    (s) => s.cgpa >= 7.5 && s.backlogs === 0
  ).length
  const activeJobs = jobs.length
  const avgMatch = Math.round(
    students.reduce((sum, s) => sum + calculateMatchScore(s, jobs[0]), 0) /
      students.length
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Students"
          value={totalStudents.toString()}
          icon={Users}
          accent="primary"
        />
        <StatCard
          label="Eligible Students"
          value={eligibleStudents.toString()}
          icon={GraduationCap}
          accent="success"
        />
        <StatCard
          label="Active Jobs"
          value={activeJobs.toString()}
          icon={Briefcase}
          accent="primary"
        />
        <StatCard
          label="Avg Match Score"
          value={`${avgMatch}%`}
          icon={BarChart3}
          accent="success"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StudentDatabase />
        <AuditLog />
      </div>
      <RuleEngine />
    </div>
  )
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string
  value: string
  icon: React.ElementType
  accent: "primary" | "success"
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div
          className={
            accent === "success"
              ? "flex h-11 w-11 items-center justify-center rounded-xl bg-success/10"
              : "flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10"
          }
        >
          <Icon
            className={
              accent === "success"
                ? "h-5 w-5 text-success"
                : "h-5 w-5 text-primary"
            }
          />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}
