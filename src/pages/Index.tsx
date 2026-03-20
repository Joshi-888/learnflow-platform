import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { CourseCard } from "@/components/CourseCard";
import { BundleCard } from "@/components/BundleCard";
import { Chatbot } from "@/components/Chatbot";
import { courses, bundles } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, PlayCircle, Users, TrendingUp } from "lucide-react";

const Index = () => {
  const featured = courses.slice(0, 3);
  const trending = courses.filter((c) => c.badges.includes("Bestseller"));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="border-b bg-primary">
        <div className="container py-20 text-center">
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl">
            Level Up Your Tech Career
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/70">
            Industry-grade courses in React, Node.js, TypeScript, DevOps, System Design and more — built for engineers who ship.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/courses">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Browse Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b">
        <div className="container grid grid-cols-2 divide-x py-8 sm:grid-cols-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-accent">
              <BookOpen className="h-5 w-5" />
              <span className="text-2xl font-bold font-heading text-foreground">{courses.length}+</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Courses</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-accent">
              <PlayCircle className="h-5 w-5" />
              <span className="text-2xl font-bold font-heading text-foreground">38+</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Video Lessons</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-accent">
              <Users className="h-5 w-5" />
              <span className="text-2xl font-bold font-heading text-foreground">12K+</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Students</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-accent">
              <TrendingUp className="h-5 w-5" />
              <span className="text-2xl font-bold font-heading text-foreground">4.5</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Avg Rating</p>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="container py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold text-foreground">Featured Courses</h2>
          <Link to="/courses" className="text-sm font-medium text-accent hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Trending / Bestsellers */}
      {trending.length > 0 && (
        <section className="border-t bg-muted/30">
          <div className="container py-12">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-heading text-2xl font-bold text-foreground">Trending Now</h2>
              <Link to="/courses" className="text-sm font-medium text-accent hover:underline">
                See more →
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trending.slice(0, 3).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bundle Courses */}
      <section className="container py-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">Course Bundles</h2>
            <p className="mt-1 text-sm text-muted-foreground">Save up to 75% with curated learning paths</p>
          </div>
          <Link to="/bundles" className="text-sm font-medium text-accent hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-3 text-sm text-muted-foreground">
            <div>
              <p className="mb-2 font-heading font-semibold text-foreground">TechAcademy</p>
              <p>Industry-grade tech education built for engineers who ship production code.</p>
            </div>
            <div>
              <p className="mb-2 font-heading font-semibold text-foreground">Quick Links</p>
              <div className="flex flex-col gap-1">
                <Link to="/courses" className="hover:text-accent transition-colors">All Courses</Link>
                <Link to="/bundles" className="hover:text-accent transition-colors">Bundles</Link>
                <Link to="/categories" className="hover:text-accent transition-colors">Categories</Link>
                <Link to="/certificates" className="hover:text-accent transition-colors">Certificates</Link>
              </div>
            </div>
            <div>
              <p className="mb-2 font-heading font-semibold text-foreground">Support</p>
              <div className="flex flex-col gap-1">
                <span>support@techacademy.com</span>
                <span>24/7 Chat Support</span>
                <span>30-Day Refund Policy</span>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground">
            © 2026 TechAcademy. Built for engineers, by engineers.
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
};

export default Index;
