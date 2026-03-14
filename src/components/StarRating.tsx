import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
}

export function StarRating({ rating, reviewCount, size = "sm" }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div className="flex items-center gap-1">
      <span className={`font-semibold text-amber-600 ${size === "sm" ? "text-xs" : "text-sm"}`}>
        {rating.toFixed(1)}
      </span>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < fullStars) {
            return <Star key={i} className={`${iconSize} fill-amber-400 text-amber-400`} />;
          }
          if (i === fullStars && hasHalf) {
            return <StarHalf key={i} className={`${iconSize} fill-amber-400 text-amber-400`} />;
          }
          return <Star key={i} className={`${iconSize} text-muted-foreground/30`} />;
        })}
      </div>
      {reviewCount !== undefined && (
        <span className={`text-muted-foreground ${size === "sm" ? "text-xs" : "text-sm"}`}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
