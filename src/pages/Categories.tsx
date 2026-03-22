import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Chatbot } from "@/components/Chatbot";
import { courses } from "@/data/courses";
import {
  Code2, Server, Globe, GitBranch, Building2, Database,
  BrainCircuit, Cloud, Shield, Palette, Smartphone, GraduationCap,
} from "lucide-react";

const categoryMeta: Record<string, { icon: React.ElementType; description: string; color: string }> = {
  Frontend: { icon: Code2, description: "Master modern UI frameworks like React, Angular & Vue", color: "from-blue-500/20 to-cyan-500/20" },
  Backend: { icon: Server, description: "Build scalable server-side applications & APIs", color: "from-emerald-500/20 to-green-500/20" },
  Languages: { icon: Globe, description: "Learn programming languages from Python to Rust", color: "from-amber-500/20 to-yellow-500/20" },
  DevOps: { icon: GitBranch, description: "CI/CD pipelines, Docker, Kubernetes & more", color: "from-orange-500/20 to-red-500/20" },
  Architecture: { icon: Building2, description: "System design, microservices & design patterns", color: "from-violet-500/20 to-purple-500/20" },
  Databases: { icon: Database, description: "SQL, NoSQL, data modeling & optimization", color: "from-pink-500/20 to-rose-500/20" },
  "Data Science": { icon: BrainCircuit, description: "Machine learning, AI & data analytics", color: "from-indigo-500/20 to-blue-500/20" },
  Cloud: { icon: Cloud, description: "AWS, Azure, GCP & cloud-native development", color: "from-sky-500/20 to-blue-500/20" },
  Security: { icon: Shield, description: "Cybersecurity, ethical hacking & secure coding", color: "from-red-500/20 to-orange-500/20" },
  Design: { icon: Palette, description: "UI/UX design, Figma & design systems", color: "from-fuchsia-500/20 to-pink-500/20" },
  Mobile: { icon: Smartphone, description: "React Native, Flutter & native mobile dev", color: "from-teal-500/20 to-emerald-500/20" },
  "Computer Science": { icon: GraduationCap, description: "DSA, algorithms & computer fundamentals", color: "from-slate-500/20 to-gray-500/20" },
};

export default function CategoriesPage() {
  const navigate = useNavigate();

  const categories = Array.from(new Set(courses.map((c) => c.category)));
  const categoryCounts = categories.map((cat) => ({
    name: cat,
    count: courses.filter((c) => c.category === cat).length,
    ...(categoryMeta[cat] || { icon: GraduationCap, description: "Explore courses in this category", color: "from-gray-500/20 to-slate-500/20" }),
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">Browse Categories</h1>
          <p className="mt-1 text-muted-foreground">Choose a category to find the right courses for you</p>
        </div>

        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {categoryCounts.map(({ name, count, icon: Icon, description, color }) => (
            <button
              key={name}
              onClick={() => navigate(`/courses?category=${encodeURIComponent(name)}`)}
              className={`group flex flex-col items-center gap-3 rounded-xl border bg-gradient-to-br ${color} p-6 text-center transition-all hover:scale-[1.03] hover:shadow-lg hover:border-accent`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background/80 shadow-sm transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-heading text-sm font-semibold text-foreground">{name}</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{description}</p>
              </div>
              <span className="rounded-full bg-background/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                {count} {count === 1 ? "course" : "courses"}
              </span>
            </button>
          ))}
        </div>
      </div>
      <Chatbot />
    </div>
  );
}
