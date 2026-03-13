import { Navbar } from "@/components/Navbar";
import { useAuthStore } from "@/stores/authStore";
import { useProgressStore } from "@/stores/progressStore";
import { courses } from "@/data/courses";
import { CourseCard } from "@/components/CourseCard";
import { Navigate } from "react-router-dom";
import { User, BookOpen, CheckCircle } from "lucide-react";

export default function ProfilePage() {
  const { isAuthenticated, user } = useAuthStore();
  const { enrolledCourses, progress } = useProgressStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const enrolled = courses.filter((c) => enrolledCourses.includes(c.id));
  const completedCount = Object.values(progress).filter((p) => p.completed).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <User className="h-8 w-8 text-accent" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">{user?.name}</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><BookOpen className="h-4 w-4" />Enrolled</div>
            <p className="mt-1 text-2xl font-bold text-card-foreground">{enrolled.length}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle className="h-4 w-4" />Videos Completed</div>
            <p className="mt-1 text-2xl font-bold text-card-foreground">{completedCount}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle className="h-4 w-4" />Courses Available</div>
            <p className="mt-1 text-2xl font-bold text-card-foreground">{courses.length}</p>
          </div>
        </div>

        <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">My Courses</h2>
        {enrolled.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {enrolled.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">You haven't enrolled in any courses yet.</p>
        )}
      </div>
    </div>
  );
}
