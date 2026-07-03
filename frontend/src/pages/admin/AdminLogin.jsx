import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, ShieldCheck, ShieldAlert } from "lucide-react";
import api from "../../services/api";

function AdminLogin() {
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
            if (response.data.role !== "ADMIN") {
                setErrorMsg("Access denied. This portal is only for administrators.");
                setLoading(false);
                return;
            }

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.id);
            localStorage.setItem("fullName", response.data.fullName);
            localStorage.setItem("role", response.data.role);

            navigate("/admin/dashboard");
        } catch (error) {
            console.error(error);
            setErrorMsg("Invalid administrator credentials.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-zinc-950 text-white">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center items-center gap-2">
                    <div className="h-9 w-9 rounded-lg bg-white flex items-center justify-center text-zinc-950 font-bold text-lg shadow-sm">
                        I
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">InternSphere</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                        Admin
                    </span>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white tracking-tight">
                    Admin Portal
                </h2>
                <p className="mt-2 text-center text-sm text-zinc-400">
                    Sign in to manage internship postings and students
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-zinc-900 py-8 px-4 border border-zinc-800 rounded-2xl shadow-2xl sm:px-10">
                    {errorMsg && (
                        <div className="mb-4 p-3 bg-red-950/50 border border-red-950 text-red-300 text-sm rounded-lg flex items-center gap-2">
                            <ShieldAlert size={16} className="text-red-400 shrink-0" />
                            {errorMsg}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                                Administrator Email
                            </label>
                            <div className="relative rounded-lg shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                                    <Mail size={16} />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="admin@internsphere.com"
                                    className="block w-full pl-10 pr-3 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white text-sm transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                                Password
                            </label>
                            <div className="relative rounded-lg shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                                    <Lock size={16} />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="block w-full pl-10 pr-3 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white text-sm transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-zinc-950 bg-white hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-white disabled:opacity-50 transition-all cursor-pointer"
                            >
                                {loading ? "Verifying..." : "Access Dashboard"}
                                {!loading && <ArrowRight size={16} />}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            to="/login"
                            className="text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                        >
                            &larr; Return to Student Portal
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;