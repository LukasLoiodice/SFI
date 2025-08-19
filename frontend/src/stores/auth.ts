import type { User } from "src/features/users/model";
import { create } from "zustand";

interface AuthState {
    token: string | null;
    refreshToken: string | null
    user: User | null
    isLoggedIn: boolean;
    setRefreshToken: (refreshToken: string) => void
    setCurrentUser: (token: string, user: User) => void;
    clearCurrentUser: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem("token"),
    refreshToken: localStorage.getItem("refreshToken"),
    user: null,
    isLoggedIn: false,
    setRefreshToken: (refreshToken: string) => {
        localStorage.setItem("refreshToken", refreshToken)
        set({
            refreshToken: refreshToken
        })
    },
    setCurrentUser: (token: string, user: User) => {
        localStorage.setItem("token", token)
        set({
            token: token,
            user: user,
            isLoggedIn: true
        })
    },
    clearCurrentUser: () => {
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
        set({ token: null, refreshToken: null, user: null, isLoggedIn: false })
    }
}))