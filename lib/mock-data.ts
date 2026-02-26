export const students = [
  {
    id: 1,
    name: "Aarav Sharma",
    branch: "Computer Science",
    cgpa: 8.7,
    backlogs: 0,
    email: "aarav.s@university.edu",
    skills: [
      { name: "Python", strength: 92 },
      { name: "Machine Learning", strength: 85 },
      { name: "SQL", strength: 78 },
      { name: "Java", strength: 70 },
      { name: "React", strength: 65 },
    ],
    readinessScore: 82,
    resumeUploaded: true,
  },
  {
    id: 2,
    name: "Priya Patel",
    branch: "Information Technology",
    cgpa: 9.1,
    backlogs: 0,
    email: "priya.p@university.edu",
    skills: [
      { name: "Java", strength: 95 },
      { name: "Spring Boot", strength: 88 },
      { name: "SQL", strength: 90 },
      { name: "Docker", strength: 72 },
      { name: "AWS", strength: 60 },
    ],
    readinessScore: 91,
    resumeUploaded: true,
  },
  {
    id: 3,
    name: "Rohan Gupta",
    branch: "Electronics",
    cgpa: 7.4,
    backlogs: 1,
    email: "rohan.g@university.edu",
    skills: [
      { name: "C++", strength: 80 },
      { name: "MATLAB", strength: 75 },
      { name: "Python", strength: 60 },
      { name: "Embedded Systems", strength: 85 },
      { name: "VHDL", strength: 70 },
    ],
    readinessScore: 64,
    resumeUploaded: false,
  },
  {
    id: 4,
    name: "Sneha Reddy",
    branch: "Computer Science",
    cgpa: 8.3,
    backlogs: 0,
    email: "sneha.r@university.edu",
    skills: [
      { name: "JavaScript", strength: 90 },
      { name: "React", strength: 88 },
      { name: "Node.js", strength: 82 },
      { name: "TypeScript", strength: 78 },
      { name: "MongoDB", strength: 70 },
    ],
    readinessScore: 78,
    resumeUploaded: true,
  },
  {
    id: 5,
    name: "Vikram Singh",
    branch: "Mechanical",
    cgpa: 7.8,
    backlogs: 0,
    email: "vikram.s@university.edu",
    skills: [
      { name: "AutoCAD", strength: 90 },
      { name: "SolidWorks", strength: 85 },
      { name: "Python", strength: 55 },
      { name: "MATLAB", strength: 75 },
      { name: "FEA", strength: 80 },
    ],
    readinessScore: 71,
    resumeUploaded: true,
  },
  {
    id: 6,
    name: "Ananya Mishra",
    branch: "Information Technology",
    cgpa: 8.9,
    backlogs: 0,
    email: "ananya.m@university.edu",
    skills: [
      { name: "Python", strength: 88 },
      { name: "Data Science", strength: 85 },
      { name: "TensorFlow", strength: 80 },
      { name: "SQL", strength: 82 },
      { name: "Tableau", strength: 75 },
    ],
    readinessScore: 86,
    resumeUploaded: true,
  },
  {
    id: 7,
    name: "Karan Joshi",
    branch: "Computer Science",
    cgpa: 6.9,
    backlogs: 2,
    email: "karan.j@university.edu",
    skills: [
      { name: "HTML/CSS", strength: 85 },
      { name: "JavaScript", strength: 70 },
      { name: "PHP", strength: 65 },
      { name: "MySQL", strength: 60 },
      { name: "Git", strength: 55 },
    ],
    readinessScore: 48,
    resumeUploaded: false,
  },
  {
    id: 8,
    name: "Deepika Nair",
    branch: "Electronics",
    cgpa: 8.1,
    backlogs: 0,
    email: "deepika.n@university.edu",
    skills: [
      { name: "VLSI Design", strength: 90 },
      { name: "Verilog", strength: 85 },
      { name: "Python", strength: 70 },
      { name: "Signal Processing", strength: 82 },
      { name: "PCB Design", strength: 78 },
    ],
    readinessScore: 75,
    resumeUploaded: true,
  },
]

export const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "TechNova Solutions",
    requiredSkills: ["Python", "Java", "SQL"],
    minCGPA: 7.5,
    backlogAllowed: false,
    branches: ["Computer Science", "Information Technology"],
    experience: "0-1 years",
    salary: "12-18 LPA",
    posted: "2026-02-20",
    status: "active",
  },
  {
    id: 2,
    title: "Data Analyst",
    company: "DataVerse Analytics",
    requiredSkills: ["Python", "SQL", "Tableau", "Data Science"],
    minCGPA: 7.0,
    backlogAllowed: false,
    branches: ["Computer Science", "Information Technology"],
    experience: "0 years",
    salary: "8-12 LPA",
    posted: "2026-02-18",
    status: "active",
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "PixelCraft Studios",
    requiredSkills: ["JavaScript", "React", "TypeScript", "HTML/CSS"],
    minCGPA: 7.0,
    backlogAllowed: true,
    branches: ["Computer Science", "Information Technology"],
    experience: "0 years",
    salary: "10-15 LPA",
    posted: "2026-02-15",
    status: "active",
  },
  {
    id: 4,
    title: "ML Engineer",
    company: "DeepMind Robotics",
    requiredSkills: ["Python", "Machine Learning", "TensorFlow"],
    minCGPA: 8.0,
    backlogAllowed: false,
    branches: ["Computer Science"],
    experience: "0-1 years",
    salary: "18-25 LPA",
    posted: "2026-02-22",
    status: "active",
  },
  {
    id: 5,
    title: "Embedded Systems Engineer",
    company: "ChipLogic Technologies",
    requiredSkills: ["C++", "Embedded Systems", "VHDL"],
    minCGPA: 7.0,
    backlogAllowed: false,
    branches: ["Electronics"],
    experience: "0 years",
    salary: "8-12 LPA",
    posted: "2026-02-12",
    status: "active",
  },
]

