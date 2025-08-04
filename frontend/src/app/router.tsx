import { createBrowserRouter } from "react-router";
import { App } from "src/app/app";
import Login from "src/app/pages/login";
import Home from "src/app/pages/home";
import Register from "src/app/pages/register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
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