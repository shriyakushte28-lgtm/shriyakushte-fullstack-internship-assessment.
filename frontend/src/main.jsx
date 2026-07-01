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
import AdminDashboard from "./pages/admin/Dashboard";
import ManageInternships from "./pages/admin/ManageInternships";
import ManageApplications from "./pages/admin/ManageApplications";
import Profile from "./pages/student/Profile";

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

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/admin/internships" element={<ManageInternships />} />

        <Route path="/admin/applications" element={<ManageApplications />} />

        <Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);