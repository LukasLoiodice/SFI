import type { User } from "src/features/users/model";
import { create } from "zustand";

interface AuthState {
    token: string | null;
    user: User | null
    isLoggedIn: boolean;
    setCurrentUser: (token: string, user: User) => void;
    clearCurrentUser: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem("token"),
    user: null,
    isLoggedIn: false,
    setCurrentUser: (token: string, user: User) => set({ token: token, user: user, isLoggedIn: true }),
    clearCurrentUser: () => set({ token: null, user: null, isLoggedIn: false })
}))