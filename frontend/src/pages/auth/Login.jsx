import { useState } from "react";
import { login } from "../../services/authService";

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await login(formData);

            console.log(response.data);

            localStorage.setItem("token", response.data.token);

            alert("Login Successful");

        } catch (error) {

            alert("Invalid Credentials");

            console.log(error);

        }

    };

    return (

        <div className="min-h-screen flex">

            {/* Left Side */}

            <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center px-20">

                <h1 className="text-6xl font-bold">

                    InternSphere

                </h1>

                <p className="mt-8 text-xl">

                    Launch your career with verified internship opportunities.

                </p>

            </div>

            {/* Right Side */}

            <div className="w-1/2 flex justify-center items-center">

                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-xl rounded-2xl p-10 w-[450px]"
                >

                    <h2 className="text-4xl font-bold">

                        Welcome Back

                    </h2>

                    <input

                        type="email"

                        name="email"

                        placeholder="Email"

                        onChange={handleChange}

                        className="w-full border p-4 rounded-xl mt-8"

                    />

                    <input

                        type="password"

                        name="password"

                        placeholder="Password"

                        onChange={handleChange}

                        className="w-full border p-4 rounded-xl mt-5"

                    />

                    <button

                        className="w-full bg-blue-600 text-white py-4 rounded-xl mt-8"

                    >

                        Login

                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;