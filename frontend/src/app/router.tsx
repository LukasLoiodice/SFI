import { createBrowserRouter } from "react-router";
import AppLayout from "./appLayout";
import Login from "./pages/login";
import Home from "./pages/home";
import Register from "./pages/register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "login",
                Component: Login
            },
            {
                path: "register",
                Component: Register
            }
        ]
    }
])