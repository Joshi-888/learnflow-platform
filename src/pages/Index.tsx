import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, PlayCircle, Users } from "lucide-react";

const Index = () => {
  const featured = courses.slice(0, 3);

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
              <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b">
        <div className="container grid grid-cols-3 divide-x py-8">
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
              <span className="text-2xl font-bold font-heading text-foreground">6</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Expert Instructors</p>
          </div>
        </div>
      </section>

      {/* Featured */}
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

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2024 TechAcademy. Built for engineers, by engineers.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
