import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
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

            await api.post("/auth/register", formData);

            alert("Registration Successful!");

            navigate("/login");

        } catch (error) {

            console.log(error);

            alert("Registration Failed");

        }

    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="bg-white p-10 rounded-2xl shadow w-[420px]">

                <h1 className="text-3xl font-bold mb-6">

                    Student Registration

                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        name="fullName"
                        placeholder="Full Name"
                        onChange={handleChange}
                        className="border w-full p-3 rounded-lg"
                    />

                    <input
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="border w-full p-3 rounded-lg"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="border w-full p-3 rounded-lg"
                    />

                    <button
                        className="bg-blue-600 text-white w-full p-3 rounded-lg"
                    >

                        Register

                    </button>

                </form>

                <p className="mt-6 text-center">

                    Already have an account?

                    <Link
                        to="/login"
                        className="text-blue-600 ml-2"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;