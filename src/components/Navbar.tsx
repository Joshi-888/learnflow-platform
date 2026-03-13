import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { BookOpen, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-primary">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary-foreground">
          <BookOpen className="h-6 w-6" />
          <span className="font-heading text-lg font-bold tracking-tight">TechAcademy</span>
        </Link>

        <nav className="flex items-center gap-3">
          <Link to="/courses" className="text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            Courses
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="flex items-center gap-1.5 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <User className="h-4 w-4" />
                {user?.name}
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
