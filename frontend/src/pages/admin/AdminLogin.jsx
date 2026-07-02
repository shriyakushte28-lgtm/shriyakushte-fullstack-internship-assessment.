import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

function AdminLogin() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            const response = await api.post(
                "/auth/login",
                formData
            );

            if (response.data.role !== "ADMIN") {

                alert("Access denied. This portal is only for administrators.");

                return;

            }

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.id);
            localStorage.setItem("fullName", response.data.fullName);
            localStorage.setItem("role", response.data.role);

            navigate("/admin/dashboard");

        }

        catch (error) {

            console.log(error);

            alert("Invalid Admin Credentials");

        }

    }

    return (

        <div className="min-h-screen flex justify-center items-center bg-slate-100">

            <div className="bg-white rounded-2xl shadow p-10 w-[420px]">

                <h1 className="text-3xl font-bold mb-2">

                    Admin Login

                </h1>

                <p className="text-gray-500 mb-6">

                    Sign in to manage the Internship Portal

                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        name="email"
                        placeholder="Admin Email"
                        className="border p-3 rounded-lg w-full"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="border p-3 rounded-lg w-full"
                        onChange={handleChange}
                    />

                    <button
                        className="bg-slate-800 hover:bg-slate-900 text-white w-full p-3 rounded-lg"
                    >

                        Login

                    </button>

                </form>

                <p className="mt-6 text-center">

                    <Link
                        to="/login"
                        className="text-blue-600"
                    >
                        ← Back to Student Login
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default AdminLogin;