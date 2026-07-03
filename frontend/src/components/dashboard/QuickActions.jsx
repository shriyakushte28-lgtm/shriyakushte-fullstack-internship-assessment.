import { Briefcase, FileText, User, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ActionCard({ icon: Icon, title, subtitle, onClick, badge }) {
    return (
        <button
            onClick={onClick}
            className="w-full bg-white border border-slate-200 rounded-lg p-3 hover:border-slate-350 hover:shadow-[0_1px_3px_0_rgba(0,0,0,0.01)] transition-all duration-150 text-left flex items-center justify-between group cursor-pointer"
        >
            <div className="flex items-center gap-2.5">
                <div className="bg-slate-50 border border-slate-150 p-2 rounded-lg text-slate-700 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-150">
                    <Icon size={14} />
                </div>
                <div>
                    <h3 className="font-bold text-xs text-slate-900 leading-tight">
                        {title}
                    </h3>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                        {subtitle}
                    </p>
                </div>
            </div>
            {badge && (
                <span className="text-[8px] font-extrabold uppercase tracking-wider bg-blue-50 border border-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                    {badge}
                </span>
            )}
        </button>
    );
}

function QuickActions() {
    const navigate = useNavigate();

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 mb-3.5">
                Quick Shortcuts
            </h2>

            <div className="space-y-2">
                <ActionCard
                    icon={Briefcase}
                    title="Browse Positions"
                    subtitle="Explore matches & filters"
                    onClick={() => navigate("/internships")}
                />
                <ActionCard
                    icon={FileText}
                    title="Track Submissions"
                    subtitle="Check interview stage status"
                    onClick={() => navigate("/applications")}
                />
                <ActionCard
                    icon={Bookmark}
                    title="Saved Internships"
                    subtitle="View bookmarked listings"
                    onClick={() => navigate("/saved")}
                />
                <ActionCard
                    icon={User}
                    title="My Student Profile"
                    subtitle="Upload PDF resume file"
                    onClick={() => navigate("/profile")}
                    badge="Hot"
                />
            </div>
        </div>
    );
}

export default QuickActions;