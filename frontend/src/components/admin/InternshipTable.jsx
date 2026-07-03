import StatusBadge from "./StatusBadge";
import { Edit2, Trash2, MapPin } from "lucide-react";

function InternshipTable({ internships, onEdit, onDelete }) {
    return (
        <div className="bg-white border border-zinc-200/80 rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-zinc-200 text-left">
                    <thead className="bg-zinc-50">
                        <tr className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                            <th className="px-6 py-3 font-semibold">Position details</th>
                            <th className="px-6 py-3 font-semibold">Company Name</th>
                            <th className="px-6 py-3 font-semibold">Office Location</th>
                            <th className="px-6 py-3 font-semibold">Stipend</th>
                            <th className="px-6 py-3 text-center font-semibold">Status</th>
                            <th className="px-6 py-3 text-right font-semibold">Controls</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 text-sm">
                        {internships.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-8 text-center text-zinc-400">
                                    No internship listings found.
                                </td>
                            </tr>
                        ) : (
                            internships.map((internship) => (
                                <tr key={internship.id} className="hover:bg-zinc-50/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-zinc-950 pr-2">
                                        {internship.title}
                                    </td>
                                    <td className="px-6 py-4 text-zinc-600">
                                        {internship.companyName}
                                    </td>
                                    <td className="px-6 py-4 text-zinc-500">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={13} className="text-zinc-450 shrink-0" />
                                            <span>{internship.location} {internship.isRemote ? "(Remote)" : ""}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-zinc-800">
                                        ₹ {internship.stipend ? internship.stipend.toLocaleString() : "0"}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <StatusBadge status={internship.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => onEdit(internship)}
                                                className="p-1.5 border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 rounded-lg text-zinc-600 hover:text-zinc-950 shadow-sm transition-all cursor-pointer"
                                                title="Edit Posting"
                                            >
                                                <Edit2 size={13} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(internship.id)}
                                                className="p-1.5 border border-zinc-200 hover:border-red-200 hover:bg-red-50 rounded-lg text-zinc-400 hover:text-red-600 shadow-sm transition-all cursor-pointer"
                                                title="Delete Posting"
                                            >
                                                <Trash2 size={13} />
                                            </button>
                                        </div>
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

export default InternshipTable;