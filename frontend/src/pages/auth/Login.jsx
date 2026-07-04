import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import api from "../../services/api";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrorMsg("");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setErrorMsg("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setErrorMsg("");

        try {
            const response = await api.post("/auth/login", formData);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.id);
            localStorage.setItem("fullName", response.data.fullName);
            localStorage.setItem("role", response.data.role);

            if (response.data.role !== "STUDENT") {
                setErrorMsg("Access denied. Please use the Admin Login page.");
                setLoading(false);
                return;
            }

            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            setErrorMsg("Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-zinc-50/50">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center items-center gap-2">
                    <img
    src="/logo.png"
    alt="InternSphere"
    className="h-10 w-10"
/>
                    <span className="text-xl font-bold tracking-tight text-zinc-900">InternSphere</span>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-900 tracking-tight">
                    Welcome back
                </h2>
                <p className="mt-2 text-center text-sm text-zinc-600">
                    Sign in to your student account
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 border border-zinc-200/80 rounded-2xl shadow-sm sm:px-10">
                    {errorMsg && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-600 shrink-0"></span>
                            {errorMsg}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                                Email Address
                            </label>
                            <div className="relative rounded-lg shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                                    <Mail size={16} />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="block w-full pl-10 pr-3 py-2.5 border border-zinc-300 rounded-lg text-zinc-950 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-zinc-950 text-sm transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                                Password
                            </label>
                            <div className="relative rounded-lg shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                                    <Lock size={16} />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="block w-full pl-10 pr-3 py-2.5 border border-zinc-300 rounded-lg text-zinc-950 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-zinc-950 text-sm transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-zinc-900 focus:ring-zinc-900 border-zinc-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-zinc-600">
                                    Remember me
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-zinc-950 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-950 disabled:opacity-50 transition-all cursor-pointer"
                            >
                                {loading ? "Signing in..." : "Sign in"}
                                {!loading && <ArrowRight size={16} />}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center text-sm text-zinc-600">
                        Don't have an account?{" "}
                        <Link to="/register" className="font-semibold text-zinc-950 hover:underline">
                            Register now
                        </Link>
                    </div>

                    <div className="mt-4 border-t border-zinc-100 pt-4 text-center">
                        <Link
                            to="/admin/login"
                            className="text-xs font-medium text-zinc-500 hover:text-zinc-950 transition-colors"
                        >
                            Admin Access Portal &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;