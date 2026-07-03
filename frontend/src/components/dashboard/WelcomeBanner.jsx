import { Sparkles } from "lucide-react";

function WelcomeBanner() {
    const fullName = localStorage.getItem("fullName") || "Student";

    return (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50/50 via-white to-white text-slate-700 p-5 border border-slate-200 shadow-sm">
            {/* Subtle background glow */}
            <div className="absolute right-0 top-0 h-40 w-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative flex items-center justify-between gap-4">
                <div className="max-w-xl">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-50 text-[10px] font-bold uppercase tracking-wider text-blue-700 border border-blue-100">
                        <Sparkles size={11} />
                        <span>Ready for your next step?</span>
                    </span>
                    <h1 className="text-xl md:text-2xl font-bold mt-2.5 tracking-tight text-slate-900">
                        Welcome back, {fullName}
                    </h1>
                    <p className="text-slate-500 mt-1 text-xs leading-relaxed">
                        Explore personalized recommendations, keep track of your applications, and update your profile for recruiters.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default WelcomeBanner;