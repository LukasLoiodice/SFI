import { Outlet } from "react-router";
import { NavLayout } from "src/features/layout/components/nav"
export const App = () => {
    return (
        <div className="bg-gray-100">
            <NavLayout />
            <main>
                <Outlet />
            </main>
        </div>
    );
}