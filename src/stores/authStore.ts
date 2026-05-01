import { create } from "zustand";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User as SupaUser } from "@supabase/supabase-js";

interface AppUser {
  id: string;
  name: string;
  email: string;
  role?: string;
  interests?: string[];
}

interface AuthState {
  user: AppUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  hasCompletedOnboarding: boolean;
  initialized: boolean;
  init: () => () => void;
  loginWithPassword: (email: string, password: string) => Promise<{ error?: string }>;
  registerWithPassword: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  loginWithGoogle: () => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  setPreferences: (role: string, interests: string[]) => void;
}

const toAppUser = (su: SupaUser | null | undefined, name?: string): AppUser | null => {
  if (!su) return null;
  return {
    id: su.id,
    email: su.email ?? "",
    name:
      name ||
      (su.user_metadata?.full_name as string) ||
      (su.user_metadata?.name as string) ||
      (su.email ? su.email.split("@")[0] : "User"),
  };
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  isAuthenticated: false,
  isAdmin: false,
  hasCompletedOnboarding: false,
  initialized: false,

  init: () => {
    const checkRole = async (userId: string) => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);
      const isAdmin = !!data?.some((r) => r.role === "admin");
      set({ isAdmin });
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const appUser = toAppUser(session?.user ?? null);
      set({
        session,
        user: appUser,
        isAuthenticated: !!session,
        initialized: true,
      });
      if (session?.user) {
        setTimeout(() => checkRole(session.user.id), 0);
      } else {
        set({ isAdmin: false });
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      const appUser = toAppUser(session?.user ?? null);
      set({
        session,
        user: appUser,
        isAuthenticated: !!session,
        initialized: true,
      });
      if (session?.user) checkRole(session.user.id);
    });

    return () => sub.subscription.unsubscribe();
  },

  loginWithPassword: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error ? { error: error.message } : {};
  },

  registerWithPassword: async (name, email, password) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: name, name },
      },
    });
    return error ? { error: error.message } : {};
  },

  loginWithGoogle: async () => {
    const { lovable } = await import("@/integrations/lovable");
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) return { error: (result.error as Error).message || "Google sign-in failed" };
    return {};
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, isAuthenticated: false, isAdmin: false, hasCompletedOnboarding: false });
  },

  setPreferences: (role, interests) => {
    set((s) => ({
      user: s.user ? { ...s.user, role, interests } : null,
      hasCompletedOnboarding: true,
    }));
  },
}));
