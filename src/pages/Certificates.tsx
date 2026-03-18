import { Navbar } from "@/components/Navbar";
import { useProgressStore } from "@/stores/progressStore";
import { courses } from "@/data/courses";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Award, Download, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chatbot } from "@/components/Chatbot";
import { getThumbnail } from "@/data/thumbnails";

export default function CertificatesPage() {
  const { isAuthenticated, user } = useAuthStore();
  const { enrolledCourses, getCourseProgress } = useProgressStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const enrolled = courses.filter((c) => enrolledCourses.includes(c.id));
  const completed = enrolled.filter((c) => getCourseProgress(c.id, c.totalVideos) === 100);
  const inProgress = enrolled.filter((c) => {
    const p = getCourseProgress(c.id, c.totalVideos);
    return p > 0 && p < 100;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Certificates</h1>
        <p className="mt-1 text-muted-foreground">Complete courses to earn certificates</p>

        {/* Earned Certificates */}
        {completed.length > 0 && (
          <div className="mt-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-accent" /> Earned ({completed.length})
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {completed.map((course) => (
                <div key={course.id} className="rounded-lg border bg-card p-6 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                    <Award className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="mt-4 font-heading font-semibold text-card-foreground">{course.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">Issued to {user?.name}</p>
                  <p className="text-xs text-muted-foreground">Instructor: {course.instructor}</p>
                  <Button size="sm" variant="outline" className="mt-4">
                    <Download className="mr-1 h-3 w-3" /> Download Certificate
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* In Progress */}
        {inProgress.length > 0 && (
          <div className="mt-10">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-muted-foreground" /> In Progress
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {inProgress.map((course) => {
                const progress = getCourseProgress(course.id, course.totalVideos);
                return (
                  <div key={course.id} className="rounded-lg border bg-card p-4 opacity-80">
                    <img src={getThumbnail(course.id)} alt={course.title} className="h-32 w-full rounded object-cover" />
                    <h3 className="mt-3 font-heading font-semibold text-card-foreground line-clamp-1">{course.title}</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-2 flex-1 rounded-full bg-muted">
                        <div className="h-full rounded-full bg-accent" style={{ width: `${progress}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{progress}%</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Complete all videos to earn certificate</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {enrolled.length === 0 && (
          <div className="mt-12 text-center">
            <Award className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <p className="mt-4 text-lg font-medium text-foreground">No certificates yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Enroll in courses and complete them to earn certificates</p>
          </div>
        )}
      </div>
      <Chatbot />
    </div>
  );
}
