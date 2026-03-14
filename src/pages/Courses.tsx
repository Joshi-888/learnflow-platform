import { useState } from "react";
import { courses } from "@/data/courses";
import { CourseCard } from "@/components/CourseCard";
import { Navbar } from "@/components/Navbar";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Chatbot } from "@/components/Chatbot";

const categories = ["All", ...Array.from(new Set(courses.map((c) => c.category)))];

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">Explore Courses</h1>
          <p className="mt-1 text-muted-foreground">Build your skills with industry-grade content</p>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No courses found matching your search.
          </div>
        )}
      </div>
      <Chatbot />
    </div>
  );
}
