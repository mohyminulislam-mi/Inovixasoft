import { NextResponse } from 'next/server';

export async function GET() {
  const jobs = [
    {
      id: "senior-fullstack-dev",
      title: "Senior Full Stack Developer",
      type: "Full-time",
      department: "Engineering",
      location: "Remote (Worldwide)",
      salary: "$3,000–$5,000/month",
      tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
      posted: "2 days ago",
      urgent: true
    },
    {
      id: "react-native-dev",
      title: "React Native Developer",
      type: "Full-time",
      department: "Mobile",
      location: "Remote (Worldwide)",
      salary: "$2,500–$4,000/month",
      tags: ["React Native", "JavaScript", "Expo", "Firebase"],
      posted: "1 week ago",
      urgent: false
    },
    {
      id: "ui-ux-designer",
      title: "UI/UX Designer",
      type: "Full-time",
      department: "Design",
      location: "Remote (Worldwide)",
      salary: "$2,000–$3,500/month",
      tags: ["Figma", "Prototyping", "Design Systems", "User Research"],
      posted: "3 days ago",
      urgent: false
    },
    {
      id: "devops-engineer",
      title: "DevOps Engineer",
      type: "Part-time",
      department: "Infrastructure",
      location: "Remote (Worldwide)",
      salary: "$1,500–$2,500/month",
      tags: ["AWS", "Docker", "CI/CD", "Kubernetes"],
      posted: "5 days ago",
      urgent: false
    },
    {
      id: "ai-ml-engineer",
      title: "AI/ML Engineer",
      type: "Full-time",
      department: "AI",
      location: "Remote (Worldwide)",
      salary: "$4,000–$6,000/month",
      tags: ["Python", "TensorFlow", "LangChain", "OpenAI API"],
      posted: "1 day ago",
      urgent: true
    },
    {
      id: "seo-specialist",
      title: "SEO & Content Specialist",
      type: "Contract",
      department: "Marketing",
      location: "Remote (Worldwide)",
      salary: "$1,000–$2,000/month",
      tags: ["SEO", "Content Writing", "Analytics", "WordPress"],
      posted: "1 week ago",
      urgent: false
    }
  ];

  return NextResponse.json(jobs);
}
