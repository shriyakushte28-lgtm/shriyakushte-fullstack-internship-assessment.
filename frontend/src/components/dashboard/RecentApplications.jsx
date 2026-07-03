import { useEffect, useState } from "react";
import { getStudentApplications } from "../../services/applicationService";
import { FileClock, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

function RecentApplications() {
    const navigate = useNavigate();
    const userId = Number(localStorage.getItem("userId"));
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadApplications();
    }, []);

    async function loadApplications() {
        try {
            setLoading(true);
            const response = await getStudentApplications(userId);
            setApplications(response.data);
        } catch (error) {
            console.error("Failed to load student applications summary", error);
        } finally {
            setLoading(false);
        }
    }

    function getStatusBadge(status) {
        switch (status) {
            case "PENDING":
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 border border-amber-100 text-amber-700">
                        Pending
                    </span>
                );
            case "SHORTLISTED":
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-50 border border-indigo-100 text-indigo-700">
                        Shortlisted
                    </span>
                );
            case "ACCEPTED":
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-green-50 border border-green-100 text-green-750 font-semibold">
                        Accepted
                    </span>
                );
            case "REJECTED":
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 border border-slate-200 text-slate-500">
                        Rejected
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-50 border border-slate-150 text-slate-500">
                        {status}
                    </span>
                );
        }
    }

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3.5">
                <div>
                    <h2 className="text-sm font-bold text-slate-900">
                        My Applications
                    </h2>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                        Track progress of your submitted resumes
                    </p>
                </div>
                <FileClock size={16} className="text-slate-400" />
            </div>

            {loading ? (
                <div className="space-y-2.5">
                    <div className="h-12 bg-slate-50 animate-pulse rounded-lg"></div>
                    <div className="h-12 bg-slate-50 animate-pulse rounded-lg"></div>
                </div>
            ) : applications.length === 0 ? (
                <div className="py-6 text-center border border-dashed border-slate-200 rounded-xl">
                    <p className="text-xs text-slate-400">You haven't applied to any internships yet.</p>
                    <button
                        onClick={() => navigate("/internships")}
                        className="btn-secondary mt-3.5 py-1 px-2.5 text-[10px]"
                    >
                        Browse Positions
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 text-left">
                        <thead>
                            <tr className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                <th className="pb-2">Position</th>
                                <th className="pb-2">Company</th>
                                <th className="pb-2 text-center">Status</th>
                                <th className="pb-2 text-right">Applied</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs">
                            {applications.slice(0, 3).map((application) => (
                                <tr key={application.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-2.5 font-bold text-slate-900 pr-2">
                                        {application.internship.title}
                                    </td>
                                    <td className="py-2.5 text-slate-500 pr-2">
                                        {application.internship.companyName}
                                    </td>
                                    <td className="py-2.5 text-center">
                                        {getStatusBadge(application.status)}
                                    </td>
                                    <td className="py-2.5 text-right text-slate-400 font-semibold">
                                        {application.appliedAt ? application.appliedAt.substring(0, 10) : "Just now"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {applications.length > 3 && (
                        <div className="mt-3.5 pt-3 border-t border-slate-100 text-center">
                            <button
                                onClick={() => navigate("/applications")}
                                className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                            >
                                <span>See all applications ({applications.length})</span>
                                <ExternalLink size={12} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default RecentApplications;