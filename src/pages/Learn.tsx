import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courses } from "@/data/courses";
import { useProgressStore } from "@/stores/progressStore";
import { VideoPlayer } from "@/components/VideoPlayer";
import { CourseSidebar } from "@/components/CourseSidebar";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronRight, Menu, X } from "lucide-react";
import type { Video } from "@/data/courses";

export default function LearnPage() {
  const { courseId, videoId } = useParams<{ courseId: string; videoId: string }>();
  const navigate = useNavigate();
  const { markComplete, getVideoProgress } = useProgressStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);

  const course = courses.find((c) => c.id === courseId);
  const allVideos = course?.sections.flatMap((s) => s.videos) || [];
  const currentVideo = allVideos.find((v) => v.id === videoId);
  const currentIndex = allVideos.findIndex((v) => v.id === videoId);
  const nextVideo = currentIndex < allVideos.length - 1 ? allVideos[currentIndex + 1] : null;
  const isCompleted = currentVideo ? getVideoProgress(currentVideo.id)?.completed : false;

  const handleVideoSelect = useCallback((video: Video) => {
    navigate(`/learn/${courseId}/${video.id}`, { replace: true });
  }, [courseId, navigate]);

  const handleMarkComplete = () => {
    if (!currentVideo || !courseId) return;
    markComplete(currentVideo.id, courseId);
    if (nextVideo) {
      setCountdown(3);
    }
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setCountdown(null);
      if (nextVideo) handleVideoSelect(nextVideo);
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, nextVideo, handleVideoSelect]);

  if (!course || !currentVideo) {
    return <div className="flex h-screen items-center justify-center text-muted-foreground">Video not found</div>;
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="flex h-12 items-center gap-3 border-b bg-primary px-4">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-primary-foreground/80 hover:text-primary-foreground">
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <span className="truncate text-sm font-medium text-primary-foreground">{course.title}</span>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-80 flex-shrink-0 overflow-hidden">
            <CourseSidebar
              sections={course.sections}
              courseId={course.id}
              currentVideoId={currentVideo.id}
              onVideoSelect={handleVideoSelect}
            />
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl p-6">
            <VideoPlayer video={currentVideo} />

            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h1 className="font-heading text-xl font-bold text-foreground">{currentVideo.title}</h1>
                <p className="mt-1 text-sm text-muted-foreground">{currentVideo.duration}</p>
              </div>
              <div className="flex items-center gap-2">
                {isCompleted ? (
                  <span className="flex items-center gap-1.5 text-sm font-medium text-success">
                    <CheckCircle className="h-4 w-4" /> Completed
                  </span>
                ) : (
                  <Button onClick={handleMarkComplete} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <CheckCircle className="mr-1.5 h-4 w-4" />
                    Mark Complete
                  </Button>
                )}
                {nextVideo && countdown === null && (
                  <Button variant="outline" onClick={() => handleVideoSelect(nextVideo)}>
                    Next <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Auto-advance countdown */}
            {countdown !== null && (
              <div className="mt-4 flex items-center gap-3 rounded-lg border bg-card p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-lg font-bold text-accent-foreground">
                  {countdown}
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">Next: {nextVideo?.title}</p>
                  <p className="text-xs text-muted-foreground">Auto-advancing in {countdown}s</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setCountdown(null)} className="ml-auto text-muted-foreground">
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
