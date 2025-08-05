import { create } from "zustand";

interface AuthState {
    token: string | null;
    email: string;
    isLoggedIn: boolean;
    setCurrentUser: (token: string, email: string) => void;
    clearCurrentUser: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    email: '',
    isLoggedIn: false,
    token: localStorage.getItem("token"),
    setCurrentUser: (token: string, email: string) => set({token: token, email: email, isLoggedIn: true}),
    clearCurrentUser: () => set({token: null, email: '', isLoggedIn: false})
}))