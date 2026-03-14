import { Link } from "react-router-dom";
import { thumbnails } from "@/data/thumbnails";
import { courses, type CourseBundle } from "@/data/courses";
import { CourseBadge } from "./CourseBadge";
import { Package, PlayCircle } from "lucide-react";
import { Button } from "./ui/button";

interface BundleCardProps {
  bundle: CourseBundle;
}

export function BundleCard({ bundle }: BundleCardProps) {
  const bundleCourses = courses.filter((c) => bundle.courses.includes(c.id));
  const totalVideos = bundleCourses.reduce((a, c) => a + c.totalVideos, 0);
  const discount = Math.round((1 - bundle.price / bundle.originalPrice) * 100);

  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="grid grid-cols-2 gap-0.5 bg-muted p-0.5">
        {bundle.courses.slice(0, 4).map((cid) => (
          <img
            key={cid}
            src={thumbnails[cid]}
            alt=""
            className="aspect-video w-full object-cover"
          />
        ))}
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center gap-1.5">
          <Package className="h-4 w-4 text-accent" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">Bundle</span>
        </div>
        <h3 className="mb-1 font-heading text-base font-semibold leading-tight text-card-foreground line-clamp-2">
          {bundle.title}
        </h3>
        <p className="mb-2 text-xs text-muted-foreground line-clamp-2">{bundle.description}</p>

        <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <PlayCircle className="h-3 w-3" />
            {bundleCourses.length} courses · {totalVideos} lessons
          </span>
        </div>

        <div className="mb-2 flex items-baseline gap-2">
          <span className="font-heading text-lg font-bold text-foreground">₹{bundle.price.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground line-through">₹{bundle.originalPrice.toLocaleString()}</span>
          <span className="text-xs font-semibold text-success">{discount}% off</span>
        </div>

        {bundle.badges.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {bundle.badges.map((b) => (
              <CourseBadge key={b} badge={b} />
            ))}
          </div>
        )}

        <Link to={`/bundles/${bundle.id}`}>
          <Button size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            View Bundle
          </Button>
        </Link>
      </div>
    </div>
  );
}
