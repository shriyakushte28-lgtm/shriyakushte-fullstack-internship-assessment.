import { UserPlus, Sparkles, Clock } from "lucide-react";

function RecentActivity({ dashboard }) {
    const activities = dashboard.recentApplications || [];

    return (
        <div className="bg-white border border-zinc-200/80 rounded-xl p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
            <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-wider mb-4">
                Recent Portal Activity
            </h3>

            {activities.length === 0 ? (
                <p className="text-xs text-zinc-400 py-4 text-center">No recent activities logs recorded.</p>
            ) : (
                <div className="space-y-3.5">
                    {activities.slice(0, 4).map((app) => (
                        <div
                            key={app.id}
                            className="flex items-start gap-3 text-xs"
                        >
                            <div className="bg-zinc-50 border border-zinc-150 p-1.5 rounded-lg text-zinc-500 shrink-0">
                                <UserPlus size={12} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-zinc-600 leading-normal">
                                    <span className="font-bold text-zinc-900">{app.student.fullName}</span>
                                    {" applied for the "}
                                    <span className="font-semibold text-zinc-950">{app.internship.title}</span>
                                    {" role."}
                                </p>
                                <span className="text-[10px] text-zinc-400 mt-1 block font-medium flex items-center gap-1">
                                    <Clock size={10} />
                                    {app.appliedAt ? app.appliedAt.substring(0, 10) : "Just now"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RecentActivity;