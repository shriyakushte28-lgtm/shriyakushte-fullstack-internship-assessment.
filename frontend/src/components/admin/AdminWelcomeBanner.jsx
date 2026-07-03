import { Calendar, ShieldAlert } from "lucide-react";

function AdminWelcomeBanner() {
    const fullName = localStorage.getItem("fullName") || "Admin";
    const today = new Date().toLocaleDateString("en-US", {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50/50 via-white to-white text-slate-700 p-5 border border-slate-200 shadow-sm">
            {/* Background glow effects */}
            <div className="absolute right-0 top-0 h-40 w-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-50 text-[10px] font-bold uppercase tracking-wider text-blue-700 border border-blue-100">
                        <ShieldAlert size={11} />
                        <span>Security Level Active</span>
                    </span>
                    <h1 className="text-xl md:text-2xl font-bold mt-2.5 tracking-tight text-slate-900">
                        Welcome back, {fullName}
                    </h1>
                    <p className="text-slate-500 mt-1 text-xs max-w-xl">
                        Monitor student registrations, audit compatibility match scores, and review incoming candidate applications.
                    </p>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 text-xs font-semibold w-fit shrink-0">
                    <Calendar size={13} className="text-slate-400" />
                    <span>{today}</span>
                </div>
            </div>
        </div>
    );
}

export default AdminWelcomeBanner;