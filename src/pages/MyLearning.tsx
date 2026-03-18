import { Navbar } from "@/components/Navbar";
import { useProgressStore } from "@/stores/progressStore";
import { courses } from "@/data/courses";
import { Link, Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { BookOpen, PlayCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Chatbot } from "@/components/Chatbot";
import { getThumbnail } from "@/data/thumbnails";

export default function MyLearningPage() {
  const { isAuthenticated } = useAuthStore();
  const { enrolledCourses, getCourseProgress } = useProgressStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const enrolled = courses.filter((c) => enrolledCourses.includes(c.id));
  const allCourses = courses;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">My Learning</h1>
        <p className="mt-1 text-muted-foreground">Continue where you left off</p>

        {enrolled.length > 0 ? (
          <div className="mt-8 space-y-4">
            {enrolled.map((course) => {
              const progress = getCourseProgress(course.id, course.totalVideos);
              const firstVideo = course.sections[0]?.videos[0];
              return (
                <div key={course.id} className="flex gap-4 rounded-lg border bg-card p-4">
                  <img
                    src={getThumbnail(course.id)}
                    alt={course.title}
                    className="h-24 w-40 rounded object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-card-foreground line-clamp-1">{course.title}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">{course.instructor}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Progress value={progress} className="h-2 flex-1" />
                      <span className="text-xs font-medium text-muted-foreground">{progress}%</span>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><PlayCircle className="h-3 w-3" />{course.totalVideos} videos</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.totalDuration}</span>
                    </div>
                  </div>
                  <Link to={`/learn/${course.id}/${firstVideo?.id}`} className="shrink-0 self-center">
                    <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                      {progress > 0 ? "Continue" : "Start"}
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <p className="mt-4 text-lg font-medium text-foreground">No courses yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Enroll in a course to start learning</p>
            <Link to="/courses">
              <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">Browse Courses</Button>
            </Link>
          </div>
        )}

        {/* Recommended */}
        {enrolled.length > 0 && enrolled.length < allCourses.length && (
          <div className="mt-12">
            <h2 className="font-heading text-xl font-bold text-foreground mb-4">Recommended for You</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {allCourses
                .filter((c) => !enrolledCourses.includes(c.id))
                .slice(0, 3)
                .map((course) => (
                  <Link key={course.id} to={`/courses/${course.id}`} className="rounded-lg border bg-card p-4 hover:shadow-md transition-shadow">
                    <img src={getThumbnail(course.id)} alt={course.title} className="h-32 w-full rounded object-cover" />
                    <h3 className="mt-3 font-heading font-semibold text-card-foreground line-clamp-1">{course.title}</h3>
                    <p className="mt-1 text-sm font-bold text-foreground">₹{course.price.toLocaleString()}</p>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
      <Chatbot />
    </div>
  );
}
