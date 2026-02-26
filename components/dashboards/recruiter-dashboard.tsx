"use client"

import { useState, useMemo } from "react"
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Briefcase,
  Users,
  BarChart3,
  Star,
  PlusCircle,
  Trophy,
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
  allSkills,
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
  PieChart,
  Pie,
  Cell,
} from "recharts"

function PostJobForm({ onClose }: { onClose: () => void }) {
  const [isPosting, setIsPosting] = useState(false)
  const [posted, setPosted] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsPosting(true)
    setTimeout(() => {
      setIsPosting(false)
      setPosted(true)
      setTimeout(() => onClose(), 1500)
    }, 2000)
  }

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  if (posted) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Job Posted Successfully!
          </h3>
          <p className="text-sm text-muted-foreground">
            AI matching has been initiated for all eligible candidates.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <PlusCircle className="h-5 w-5 text-primary" />
          Post New Job
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input placeholder="e.g. Software Engineer" required />
            </div>
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input placeholder="e.g. TechNova Solutions" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Required Skills (click to select)</Label>
            <div className="flex flex-wrap gap-2 rounded-lg border border-input p-3 min-h-[60px]">
              {allSkills.slice(0, 15).map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={
                    selectedSkills.includes(skill)
                      ? "rounded-md bg-primary text-primary-foreground px-2.5 py-1 text-xs font-medium transition-colors"
                      : "rounded-md bg-secondary text-secondary-foreground px-2.5 py-1 text-xs font-medium transition-colors hover:bg-secondary/80"
                  }
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>Minimum CGPA</Label>
              <Input type="number" step="0.1" min="0" max="10" placeholder="7.5" required />
            </div>
            <div className="space-y-2">
              <Label>Branch</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch} value={branch}>
                      {branch}
                    </SelectItem>
                  ))}
                  <SelectItem value="all">All Branches</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Experience</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Fresher (0 years)</SelectItem>
                  <SelectItem value="0-1">0-1 years</SelectItem>
                  <SelectItem value="1-2">1-2 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Switch id="backlog" />
            <Label htmlFor="backlog">Allow candidates with backlogs</Label>
          </div>

          <Button type="submit" disabled={isPosting} className="w-full gap-2">
            {isPosting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Posting & Initiating AI Match...
              </>
            ) : (
              <>
                <PlusCircle className="h-4 w-4" />
                Post Job & Start AI Matching
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function CandidateShortlist() {
  const [selectedJob, setSelectedJob] = useState(jobs[0])
  const [shortlisted, setShortlisted] = useState<number[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleJobChange = (jobId: string) => {
    setIsAnalyzing(true)
    setShortlisted([])
    const found = jobs.find((j) => j.id === Number(jobId))
    setTimeout(() => {
      if (found) setSelectedJob(found)
      setIsAnalyzing(false)
    }, 1500)
  }

  const candidates = useMemo(() => {
    return students
      .map((student) => {
        const matchScore = calculateMatchScore(student, selectedJob)
        const eligibility = checkEligibility(student, selectedJob)
        return { ...student, matchScore, ...eligibility }
      })
      .sort((a, b) => b.matchScore - a.matchScore)
  }, [selectedJob])

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Trophy className="h-5 w-5 text-primary" />
            AI Candidate Shortlist
          </CardTitle>
          <Select
            value={String(selectedJob.id)}
            onValueChange={handleJobChange}
          >
            <SelectTrigger className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {jobs.map((job) => (
                <SelectItem key={job.id} value={String(job.id)}>
                  {job.title} - {job.company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground font-medium">
              AI analyzing candidates for {selectedJob.title}...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Rank</TableHead>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead className="text-center">CGPA</TableHead>
                  <TableHead className="text-center">Match</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidates.map((candidate, idx) => (
                  <TableRow key={candidate.id}>
                    <TableCell className="font-semibold text-muted-foreground">
                      #{idx + 1}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {candidate.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {candidate.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {candidate.branch}
                    </TableCell>
                    <TableCell className="text-center text-sm font-medium">
                      {candidate.cgpa}
                    </TableCell>
                    <TableCell className="text-center">
                      <span
                        className={
                          candidate.matchScore >= 70
                            ? "text-sm font-bold text-success"
                            : candidate.matchScore >= 50
                              ? "text-sm font-bold text-warning-foreground"
                              : "text-sm font-bold text-destructive"
                        }
                      >
                        {candidate.matchScore}%
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {candidate.eligible ? (
                        <Badge className="bg-success/10 text-success border-success/20">
                          Eligible
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">
                          Not Eligible
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {candidate.eligible && (
                        <Button
                          size="sm"
                          variant={
                            shortlisted.includes(candidate.id)
                              ? "secondary"
                              : "default"
                          }
                          onClick={() =>
                            setShortlisted((prev) =>
                              prev.includes(candidate.id)
                                ? prev.filter((id) => id !== candidate.id)
                                : [...prev, candidate.id]
                            )
                          }
                          className="gap-1 text-xs"
                        >
                          {shortlisted.includes(candidate.id) ? (
                            <>
                              <CheckCircle2 className="h-3 w-3" />
                              Shortlisted
                            </>
                          ) : (
                            <>
                              <Star className="h-3 w-3" />
                              Shortlist
                            </>
                          )}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

const CHART_COLORS = [
  "oklch(0.45 0.18 264)",
  "oklch(0.55 0.20 160)",
  "oklch(0.65 0.18 45)",
  "oklch(0.55 0.15 300)",
  "oklch(0.60 0.20 30)",
]

function RecruiterAnalytics() {
  const skillDistribution = useMemo(() => {
    const skillCounts: Record<string, number> = {}
    students.forEach((student) => {
      student.skills.forEach((skill) => {
        skillCounts[skill.name] = (skillCounts[skill.name] || 0) + 1
      })
    })
    return Object.entries(skillCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)
  }, [])

  const scoreDistribution = useMemo(() => {
    const job = jobs[0]
    const ranges = [
      { range: "0-20%", min: 0, max: 20, count: 0 },
      { range: "21-40%", min: 21, max: 40, count: 0 },
      { range: "41-60%", min: 41, max: 60, count: 0 },
      { range: "61-80%", min: 61, max: 80, count: 0 },
      { range: "81-100%", min: 81, max: 100, count: 0 },
    ]
    students.forEach((student) => {
      const score = calculateMatchScore(student, job)
      const range = ranges.find((r) => score >= r.min && score <= r.max)
      if (range) range.count++
    })
    return ranges
  }, [])

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BarChart3 className="h-5 w-5 text-primary" />
            Skill Distribution Across Candidates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.01 260)" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  angle={-30}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 11 }} />
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BarChart3 className="h-5 w-5 text-primary" />
            Match Score Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={scoreDistribution}
                  dataKey="count"
                  nameKey="range"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ range, count }) => `${range}: ${count}`}
                  labelLine={true}
                >
                  {scoreDistribution.map((_, idx) => (
                    <Cell
                      key={idx}
                      fill={CHART_COLORS[idx % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid oklch(0.91 0.01 260)",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface RecruiterDashboardProps {
  activeSection: string
}

export function RecruiterDashboard({ activeSection }: RecruiterDashboardProps) {
  const [showPostForm, setShowPostForm] = useState(false)

  if (activeSection === "post-job" || showPostForm) {
    return <PostJobForm onClose={() => setShowPostForm(false)} />
  }

  if (activeSection === "shortlist") {
    return <CandidateShortlist />
  }

  if (activeSection === "analytics") {
    return <RecruiterAnalytics />
  }

  const totalCandidates = students.length
  const eligibleForFirstJob = students.filter(
    (s) => checkEligibility(s, jobs[0]).eligible
  ).length
  const avgMatch = Math.round(
    students.reduce((sum, s) => sum + calculateMatchScore(s, jobs[0]), 0) /
      students.length
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Active Jobs"
          value={jobs.length.toString()}
          icon={Briefcase}
          accent="primary"
        />
        <StatCard
          label="Total Candidates"
          value={totalCandidates.toString()}
          icon={Users}
          accent="primary"
        />
        <StatCard
          label="Eligible Candidates"
          value={eligibleForFirstJob.toString()}
          icon={CheckCircle2}
          accent="success"
        />
        <StatCard
          label="Avg Match Score"
          value={`${avgMatch}%`}
          icon={BarChart3}
          accent="success"
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={() => setShowPostForm(true)} className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Post New Job
        </Button>
      </div>
      <CandidateShortlist />
      <RecruiterAnalytics />
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
