import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";

function RecentStudents({ students }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white border border-zinc-200/80 rounded-xl p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-wider">
                    Recent Students
                </h3>
                <button
                    onClick={() => navigate("/admin/students")}
                    className="text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors cursor-pointer"
                >
                    View Directory &rarr;
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-zinc-200 text-left">
                    <thead>
                        <tr className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                            <th className="pb-2">Name</th>
                            <th className="pb-2">College</th>
                            <th className="pb-2 text-right">Inspect</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 text-xs">
                        {students.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="py-4 text-center text-zinc-400">No students registered.</td>
                            </tr>
                        ) : (
                            students.slice(0, 5).map((student) => (
                                <tr key={student.id} className="hover:bg-zinc-50/50">
                                    <td className="py-2.5 font-semibold text-zinc-950 pr-2">
                                        {student.fullName}
                                    </td>
                                    <td className="py-2.5 text-zinc-500 pr-2 truncate max-w-[120px]">
                                        <div className="flex items-center gap-1">
                                            <GraduationCap size={12} className="text-zinc-400 shrink-0" />
                                            <span className="truncate">{student.college || "N/A"}</span>
                                        </div>
                                    </td>
                                    <td className="py-2.5 text-right">
                                        <button
                                            onClick={() => navigate(`/admin/students/${student.id}`)}
                                            className="text-[10px] font-bold text-zinc-500 hover:text-zinc-950 hover:underline cursor-pointer"
                                        >
                                            View Profile
                                        </button>
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

export default RecentStudents;