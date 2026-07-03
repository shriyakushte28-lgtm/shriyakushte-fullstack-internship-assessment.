import { BarChart2, Star, Percent, Sparkles } from "lucide-react";

function InsightCard({ title, value, icon: Icon }) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {title}
                </span>
                <h4 className="text-xs font-bold mt-1 text-slate-900 truncate" title={value}>
                    {value}
                </h4>
            </div>
            <div className="p-2 bg-slate-50 border border-slate-150 rounded-lg text-slate-600 shrink-0">
                <Icon size={14} />
            </div>
        </div>
    );
}

function PlatformInsights({ analytics }) {
    return (
        <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">System Insights</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <InsightCard
                    title="Popular Posting"
                    value={analytics.mostAppliedInternship || "N/A"}
                    icon={Star}
                />
                <InsightCard
                    title="Avg Submissions"
                    value={analytics.averageApplications || "0"}
                    icon={BarChart2}
                />
                <InsightCard
                    title="Pending Screenings"
                    value={analytics.pendingReviews || "0"}
                    icon={Sparkles}
                />
                <InsightCard
                    title="Acceptance Rate"
                    value={`${analytics.acceptanceRate || 0}%`}
                    icon={Percent}
                />
            </div>
        </div>
    );
}

export default PlatformInsights;