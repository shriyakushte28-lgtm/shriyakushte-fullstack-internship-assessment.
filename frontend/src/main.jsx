import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

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
import AdminProfile from "./pages/admin/AdminProfile";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/public/NotFound";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>

    <Toaster
    position="top-right"
    reverseOrder={false}
    gutter={10}
    toastOptions={{
        duration: 3000,
        style: {
            background: "#ffffff",
            color: "#0f172a",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "14px 16px",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)"
        },

        success: {
            iconTheme: {
                primary: "#16a34a",
                secondary: "#ffffff",
            },
        },

        error: {
            iconTheme: {
                primary: "#dc2626",
                secondary: "#ffffff",
            },
        },
    }}
/>

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
    path="/admin/profile"
    element={
        <ProtectedRoute>
            <AdminRoute>
                <AdminProfile />
            </AdminRoute>
        </ProtectedRoute>
    }
/>

<Route
    path="/admin/settings"
    element={
        <ProtectedRoute>
            <AdminRoute>
                <AdminSettings />
            </AdminRoute>
        </ProtectedRoute>
    }
/>

<Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);