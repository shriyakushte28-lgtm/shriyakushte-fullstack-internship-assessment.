import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/student/Dashboard";
import BrowseInternships from "./pages/student/BrowseInternships";
import InternshipDetails from "./pages/student/InternshipDetails";
import MyApplications from "./pages/student/MyApplications";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/internships" element={<BrowseInternships />} />

        <Route path="/internships/:id" element={<InternshipDetails />} />

        <Route path="/applications" element={<MyApplications />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);