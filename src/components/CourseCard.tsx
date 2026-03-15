import { Link } from "react-router-dom";
import { useProgressStore } from "@/stores/progressStore";
import { useCartStore } from "@/stores/cartStore";
import { thumbnails } from "@/data/thumbnails";
import type { Course } from "@/data/courses";
import { ShoppingCart, Heart, Check } from "lucide-react";
import { StarRating } from "./StarRating";
import { CourseBadge } from "./CourseBadge";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { isEnrolled, getCourseProgress } = useProgressStore();
  const { addToCart, addToWishlist, isInCart, isInWishlist } = useCartStore();
  const enrolled = isEnrolled(course.id);
  const progress = enrolled ? getCourseProgress(course.id, course.totalVideos) : 0;
  const discount = Math.round((1 - course.price / course.originalPrice) * 100);
  const inCart = isInCart(course.id);
  const inWishlist = isInWishlist(course.id);

  const cartItem = {
    id: course.id,
    type: "course" as const,
    title: course.title,
    price: course.price,
    originalPrice: course.originalPrice,
    thumbnail: thumbnails[course.id],
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(cartItem);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(cartItem);
  };

  return (
    <Link to={`/courses/${course.id}`} className="group block">
      <div className="overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbnails[course.id]}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Hover actions */}
          <div className="absolute inset-0 flex items-end justify-end gap-1.5 p-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={handleAddToWishlist}
              className={`flex h-8 w-8 items-center justify-center rounded-full shadow-md transition-colors ${
                inWishlist ? "bg-accent text-accent-foreground" : "bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={handleAddToCart}
              className={`flex h-8 w-8 items-center justify-center rounded-full shadow-md transition-colors ${
                inCart ? "bg-success text-success-foreground" : "bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {inCart ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="mb-1 font-heading text-base font-semibold leading-tight text-card-foreground line-clamp-2">
            {course.title}
          </h3>
          <p className="mb-1.5 text-xs text-muted-foreground">{course.instructor}</p>

          <StarRating rating={course.rating} reviewCount={course.reviewCount} />

          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-heading text-lg font-bold text-foreground">₹{course.price.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground line-through">₹{course.originalPrice.toLocaleString()}</span>
            <span className="text-xs font-semibold text-success">{discount}% off</span>
          </div>

          {course.badges.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {course.badges.map((b) => (
                <CourseBadge key={b} badge={b} />
              ))}
            </div>
          )}

          {enrolled && (
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-success">{progress}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-success transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
