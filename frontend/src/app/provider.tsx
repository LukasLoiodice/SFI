import { useEffect, useState, type ReactNode } from "react";
import { getCurrentUserService } from "src/features/auth/service";
import { useAuthStore } from "src/stores/auth";
import { setupInterceptor } from "src/app/api";

export function AppProvider({ children }: { children: ReactNode }) {
    const userToken = useAuthStore((state) => state.token)
    const setCurrentUser = useAuthStore((state) => state.setCurrentUser)
    const clearCurrentUser = useAuthStore((state) => state.clearCurrentUser)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setupInterceptor(clearCurrentUser, () => useAuthStore.getState().refreshToken, setCurrentUser);

        if (userToken) {
            getCurrentUserService(userToken).then((user) => {
                setCurrentUser(userToken, user)
            }).finally(() => {
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [clearCurrentUser])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen w-screen bg-gray-50">
                <div className="h-12 w-12 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <>
            {children}
        </>
    );
}