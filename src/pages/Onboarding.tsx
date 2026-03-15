import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase, Building2, Users, BookOpen, ArrowRight, Check } from "lucide-react";

const roles = [
  { id: "student", label: "Student", desc: "Currently enrolled in a degree program", icon: GraduationCap },
  { id: "employee", label: "Working Professional", desc: "Employed and looking to upskill", icon: Briefcase },
  { id: "freelancer", label: "Freelancer", desc: "Self-employed and building skills", icon: Users },
  { id: "organization", label: "Organization / Team", desc: "Training for a team or company", icon: Building2 },
  { id: "career-switch", label: "Career Switcher", desc: "Transitioning to a new field", icon: ArrowRight },
  { id: "hobbyist", label: "Hobbyist / Self-learner", desc: "Learning for personal interest", icon: BookOpen },
];

const domains = [
  { id: "web-dev", label: "Web Development", emoji: "🌐" },
  { id: "mobile-dev", label: "Mobile Development", emoji: "📱" },
  { id: "data-science", label: "Data Science & AI", emoji: "🤖" },
  { id: "cloud-devops", label: "Cloud & DevOps", emoji: "☁️" },
  { id: "cybersecurity", label: "Cybersecurity", emoji: "🔒" },
  { id: "system-design", label: "System Design & Architecture", emoji: "🏗️" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const { setPreferences } = useAuthStore();
  const navigate = useNavigate();

  const toggleDomain = (id: string) => {
    setSelectedDomains((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const handleFinish = () => {
    setPreferences(selectedRole, selectedDomains);
    navigate("/courses");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-2xl py-12">
        {/* Progress */}
        <div className="mb-8 flex items-center gap-3">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${step >= 1 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
            {step > 1 ? <Check className="h-4 w-4" /> : "1"}
          </div>
          <div className={`h-0.5 flex-1 ${step > 1 ? "bg-accent" : "bg-muted"}`} />
          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${step >= 2 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
            2
          </div>
        </div>

        {step === 1 && (
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">What best describes you?</h1>
            <p className="mt-1 text-muted-foreground">This helps us personalize your learning experience</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {roles.map((role) => {
                const Icon = role.icon;
                const selected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`flex items-start gap-3 rounded-lg border p-4 text-left transition-all ${
                      selected
                        ? "border-accent bg-accent/5 ring-2 ring-accent"
                        : "border-border bg-card hover:border-accent/50"
                    }`}
                  >
                    <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${selected ? "text-accent" : "text-muted-foreground"}`} />
                    <div>
                      <p className="font-medium text-card-foreground">{role.label}</p>
                      <p className="text-xs text-muted-foreground">{role.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            <Button
              onClick={() => setStep(2)}
              disabled={!selectedRole}
              className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">What are you interested in?</h1>
            <p className="mt-1 text-muted-foreground">Select up to 3 domains you'd like to explore</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {domains.map((domain) => {
                const selected = selectedDomains.includes(domain.id);
                return (
                  <button
                    key={domain.id}
                    onClick={() => toggleDomain(domain.id)}
                    className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-all ${
                      selected
                        ? "border-accent bg-accent/5 ring-2 ring-accent"
                        : "border-border bg-card hover:border-accent/50"
                    }`}
                  >
                    <span className="text-2xl">{domain.emoji}</span>
                    <p className="font-medium text-card-foreground">{domain.label}</p>
                    {selected && <Check className="ml-auto h-4 w-4 text-accent" />}
                  </button>
                );
              })}
            </div>
            <div className="mt-8 flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button
                onClick={handleFinish}
                disabled={selectedDomains.length === 0}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Start Learning <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
