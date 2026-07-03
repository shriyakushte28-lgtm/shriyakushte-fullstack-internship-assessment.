import { useNavigate } from "react-router-dom";
import { PlusCircle, FileText, Users, BarChart2 } from "lucide-react";

function ActionButton({ icon: Icon, title, subtitle, onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-full bg-white border border-zinc-200/80 rounded-xl p-4 hover:border-zinc-300 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 text-left flex items-center justify-between group cursor-pointer"
        >
            <div className="flex items-center gap-3">
                <div className="bg-zinc-50 border border-zinc-150 p-2.5 rounded-lg text-zinc-700 shadow-sm group-hover:bg-zinc-950 group-hover:text-white transition-all duration-200">
                    <Icon size={16} />
                </div>
                <div>
                    <h4 className="font-bold text-sm text-zinc-900 leading-tight">
                        {title}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-0.5">
                        {subtitle}
                    </p>
                </div>
            </div>
        </button>
    );
}

function QuickActions() {
    const navigate = useNavigate();

    return (
        <div className="bg-white border border-zinc-200/80 rounded-xl p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
            <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-wider mb-4">
                Console Shortcuts
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ActionButton
                    icon={PlusCircle}
                    title="Create Posting"
                    subtitle="Publish new internship"
                    onClick={() => navigate("/admin/internships")}
                />
                <ActionButton
                    icon={FileText}
                    title="Review Queue"
                    subtitle="Audit incoming resumes"
                    onClick={() => navigate("/admin/applications")}
                />
                <ActionButton
                    icon={Users}
                    title="Student Directory"
                    subtitle="Manage candidate profiles"
                    onClick={() => navigate("/admin/students")}
                />
                <ActionButton
                    icon={BarChart2}
                    title="Platform Health"
                    subtitle="Verify backend parameters"
                    onClick={() => navigate("/admin/dashboard")}
                />
            </div>
        </div>
    );
}

export default QuickActions;