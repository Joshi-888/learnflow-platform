import { Link } from "react-router-dom";
import { useProgressStore } from "@/stores/progressStore";
import { thumbnails } from "@/data/thumbnails";
import type { Course } from "@/data/courses";
import { Clock, PlayCircle, User } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { isEnrolled, getCourseProgress } = useProgressStore();
  const enrolled = isEnrolled(course.id);
  const progress = enrolled ? getCourseProgress(course.id, course.totalVideos) : 0;

  return (
    <Link to={`/courses/${course.id}`} className="group block">
      <div className="overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md">
        <div className="aspect-video overflow-hidden">
          <img
            src={thumbnails[course.id]}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <span className="mb-1.5 inline-block rounded-sm bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
            {course.category}
          </span>
          <h3 className="mb-1 font-heading text-base font-semibold leading-tight text-card-foreground line-clamp-2">
            {course.title}
          </h3>
          <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {course.instructor}
            </span>
            <span className="flex items-center gap-1">
              <PlayCircle className="h-3 w-3" />
              {course.totalVideos} lessons
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {course.totalDuration}
            </span>
          </div>
          {enrolled && (
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-success">{progress}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-success transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
