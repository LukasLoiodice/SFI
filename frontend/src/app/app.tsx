import { Outlet } from "react-router";
import { NavLayout } from "../features/layout/components/nav";

export const App = () => {
    return (
        <div>
            <NavLayout />
            <main>
                <Outlet />
            </main>
        </div>
    );
}