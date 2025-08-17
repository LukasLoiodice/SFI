import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { NavLayout } from "src/features/layout/components/nav"
import { useAuthStore } from "src/stores/auth";
import { setupInterceptor } from "./api";

export const App = () => {
    const navigate = useNavigate();
    const clearCurrentUser = useAuthStore((state) => state.clearCurrentUser);

    useEffect(() => {
        setupInterceptor(clearCurrentUser, navigate);
    }, [clearCurrentUser, navigate]);

    return (
        <div className="bg-gray-100">
            <NavLayout />
            <main>
                <Outlet />
            </main>
        </div>
    );
}