import ReactDOM from "react-dom/client";
import { RouterProvider } from 'react-router';
import { router } from 'src/app/router.tsx';
import { AppProvider } from "src/app/provider";
import 'src/app/index.css'

const root = document.getElementById("root") as HTMLElement

ReactDOM.createRoot(root).render(
  <AppProvider>
      <RouterProvider router={router} />
  </AppProvider>
)