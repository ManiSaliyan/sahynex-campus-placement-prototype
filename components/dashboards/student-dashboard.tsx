"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Upload,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
  Sparkles,
  TrendingUp,
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
  FileCheck,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  students,
  jobs,
  calculateMatchScore,
  checkEligibility,
  skillGapSuggestions,
} from "@/lib/mock-data"

const currentStudent = students[0]

function ProfileOverview() {
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(currentStudent.resumeUploaded)

  const handleUpload = useCallback(() => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setIsAnalyzing(true)
      setTimeout(() => {
        setIsAnalyzing(false)
        setUploadComplete(true)
      }, 2500)
    }, 1500)
  }, [])

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <GraduationCap className="h-5 w-5 text-primary" />
          Profile Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary text-xl font-bold">
            {currentStudent.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {currentStudent.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {currentStudent.email}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5">
                <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm text-secondary-foreground">{currentStudent.branch}</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm text-secondary-foreground">CGPA: {currentStudent.cgpa}</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5">
                {currentStudent.backlogs === 0 ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                ) : (
                  <AlertTriangle className="h-3.5 w-3.5 text-warning" />
                )}
                <span className="text-sm text-secondary-foreground">
                  {currentStudent.backlogs === 0
                    ? "No Backlogs"
                    : `${currentStudent.backlogs} Backlog(s)`}
                </span>
              </div>
            </div>
          </div>
          <div className="shrink-0">
            {isAnalyzing ? (
              <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2.5 text-primary">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">AI analyzing resume...</span>
              </div>
            ) : isUploading ? (
              <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2.5 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Uploading...</span>
              </div>
            ) : uploadComplete ? (
              <div className="flex items-center gap-2 rounded-lg bg-success/10 px-4 py-2.5 text-success">
                <FileCheck className="h-4 w-4" />
                <span className="text-sm font-medium">Resume Uploaded</span>
              </div>
            ) : (
              <Button onClick={handleUpload} className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Resume
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SkillProfile() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Skill Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currentStudent.skills.map((skill) => (
            <div key={skill.name} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  {skill.name}
                </span>
                <span className="text-sm font-semibold text-primary">
                  {skill.strength}%
                </span>
              </div>
              <Progress value={skill.strength} className="h-2" />
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {currentStudent.skills.map((skill) => (
            <Badge key={skill.name} variant="secondary" className="text-xs">
              {skill.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function JobRecommendations() {
  const recommendations = jobs.map((job) => {
    const matchScore = calculateMatchScore(currentStudent, job)
    const eligibility = checkEligibility(currentStudent, job)
    return { ...job, matchScore, ...eligibility }
  }).sort((a, b) => b.matchScore - a.matchScore)

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <BriefcaseBusiness className="h-5 w-5 text-primary" />
          Job Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.map((job) => (
            <div
              key={job.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border bg-secondary/30 p-4 transition-colors hover:bg-secondary/50"
            >
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-semibold text-foreground">
                    {job.title}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {job.company}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-muted-foreground">{job.salary}</span>
                  <span className="text-xs text-muted-foreground">{"/"}</span>
                  <span className="text-xs text-muted-foreground">{job.experience}</span>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {job.requiredSkills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-[10px] px-1.5 py-0">
                      {skill}
                    </Badge>
                  ))}
                  {job.requiredSkills.length > 3 && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      +{job.requiredSkills.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">
                    {job.matchScore}%
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Match
                  </div>
                </div>
                {job.eligible ? (
                  <Badge className="bg-success text-success-foreground gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Eligible
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="gap-1">
                    <XCircle className="h-3 w-3" />
                    Not Eligible
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ReadinessScore() {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(currentStudent.readinessScore)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const weakSkills = currentStudent.skills
    .filter((s) => s.strength < 75)
    .sort((a, b) => a.strength - b.strength)

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUp className="h-5 w-5 text-primary" />
          Placement Readiness
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4 pb-4">
          <div className="relative flex h-32 w-32 items-center justify-center">
            <svg className="h-32 w-32 -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                className="text-secondary"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                className="text-primary transition-all duration-1000 ease-out"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${animatedScore * 2.64} 264`}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground">
                {animatedScore}%
              </span>
              <span className="text-xs text-muted-foreground">Ready</span>
            </div>
          </div>
          <Badge
            variant="secondary"
            className={
              animatedScore >= 80
                ? "bg-success/10 text-success"
                : animatedScore >= 60
                  ? "bg-warning/10 text-warning-foreground"
                  : "bg-destructive/10 text-destructive"
            }
          >
            {animatedScore >= 80
              ? "Highly Prepared"
              : animatedScore >= 60
                ? "Moderately Prepared"
                : "Needs Improvement"}
          </Badge>
        </div>

        {weakSkills.length > 0 && (
          <div className="space-y-3 border-t border-border pt-4">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Skill Gap Suggestions
            </h4>
            {weakSkills.map((skill) => (
              <div
                key={skill.name}
                className="rounded-lg bg-secondary/50 p-3 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {skill.name}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {skill.strength}%
                  </Badge>
                </div>
                {skillGapSuggestions[skill.name]?.map((suggestion, i) => (
                  <p
                    key={i}
                    className="text-xs text-muted-foreground flex items-start gap-1.5"
                  >
                    <span className="text-primary mt-0.5">{">"}</span>
                    {suggestion}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface StudentDashboardProps {
  activeSection: string
}

export function StudentDashboard({ activeSection }: StudentDashboardProps) {
  if (activeSection === "skills") {
    return (
      <div className="space-y-6">
        <ProfileOverview />
        <SkillProfile />
      </div>
    )
  }

  if (activeSection === "jobs") {
    return (
      <div className="space-y-6">
        <JobRecommendations />
      </div>
    )
  }

  if (activeSection === "readiness") {
    return (
      <div className="max-w-lg mx-auto">
        <ReadinessScore />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="CGPA"
          value={currentStudent.cgpa.toString()}
          icon={GraduationCap}
          accent="primary"
        />
        <StatCard
          label="Readiness Score"
          value={`${currentStudent.readinessScore}%`}
          icon={TrendingUp}
          accent="success"
        />
        <StatCard
          label="Skills Extracted"
          value={currentStudent.skills.length.toString()}
          icon={Sparkles}
          accent="primary"
        />
        <StatCard
          label="Job Matches"
          value={jobs.filter(j => checkEligibility(currentStudent, j).eligible).length.toString()}
          icon={BriefcaseBusiness}
          accent="success"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProfileOverview />
        <ReadinessScore />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SkillProfile />
        <JobRecommendations />
      </div>
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
