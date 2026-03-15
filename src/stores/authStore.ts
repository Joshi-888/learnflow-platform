import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  interests?: string[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  setPreferences: (role: string, interests: string[]) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  hasCompletedOnboarding: false,
  login: (email: string, _password: string) => {
    set({
      user: { id: "1", name: email.split("@")[0], email },
      isAuthenticated: true,
    });
  },
  register: (name: string, email: string, _password: string) => {
    set({
      user: { id: "1", name, email },
      isAuthenticated: true,
      hasCompletedOnboarding: false,
    });
  },
  logout: () => set({ user: null, isAuthenticated: false, hasCompletedOnboarding: false }),
  setPreferences: (role: string, interests: string[]) => {
    set((s) => ({
      user: s.user ? { ...s.user, role, interests } : null,
      hasCompletedOnboarding: true,
    }));
  },
}));
