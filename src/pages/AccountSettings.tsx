import { Navbar } from "@/components/Navbar";
import { useAuthStore } from "@/stores/authStore";
import { Navigate } from "react-router-dom";
import { Settings, User, Bell, Shield, Globe, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function AccountSettingsPage() {
  const { isAuthenticated, user } = useAuthStore();
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [promoNotifs, setPromoNotifs] = useState(false);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-3xl py-8">
        <div className="mb-6 flex items-center gap-3">
          <Settings className="h-6 w-6 text-accent" />
          <h1 className="font-heading text-2xl font-bold text-foreground">Account Settings</h1>
        </div>

        {/* Profile Information */}
        <section className="mb-6 rounded-lg border bg-card p-6">
          <h2 className="mb-4 flex items-center gap-2 font-heading text-base font-semibold text-card-foreground">
            <User className="h-4 w-4 text-muted-foreground" /> Profile Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Full Name</label>
              <Input defaultValue={user?.name} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Email Address</label>
              <Input defaultValue={user?.email} type="email" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Bio</label>
              <Input placeholder="Tell us about yourself..." />
            </div>
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => toast.success("Profile updated!")}>
              Save Changes
            </Button>
          </div>
        </section>

        {/* Password */}
        <section className="mb-6 rounded-lg border bg-card p-6">
          <h2 className="mb-4 flex items-center gap-2 font-heading text-base font-semibold text-card-foreground">
            <Shield className="h-4 w-4 text-muted-foreground" /> Password & Security
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Current Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">New Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Confirm New Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <Button size="sm" variant="outline" onClick={() => toast.success("Password updated!")}>
              Update Password
            </Button>
          </div>
        </section>

        {/* Notifications */}
        <section className="mb-6 rounded-lg border bg-card p-6">
          <h2 className="mb-4 flex items-center gap-2 font-heading text-base font-semibold text-card-foreground">
            <Bell className="h-4 w-4 text-muted-foreground" /> Notification Preferences
          </h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-sm text-foreground">Email notifications for course updates</span>
              <button
                onClick={() => setEmailNotifs(!emailNotifs)}
                className={`relative h-6 w-11 rounded-full transition-colors ${emailNotifs ? "bg-accent" : "bg-muted"}`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${emailNotifs ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm text-foreground">Promotional emails and offers</span>
              <button
                onClick={() => setPromoNotifs(!promoNotifs)}
                className={`relative h-6 w-11 rounded-full transition-colors ${promoNotifs ? "bg-accent" : "bg-muted"}`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${promoNotifs ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </label>
          </div>
        </section>

        {/* Language */}
        <section className="mb-6 rounded-lg border bg-card p-6">
          <h2 className="mb-4 flex items-center gap-2 font-heading text-base font-semibold text-card-foreground">
            <Globe className="h-4 w-4 text-muted-foreground" /> Language & Region
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Language</label>
              <select className="h-9 w-full rounded-md border bg-background px-3 text-sm text-foreground">
                <option>English</option>
                <option>Hindi</option>
                <option>Tamil</option>
                <option>Telugu</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Timezone</label>
              <select className="h-9 w-full rounded-md border bg-background px-3 text-sm text-foreground">
                <option>Asia/Kolkata (IST)</option>
                <option>America/New_York (EST)</option>
                <option>Europe/London (GMT)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="rounded-lg border border-destructive/30 bg-card p-6">
          <h2 className="mb-2 flex items-center gap-2 font-heading text-base font-semibold text-destructive">
            <Trash2 className="h-4 w-4" /> Danger Zone
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">Once you delete your account, there is no going back.</p>
          <Button variant="destructive" size="sm">Delete Account</Button>
        </section>
      </div>
    </div>
  );
}
