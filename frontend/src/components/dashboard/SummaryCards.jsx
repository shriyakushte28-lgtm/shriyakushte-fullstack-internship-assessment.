import { useEffect, useState } from "react";
import { Briefcase, Clock, Trophy, CheckCircle } from "lucide-react";
import { getSummary } from "../../services/applicationService";

function SummaryCard({ title, value, icon: Icon, colorClass, borderClass }) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {title}
                </span>
                <h2 className="text-2xl font-bold tracking-tight mt-0.5 text-slate-900">
                    {value}
                </h2>
            </div>
            <div className={`p-2 rounded-lg border ${borderClass} ${colorClass}`}>
                <Icon size={16} />
            </div>
        </div>
    );
}

function SummaryCards() {
    const userId = Number(localStorage.getItem("userId"));
    const [summary, setSummary] = useState({
        applied: 0,
        pending: 0,
        shortlisted: 0,
        accepted: 0
    });

    useEffect(() => {
        loadSummary();
    }, []);

    async function loadSummary() {
        try {
            const response = await getSummary(userId);
            setSummary(response.data);
        } catch (error) {
            console.error("Failed to load student summary counts", error);
        }
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard
                title="Total Applications"
                value={summary.applied}
                icon={Briefcase}
                colorClass="bg-slate-50 text-slate-700"
                borderClass="border-slate-200"
            />
            <SummaryCard
                title="Pending Decisions"
                value={summary.pending}
                icon={Clock}
                colorClass="bg-amber-50 text-amber-600"
                borderClass="border-amber-100"
            />
            <SummaryCard
                title="Shortlisted Queue"
                value={summary.shortlisted}
                icon={Trophy}
                colorClass="bg-blue-50 text-blue-600"
                borderClass="border-blue-100"
            />
            <SummaryCard
                title="Accepted Offers"
                value={summary.accepted}
                icon={CheckCircle}
                colorClass="bg-green-50 text-green-600"
                borderClass="border-green-100"
            />
        </div>
    );
}

export default SummaryCards;