export const auditLogs = [
  {
    id: 1,
    timestamp: "2026-02-26 09:15:00",
    action: "Resume Uploaded",
    user: "Aarav Sharma",
    decision: "AI Skill Extraction Triggered",
    status: "completed",
  },
  {
    id: 2,
    timestamp: "2026-02-26 09:20:00",
    action: "Job Posted",
    user: "TechNova Solutions",
    decision: "Auto-matching initiated",
    status: "completed",
  },
  {
    id: 3,
    timestamp: "2026-02-26 09:25:00",
    action: "Candidate Shortlisted",
    user: "System AI",
    decision: "Priya Patel - Match Score 94%",
    status: "completed",
  },
  {
    id: 4,
    timestamp: "2026-02-26 09:30:00",
    action: "Eligibility Check",
    user: "System AI",
    decision: "Karan Joshi - Not Eligible (Backlogs)",
    status: "flagged",
  },
  {
    id: 5,
    timestamp: "2026-02-26 09:35:00",
    action: "Rule Modified",
    user: "Dr. Placement Officer",
    decision: "CGPA threshold updated to 7.5",
    status: "completed",
  },
  {
    id: 6,
    timestamp: "2026-02-26 10:00:00",
    action: "Batch Report Generated",
    user: "System",
    decision: "Weekly placement report",
    status: "completed",
  },
  {
    id: 7,
    timestamp: "2026-02-25 14:30:00",
    action: "Resume Uploaded",
    user: "Sneha Reddy",
    decision: "AI Skill Extraction Triggered",
    status: "completed",
  },
  {
    id: 8,
    timestamp: "2026-02-25 15:00:00",
    action: "Eligibility Check",
    user: "System AI",
    decision: "Rohan Gupta - Conditional (1 Backlog)",
    status: "flagged",
  },
]

export function calculateMatchScore(
  student: (typeof students)[0],
  job: (typeof jobs)[0]
): number {
  const studentSkillNames = student.skills.map((s) => s.name.toLowerCase())
  const requiredSkillNames = job.requiredSkills.map((s) => s.toLowerCase())

  let matchedSkillScore = 0
  let matchedCount = 0

  for (const reqSkill of requiredSkillNames) {
    const found = student.skills.find(
      (s) => s.name.toLowerCase() === reqSkill
    )
    if (found) {
      matchedSkillScore += found.strength
      matchedCount++
    }
  }

  const skillMatchRatio = matchedCount / requiredSkillNames.length
  const avgStrength =
    matchedCount > 0 ? matchedSkillScore / matchedCount : 0
  const cgpaBonus = student.cgpa >= job.minCGPA ? 10 : -10

  const score = Math.round(skillMatchRatio * 50 + avgStrength * 0.4 + cgpaBonus)
  return Math.min(100, Math.max(0, score))
}

export function checkEligibility(
  student: (typeof students)[0],
  job: (typeof jobs)[0]
): { eligible: boolean; reason?: string } {
  if (student.cgpa < job.minCGPA) {
    return { eligible: false, reason: `CGPA ${student.cgpa} below minimum ${job.minCGPA}` }
  }
  if (!job.backlogAllowed && student.backlogs > 0) {
    return { eligible: false, reason: `${student.backlogs} active backlog(s)` }
  }
  if (!job.branches.includes(student.branch)) {
    return { eligible: false, reason: `Branch ${student.branch} not eligible` }
  }
  return { eligible: true }
}

export const skillGapSuggestions: Record<string, string[]> = {
  Python: [
    "Complete Advanced Python course on Coursera",
    "Build 2 ML projects with Python",
  ],
  Java: [
    "Practice DSA problems in Java",
    "Build a REST API with Spring Boot",
  ],
  SQL: [
    "Complete SQL Challenges on HackerRank",
    "Learn query optimization techniques",
  ],
  React: [
    "Build 3 production-level React apps",
    "Learn Next.js and TypeScript",
  ],
  "Machine Learning": [
    "Complete Andrew Ng's ML specialization",
    "Participate in a Kaggle competition",
  ],
  JavaScript: [
    "Master ES6+ features",
    "Build full-stack apps with Node.js",
  ],
  TypeScript: [
    "Migrate a JS project to TypeScript",
    "Learn advanced type patterns",
  ],
}

export const branches = [
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Mechanical",
  "Civil",
  "Electrical",
]

export const allSkills = [
  "Python",
  "Java",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "SQL",
  "Machine Learning",
  "TensorFlow",
  "Docker",
  "AWS",
  "Data Science",
  "Tableau",
  "C++",
  "Spring Boot",
  "MongoDB",
  "HTML/CSS",
  "Git",
  "MATLAB",
  "Embedded Systems",
  "VHDL",
  "AutoCAD",
  "SolidWorks",
  "VLSI Design",
  "Verilog",
  "Signal Processing",
  "PCB Design",
  "FEA",
  "PHP",
  "MySQL",
]
