import { useParams, useNavigate } from "react-router-dom";
import { courses } from "@/data/courses";
import { thumbnails } from "@/data/thumbnails";
import { useProgressStore } from "@/stores/progressStore";
import { useAuthStore } from "@/stores/authStore";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Check, Clock, PlayCircle, User } from "lucide-react";

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { enroll, isEnrolled, getCourseProgress, getVideoProgress } = useProgressStore();

  const course = courses.find((c) => c.id === courseId);
  if (!course) return <div className="p-8 text-center">Course not found</div>;

  const enrolled = isEnrolled(course.id);
  const progress = getCourseProgress(course.id, course.totalVideos);
  const firstVideo = course.sections[0]?.videos[0];

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    enroll(course.id);
    if (firstVideo) navigate(`/learn/${course.id}/${firstVideo.id}`);
  };

  const handleContinue = () => {
    // find first incomplete video
    for (const section of course.sections) {
      for (const video of section.videos) {
        const vp = getVideoProgress(video.id);
        if (!vp?.completed) {
          navigate(`/learn/${course.id}/${video.id}`);
          return;
        }
      }
    }
    if (firstVideo) navigate(`/learn/${course.id}/${firstVideo.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 aspect-video overflow-hidden rounded-lg">
              <img src={thumbnails[course.id]} alt={course.title} className="h-full w-full object-cover" />
            </div>
            <span className="mb-2 inline-block rounded-sm bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
              {course.category}
            </span>
            <h1 className="mb-2 font-heading text-2xl font-bold text-foreground">{course.title}</h1>
            <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><User className="h-4 w-4" />{course.instructor}</span>
              <span className="flex items-center gap-1"><PlayCircle className="h-4 w-4" />{course.totalVideos} lessons</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{course.totalDuration}</span>
            </div>
            <p className="mb-8 text-foreground leading-relaxed">{course.description}</p>

            <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">Course Content</h2>
            <div className="space-y-3">
              {course.sections.map((section) => (
                <div key={section.id} className="rounded-lg border bg-card p-4">
                  <h3 className="mb-3 text-sm font-semibold text-card-foreground">{section.title}</h3>
                  <div className="space-y-2">
                    {section.videos.map((video) => {
                      const vp = getVideoProgress(video.id);
                      return (
                        <div key={video.id} className="flex items-center gap-3 text-sm">
                          {vp?.completed ? (
                            <Check className="h-4 w-4 text-success" />
                          ) : (
                            <PlayCircle className="h-4 w-4 text-muted-foreground/40" />
                          )}
                          <span className="flex-1 text-card-foreground">{video.title}</span>
                          <span className="text-xs text-muted-foreground">{video.duration}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-lg border bg-card p-6">
              {enrolled ? (
                <>
                  <div className="mb-4">
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-muted-foreground">Your progress</span>
                      <span className="font-semibold text-success">{progress}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-success transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                  <Button onClick={handleContinue} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    Continue Learning
                  </Button>
                </>
              ) : (
                <>
                  <p className="mb-4 text-sm text-muted-foreground">Enroll to start learning and track your progress.</p>
                  <Button onClick={handleEnroll} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    {isAuthenticated ? "Enroll Now — Free" : "Sign In to Enroll"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
