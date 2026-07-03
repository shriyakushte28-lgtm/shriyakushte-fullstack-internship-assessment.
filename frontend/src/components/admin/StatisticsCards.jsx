import { Users, Briefcase, FileText, CheckCircle } from "lucide-react";

function StatCard({ title, value, icon: Icon, colorClass, borderClass }) {
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

function StatisticsCards({ dashboard }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
                title="Total Candidates"
                value={dashboard.students}
                icon={Users}
                colorClass="bg-slate-50 text-slate-700"
                borderClass="border-slate-200"
            />
            <StatCard
                title="Job Postings"
                value={dashboard.internships}
                icon={Briefcase}
                colorClass="bg-blue-50 text-blue-600"
                borderClass="border-blue-100"
            />
            <StatCard
                title="Applications Queue"
                value={dashboard.applications}
                icon={FileText}
                colorClass="bg-amber-50 text-amber-600"
                borderClass="border-amber-100"
            />
            <StatCard
                title="Active Opportunities"
                value={dashboard.openInternships}
                icon={CheckCircle}
                colorClass="bg-green-50 text-green-600"
                borderClass="border-green-100"
            />
        </div>
    );
}

export default StatisticsCards;