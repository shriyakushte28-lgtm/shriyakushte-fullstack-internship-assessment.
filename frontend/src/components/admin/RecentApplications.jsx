import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function RecentApplications({ applications }) {
    const navigate = useNavigate();

    function getStatusBadge(status) {
        switch (status) {
            case "PENDING":
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 border border-amber-100 text-amber-700">
                        Pending
                    </span>
                );
            case "SHORTLISTED":
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 border border-indigo-100 text-indigo-700">
                        Shortlisted
                    </span>
                );
            case "ACCEPTED":
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 border border-emerald-100 text-emerald-700">
                        Accepted
                    </span>
                );
            case "REJECTED":
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-100 border border-zinc-200 text-zinc-600">
                        Rejected
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-50 border border-zinc-150 text-zinc-500">
                        {status}
                    </span>
                );
        }
    }

    return (
        <div className="bg-white border border-zinc-200/80 rounded-xl p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-wider">
                    Recent Applications
                </h3>
                <button
                    onClick={() => navigate("/admin/applications")}
                    className="text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors cursor-pointer"
                >
                    View Queue &rarr;
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-zinc-200 text-left">
                    <thead>
                        <tr className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                            <th className="pb-2">Student</th>
                            <th className="pb-2">Position</th>
                            <th className="pb-2 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 text-xs">
                        {applications.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="py-4 text-center text-zinc-400">No applications yet.</td>
                            </tr>
                        ) : (
                            applications.slice(0, 5).map((app) => (
                                <tr key={app.id} className="hover:bg-zinc-50/50">
                                    <td className="py-2.5 font-semibold text-zinc-900 pr-2">
                                        {app.student.fullName}
                                    </td>
                                    <td className="py-2.5 text-zinc-500 pr-2">
                                        {app.internship.title}
                                    </td>
                                    <td className="py-2.5 text-center">
                                        {getStatusBadge(app.status)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RecentApplications;