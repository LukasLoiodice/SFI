import { createBrowserRouter } from "react-router";
import { App } from "src/app/app";
import Login from "src/app/pages/login";
import Home from "src/app/pages/home";
import Register from "src/app/pages/register";
import Profile from "src/app/pages/profile"
import Admin from "src/app/pages/admin";
import Product from "src/app/pages/product";
import Item from "src/app/pages/item";
import ItemID from "src/app/pages/itemID"

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
            },
            {
                path: "profile",
                Component: Profile
            },
            {
                path: "admin",
                Component: Admin
            },
            {
                path: "products",
                Component: Product
            },
            {
                path: "items",
                Component: Item
            },
            {
                path: "items/:itemID",
                Component: ItemID
            }
        ]
    }
])