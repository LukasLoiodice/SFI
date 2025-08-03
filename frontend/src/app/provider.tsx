import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import {loginService} from "../services/auth"

const AuthContext = createContext<any>(null);

interface UserStorage {
    email: string;
    token: string
}

export function AppProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserStorage | null>();

    const login = async (email: string, password: string) => {
        const token = await loginService(email, password)
        localStorage.setItem("token", token)
        setUser({email, token});
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);