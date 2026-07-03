import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getStudents } from "../../services/studentAdminService";
import { useNavigate } from "react-router-dom";
import { Users, Search, GraduationCap, ArrowUpRight, ClipboardList } from "lucide-react";

function ManageStudents() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStudents();
    }, []);

    async function loadStudents() {
        try {
            setLoading(true);
            const response = await getStudents();
            setStudents(response.data);
        } catch (error) {
            console.error("Failed to load students list", error);
        } finally {
            setLoading(false);
        }
    }

    const filteredStudents = students.filter(student =>
        student.fullName.toLowerCase().includes(search.toLowerCase()) ||
        (student.college && student.college.toLowerCase().includes(search.toLowerCase())) ||
        (student.degree && student.degree.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <AdminLayout>
            <div className="space-y-4">
                {/* Header Title */}
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        <Users size={18} className="text-slate-700" />
                        <span>Manage Students</span>
                    </h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                        View student directory profiles, academic qualifications, and application statistics
                    </p>
                </div>

                {/* Filter and Search Bar */}
                <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
                    <div className="relative max-w-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Search size={13} />
                        </div>
                        <input
                            placeholder="Search by name, university, major..."
                            className="block w-full pl-9 pr-3 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all font-medium"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Data Directory Table */}
                {loading ? (
                    <div className="space-y-2.5">
                        <div className="h-14 bg-slate-50 animate-pulse rounded-lg"></div>
                        <div className="h-14 bg-slate-50 animate-pulse rounded-lg"></div>
                    </div>
                ) : filteredStudents.length === 0 ? (
                    <div className="py-12 text-center border border-dashed border-slate-200 bg-white rounded-xl shadow-sm">
                        <div className="text-slate-350 mb-2.5 flex justify-center">
                            <Users size={36} />
                        </div>
                        <h3 className="text-sm font-bold text-slate-900">No students registered</h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                            No student profiles match your search criteria.
                        </p>
                    </div>
                ) : (
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto max-h-[450px]">
                            <table className="min-w-full divide-y divide-slate-200 text-left">
                                <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-200">
                                    <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        <th className="px-6 py-2.5 font-semibold">Student candidate</th>
                                        <th className="px-6 py-2.5 font-semibold">College / University</th>
                                        <th className="px-6 py-2.5 font-semibold">Degree & Major</th>
                                        <th className="px-6 py-2.5 text-center font-semibold">Applications</th>
                                        <th className="px-6 py-2.5 text-right font-semibold">Inspect profile</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm">
                                    {filteredStudents.map((student) => (
                                        <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-3 font-bold text-slate-900 pr-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-7 w-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-semibold uppercase shadow-sm">
                                                        {student.fullName.substring(0, 2)}
                                                    </div>
                                                    <span>{student.fullName}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 text-slate-650 pr-2">
                                                <div className="flex items-center gap-1.5">
                                                    <GraduationCap size={13} className="text-slate-400 shrink-0" />
                                                    <span className="truncate max-w-[150px]">{student.college || "Not set"}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 text-slate-500 pr-2 truncate max-w-[150px]">
                                                {student.degree || "Not set"}
                                            </td>
                                            <td className="px-6 py-3 text-center">
                                                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 border border-slate-200 text-slate-650">
                                                    <ClipboardList size={11} className="text-slate-400" />
                                                    <span>{student.applicationCount || 0}</span>
                                                </span>
                                            </td>
                                            <td className="px-6 py-3 text-right">
                                                <button
                                                    onClick={() => navigate(`/admin/students/${student.id}`)}
                                                    className="inline-flex items-center gap-0.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
                                                >
                                                    <span>Inspect profile</span>
                                                    <ArrowUpRight size={12} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

export default ManageStudents;