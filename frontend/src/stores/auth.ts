import { create } from "zustand";

interface AuthState {
    email: string;
    isLoggedIn: boolean;
    setCurrentUser: (email: string) => void;
    clearCurrentUser: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    email: '',
    isLoggedIn: false,
    setCurrentUser: (email: string) => set({email: email, isLoggedIn: true}),
    clearCurrentUser: () => set({email: '', isLoggedIn: false})
}))