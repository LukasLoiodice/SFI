import ReactDOM from "react-dom/client";
import { RouterProvider } from 'react-router';
import { router } from './router.tsx';
import { AppProvider } from "./provider.tsx";
import './index.css'

const root = document.getElementById("root") as HTMLElement

ReactDOM.createRoot(root).render(
  <AppProvider>
      <RouterProvider router={router} />
  </AppProvider>
)