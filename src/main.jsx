// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";              // homepage
import Resume from "./components/Resume"; // resume page
import "./styles/index.css";

// Define routes
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/resume", element: <Resume /> },
  { path: "*", element: <div className="p-6">404 Not Found</div> } // fallback
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);