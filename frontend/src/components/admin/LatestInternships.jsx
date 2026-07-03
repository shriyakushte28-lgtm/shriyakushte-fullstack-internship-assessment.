import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";

function LatestInternships({ internships }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white border border-zinc-200/80 rounded-xl p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-wider">
                    Recent Postings
                </h3>
                <button
                    onClick={() => navigate("/admin/internships")}
                    className="text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors cursor-pointer"
                >
                    Manage Postings &rarr;
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-zinc-200 text-left">
                    <thead>
                        <tr className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                            <th className="pb-2">Title</th>
                            <th className="pb-2">Company</th>
                            <th className="pb-2">Deadline</th>
                            <th className="pb-2 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 text-xs">
                        {internships.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="py-4 text-center text-zinc-400">No active postings.</td>
                            </tr>
                        ) : (
                            internships.slice(0, 5).map((job) => (
                                <tr key={job.id} className="hover:bg-zinc-50/50">
                                    <td className="py-2.5 font-semibold text-zinc-950 pr-2">
                                        {job.title}
                                    </td>
                                    <td className="py-2.5 text-zinc-500 pr-2">
                                        {job.companyName}
                                    </td>
                                    <td className="py-2.5 text-zinc-500 pr-2">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={12} className="text-zinc-400" />
                                            <span>{job.deadline}</span>
                                        </div>
                                    </td>
                                    <td className="py-2.5 text-right">
                                        <a
                                            href={`/internships/${job.id}`}
                                            className="text-[10px] font-bold text-zinc-500 hover:text-zinc-950 hover:underline"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            View Page
                                        </a>
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

export default LatestInternships;