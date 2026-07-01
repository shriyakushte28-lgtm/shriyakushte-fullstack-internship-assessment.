import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

function Login() {

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

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "userId",
                response.data.id
            );

            localStorage.setItem(
                "fullName",
                response.data.fullName
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            if (response.data.role === "ADMIN") {

                navigate("/admin/dashboard");

            }

            else {

                navigate("/dashboard");

            }

        }

        catch (error) {

            console.log(error);

            alert("Invalid Email or Password");

        }

    }

    return (

        <div className="min-h-screen flex justify-center items-center bg-slate-100">

            <div className="bg-white rounded-2xl shadow p-10 w-[420px]">

                <h1 className="text-3xl font-bold mb-6">

                    Login

                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        name="email"
                        placeholder="Email"
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
                        className="bg-blue-600 text-white w-full p-3 rounded-lg"
                    >

                        Login

                    </button>

                </form>

                <p className="mt-6 text-center">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-blue-600 ml-2"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;