// src/main.jsx
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { injectSpeedInsights } from '@vercel/speed-insights';

// Only enable Speed Insights in production
if (import.meta.env.PROD) {
  injectSpeedInsights();
}

import App from "./App";              // homepage
const Resume = lazy(() => import("./components/Resume")); // resume page (lazy)
import Root from "./Root";
import "./styles/index.css";

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <App /> },
      { path: "resume", element: (
        <Suspense fallback={<div className="p-6">Loading…</div>}>
          <Resume />
        </Suspense>
      ) },
      { path: "*", element: <div className="p-6">404 Not Found</div> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
