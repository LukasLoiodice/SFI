import { useEffect, type ReactNode } from "react";
import { getCurrentUserService } from "src/services/auth";
import { useAuthStore } from "src/stores/auth";

export function AppProvider({ children }: { children: ReactNode }) {
    const userToken = useAuthStore((state) => state.token)
    const setCurrentUser = useAuthStore((state) => state.setCurrentUser)

    useEffect(() => {
        if (userToken) {
            getCurrentUserService(userToken).then((user) => {
                setCurrentUser(userToken, user)
            }).catch((error) => {
                console.log(error)
            })
        }
    })

    return (
        <>
            {children}
        </>
    );
}