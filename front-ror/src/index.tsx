import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.scss";
import LoginComponent from "./components/LoginComponent";
import QuestsComponent from "./components/QuestsComponent";

const Home = lazy(() => import("./routes/Home"));
const ErrorPage = lazy(() => import("./routes/ErrorPage"));

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginComponent />,
      },
      {
        path: "quests",
        element: <QuestsComponent />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
