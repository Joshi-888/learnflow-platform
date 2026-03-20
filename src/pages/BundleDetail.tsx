import { useParams, Link, Navigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Chatbot } from "@/components/Chatbot";
import { CourseCard } from "@/components/CourseCard";
import { bundles, courses } from "@/data/courses";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Package, PlayCircle, Clock, ShoppingCart, Check, ArrowLeft } from "lucide-react";

export default function BundleDetailPage() {
  const { bundleId } = useParams();
  const bundle = bundles.find((b) => b.id === bundleId);
  const { items, addItem } = useCartStore();

  if (!bundle) return <Navigate to="/bundles" replace />;

  const bundleCourses = courses.filter((c) => bundle.courses.includes(c.id));
  const totalVideos = bundleCourses.reduce((a, c) => a + c.totalVideos, 0);
  const totalDurationMins = bundleCourses.reduce((a, c) => {
    const match = c.totalDuration.match(/(\d+)h\s*(\d+)?m?/);
    return a + (match ? parseInt(match[1]) * 60 + (parseInt(match[2]) || 0) : 0);
  }, 0);
  const discount = Math.round((1 - bundle.price / bundle.originalPrice) * 100);
  const isInCart = items.some((i) => i.courseId === bundle.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <Link to="/bundles" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Bundles
        </Link>

        <div className="mt-4 grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="mb-2 flex items-center gap-2">
              <Package className="h-5 w-5 text-accent" />
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">Bundle</span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">{bundle.title}</h1>
            <p className="mt-2 text-muted-foreground">{bundle.description}</p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><PlayCircle className="h-4 w-4" />{bundleCourses.length} courses</span>
              <span className="flex items-center gap-1"><PlayCircle className="h-4 w-4" />{totalVideos} lessons</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{Math.floor(totalDurationMins / 60)}h {totalDurationMins % 60}m total</span>
            </div>

            <h2 className="mt-8 mb-4 font-heading text-lg font-semibold text-foreground">Courses in this bundle</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {bundleCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-3xl font-bold text-foreground">₹{bundle.price.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground line-through">₹{bundle.originalPrice.toLocaleString()}</span>
              </div>
              <span className="mt-1 inline-block text-sm font-semibold text-green-600">{discount}% off</span>

              <div className="mt-2 text-xs text-muted-foreground">
                You save ₹{(bundle.originalPrice - bundle.price).toLocaleString()} compared to buying individually
              </div>

              <Button
                className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() => !isInCart && addItem(bundle.id)}
                disabled={isInCart}
              >
                {isInCart ? (
                  <><Check className="mr-2 h-4 w-4" /> Added to Cart</>
                ) : (
                  <><ShoppingCart className="mr-2 h-4 w-4" /> Add Bundle to Cart</>
                )}
              </Button>

              <div className="mt-6 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">This bundle includes:</p>
                {bundleCourses.map((c) => (
                  <Link key={c.id} to={`/courses/${c.id}`} className="flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors">
                    <PlayCircle className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span className="line-clamp-1">{c.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
}
