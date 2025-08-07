import { Navigate } from "react-router";
import { ROLE_ENUM } from "src/models/user";
import { useAuthStore } from "src/stores/auth";

export const AdminComponent = () => {
    const user = useAuthStore((res) => res.user)

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.role != ROLE_ENUM.admin) {
        return <Navigate to="/" />;
    }

    return (
        <>
            admin
        </>
    );
}