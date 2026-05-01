import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import {
  BookOpen, LogOut, User, Package, GraduationCap, Award, Menu, X,
  ShoppingCart, Heart, Bell, Search, Settings, CreditCard, ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";


export function Navbar() {
  const { isAuthenticated, user, isAdmin, logout } = useAuthStore();
  const { items, wishlist } = useCartStore();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Admin: subscribe to pending payments count
  useEffect(() => {
    if (!isAdmin) {
      setPendingCount(0);
      return;
    }
    const refresh = async () => {
      const { count } = await supabase
        .from("payments")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");
      setPendingCount(count ?? 0);
    };
    refresh();
    const channel = supabase
      .channel("nav-pending-payments")
      .on("postgres_changes", { event: "*", schema: "public", table: "payments" }, (payload) => {
        refresh();
        if (payload.eventType === "INSERT") {
          const p = payload.new as { user_name?: string; user_email?: string; amount?: number };
          toast.info(`💰 New payment from ${p.user_name || p.user_email} – ₹${Number(p.amount).toLocaleString()}`, {
            action: { label: "Review", onClick: () => navigate("/admin") },
          });
        }
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin, navigate]);

  const navLinks = [
    { to: "/courses", label: "Courses", icon: BookOpen },
    { to: "/bundles", label: "Bundles", icon: Package },
    { to: "/categories", label: "Categories", icon: GraduationCap },
    { to: "/certificates", label: "Certificates", icon: Award },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-primary">
      {/* Main nav */}
      <div className="container flex h-14 items-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-primary-foreground shrink-0">
          <BookOpen className="h-6 w-6" />
          <span className="font-heading text-lg font-bold tracking-tight hidden sm:inline">TechAcademy</span>
        </Link>

        {/* Search bar - desktop */}
        <div className="relative hidden flex-1 max-w-md md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for anything"
            className="h-9 bg-primary-foreground/10 border-primary-foreground/20 pl-9 text-primary-foreground placeholder:text-primary-foreground/50 focus:bg-primary-foreground/15"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-3 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 ml-auto">
          {/* Mobile search toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-primary-foreground/80 hover:text-primary-foreground p-2 md:hidden"
          >
            <Search className="h-5 w-5" />
          </button>

          {isAuthenticated ? (
            <>
              <Link to="/my-learning" className="hidden text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors lg:block whitespace-nowrap px-2">
                My Learning
              </Link>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative p-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <ShoppingCart className="h-5 w-5" />
                {items.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                    {items.length}
                  </span>
                )}
              </Link>

              {/* Notifications / Admin payments */}
              <div className="relative">
                <button
                  onClick={() => {
                    if (isAdmin) {
                      navigate("/admin");
                    } else {
                      toast.info("No new notifications");
                    }
                  }}
                  className="relative p-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  title={isAdmin ? "Pending payments" : "Notifications"}
                >
                  <Bell className="h-5 w-5" />
                  {isAdmin && pendingCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                      {pendingCount}
                    </span>
                  )}
                </button>
              </div>

              {/* User dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground hover:bg-accent/90 transition-colors"
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 rounded-lg border bg-popover shadow-lg">
                    <div className="border-b p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-accent-foreground">
                          {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-heading font-semibold text-popover-foreground truncate">{user?.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-1">
                      {[
                        ...(isAdmin ? [{ to: "/admin", label: `Admin · Payments${pendingCount > 0 ? ` (${pendingCount})` : ""}`, icon: ShieldCheck }] : []),
                        { to: "/my-learning", label: "My Learning", icon: BookOpen },
                        { to: "/cart", label: "My Cart", icon: ShoppingCart },
                        { to: "/wishlist", label: "Wishlist", icon: Heart },
                        { to: "/profile", label: "Profile", icon: User },
                        { to: "/account-settings", label: "Account Settings", icon: Settings },
                        { to: "/cart", label: "Payment Methods", icon: CreditCard },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.label}
                            to={item.to}
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-popover-foreground hover:bg-muted transition-colors"
                          >
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                    <div className="border-t py-1">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-popover-foreground hover:bg-muted transition-colors"
                      >
                        <LogOut className="h-4 w-4 text-muted-foreground" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
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

          {/* Mobile Toggle */}
          <button className="text-primary-foreground p-2 md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile search */}
      {searchOpen && (
        <div className="border-t border-primary-foreground/10 bg-primary px-4 py-2 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search for anything" className="h-9 bg-primary-foreground/10 border-primary-foreground/20 pl-9 text-primary-foreground placeholder:text-primary-foreground/50" />
          </div>
        </div>
      )}


      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="border-t border-primary-foreground/10 bg-primary px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
            {isAuthenticated ? (
              <>
                <Link to="/my-learning" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/80 hover:bg-primary-foreground/10">
                  <BookOpen className="h-4 w-4" /> My Learning
                </Link>
                <Link to="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/80 hover:bg-primary-foreground/10">
                  <ShoppingCart className="h-4 w-4" /> Cart ({items.length})
                </Link>
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/80 hover:bg-primary-foreground/10">
                  <User className="h-4 w-4" /> Profile
                </Link>
              </>
            ) : (
              <div className="mt-2 flex gap-2">
                <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full border-primary-foreground/20 text-primary-foreground">Sign In</Button>
                </Link>
                <Link to="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full bg-accent text-accent-foreground">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
