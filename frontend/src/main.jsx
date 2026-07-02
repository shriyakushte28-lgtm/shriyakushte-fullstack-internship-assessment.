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
import AdminLogin from "./pages/admin/AdminLogin";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import StudentRoute from "./components/routes/StudentRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Settings from "./pages/student/Settings";
import ManageStudents from "./pages/admin/ManageStudents";
import StudentDetails from "./pages/admin/StudentDetails";
import MySavedInternships from "./pages/student/MySavedInternships";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <StudentRoute>
                <Dashboard />
            </StudentRoute>
        </ProtectedRoute>
    }
/>

        <Route path="/internships" element={<BrowseInternships />} />

        <Route path="/internships/:id" element={<InternshipDetails />} />

        <Route path="/applications" element={<MyApplications />} />

        <Route
    path="/admin/dashboard"
    element={
        <ProtectedRoute>
            <AdminRoute>
                <AdminDashboard />
            </AdminRoute>
        </ProtectedRoute>
    }
/>

        <Route path="/admin/internships" element={<ManageInternships />} />

        <Route path="/admin/applications" element={<ManageApplications />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
    path="/settings"
    element={
        <ProtectedRoute>
            <StudentRoute>
                <Settings />
            </StudentRoute>
        </ProtectedRoute>
    }
/>

    <Route path="/routes/ProtectedRoute" element={<ProtectedRoute />} />

    <Route path="/routes/StudentRoute" element={<StudentRoute />} />

    <Route path="/routes/AdminRoute" element={<AdminRoute />} />

    <Route path="/pages/student/Settings" element={<Settings />} />

    <Route
    path="/admin/students"
    element={
        <ProtectedRoute>
            <AdminRoute>
                <ManageStudents />
            </AdminRoute>
        </ProtectedRoute>
    }
/>

    <Route
    path="/admin/students/:id"
    element={
        <ProtectedRoute>
            <AdminRoute>
                <StudentDetails />
            </AdminRoute>
        </ProtectedRoute>
    }
/>

<Route
    path="/saved"
    element={
        <ProtectedRoute>
            <StudentRoute>
                <MySavedInternships />
            </StudentRoute>
        </ProtectedRoute>
    }
/>

      </Routes>
    </BrowserRouter>
  </StrictMode>
);