import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
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
    });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));
