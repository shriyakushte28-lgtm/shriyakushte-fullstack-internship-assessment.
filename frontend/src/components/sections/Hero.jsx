import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

function Hero() {
    const navigate = useNavigate();

    return (
        <section className="bg-slate-50 border-b border-slate-200 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                <div className="space-y-6">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold">
                        <Sparkles size={12} />
                        <span>Empowering Student Careers</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                        Launch Your Career <br />
                        <span className="text-blue-600">with Right Roles</span>
                    </h1>

                    <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-lg">
                        Explore thousands of internships, connect with verified recruiters, and manage your full application progress in a single unified dashboard.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => navigate("/internships")}
                            className="btn-primary py-2.5 px-5 text-sm"
                        >
                            <span>Browse Internships</span>
                            <ArrowRight size={15} />
                        </button>
                        <button
                            onClick={() => navigate("/login")}
                            className="btn-secondary py-2.5 px-5 text-sm"
                        >
                            <span>Dashboard Access</span>
                        </button>
                    </div>
                </div>

                <div className="relative">
                    {/* Background glow decorator */}
                    <div className="absolute inset-0 bg-blue-600/5 rounded-2xl blur-3xl -z-10"></div>
                    <img
                        src="/hero_dashboard_mockup.png"
                        className="rounded-2xl border border-slate-200/80 shadow-md max-w-full h-auto object-cover"
                        alt="InternSphere SaaS Dashboard UI Mockup"
                    />
                </div>
            </div>
        </section>
    );
}

export default Hero;