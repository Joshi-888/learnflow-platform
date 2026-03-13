import { useState } from "react";
import { Check, ChevronDown, Circle, PlayCircle } from "lucide-react";
import { useProgressStore } from "@/stores/progressStore";
import type { Section, Video } from "@/data/courses";
import { cn } from "@/lib/utils";

interface CourseSidebarProps {
  sections: Section[];
  courseId: string;
  currentVideoId: string;
  onVideoSelect: (video: Video) => void;
}

export function CourseSidebar({ sections, courseId, currentVideoId, onVideoSelect }: CourseSidebarProps) {
  const [openSections, setOpenSections] = useState<string[]>(
    sections.map((s) => s.id)
  );
  const { getVideoProgress } = useProgressStore();

  const toggleSection = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const getStatusIcon = (videoId: string) => {
    const progress = getVideoProgress(videoId);
    if (progress?.completed) return <Check className="h-4 w-4 text-success flex-shrink-0" />;
    if (progress && progress.watchedSeconds > 0) return <PlayCircle className="h-4 w-4 text-accent flex-shrink-0" />;
    return <Circle className="h-4 w-4 text-muted-foreground/40 flex-shrink-0" />;
  };

  return (
    <div className="h-full overflow-y-auto border-r bg-card">
      <div className="p-4 border-b">
        <h2 className="font-heading text-sm font-semibold text-card-foreground">Course Content</h2>
      </div>
      <div>
        {sections.map((section) => (
          <div key={section.id}>
            <button
              onClick={() => toggleSection(section.id)}
              className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-muted/50 transition-colors"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {section.title}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  openSections.includes(section.id) && "rotate-180"
                )}
              />
            </button>
            {openSections.includes(section.id) && (
              <div className="animate-accordion-down">
                {section.videos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => onVideoSelect(video)}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors",
                      currentVideoId === video.id
                        ? "bg-accent/10 border-l-2 border-accent text-accent font-medium"
                        : "hover:bg-muted/50 text-card-foreground"
                    )}
                  >
                    {getStatusIcon(video.id)}
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm">{video.title}</p>
                      <p className="text-xs text-muted-foreground">{video.duration}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
