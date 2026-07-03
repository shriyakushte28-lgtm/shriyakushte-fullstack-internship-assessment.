import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import ApplicationFilters from "../../components/filters/ApplicationFilters";
import { getAllApplications, updateApplicationStatus, filterApplications } from "../../services/adminApplicationService";
import { FileText, Calendar, Check, X, Award } from "lucide-react";
import toast from "react-hot-toast";
import EmptyState from "../../components/common/EmptyState";

function StatusBadge({ status }) {
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
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-green-50 border border-green-100 text-green-700">
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

function ManageApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadApplications();
    }, []);

    async function loadApplications() {
        try {
            setLoading(true);
            const response = await getAllApplications();
            setApplications(response.data);
        } catch (error) {
            console.error("Failed to load admin applications", error);
        } finally {
            setLoading(false);
        }
    }

    async function searchApplications(filters) {
        try {
            setLoading(true);
            if (Object.keys(filters).length === 0) {
                await loadApplications();
                return;
            }
            const response = await filterApplications(filters);
            setApplications(response.data);
        } catch (error) {
            console.error("Failed to filter applications", error);
        } finally {
            setLoading(false);
        }
    }

    async function changeStatus(id, status) {
        try {
            await updateApplicationStatus(id, status);
            toast.success(`Application marked as ${status.toLowerCase()}.`);
            loadApplications();
        } catch (error) {
            console.error("Failed to update application status", error);
            toast.error("Failed to update application status.");
        }
    }

    return (
        <AdminLayout>
            <div className="space-y-4">
                {/* Page Title */}
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        <FileText size={18} className="text-slate-700" />
                        <span>Manage Applications</span>
                    </h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Review submissions, inspect matched skills, and update application status stages
                    </p>
                </div>

                {/* Filters */}
                <ApplicationFilters onSearch={searchApplications} />

                {/* Table Data */}
                {loading ? (
                    <div className="space-y-2.5">
                        <div className="h-14 bg-slate-50 animate-pulse rounded-lg"></div>
                        <div className="h-14 bg-slate-50 animate-pulse rounded-lg"></div>
                    </div>
                ) : (
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto max-h-[450px]">
                            <table className="min-w-full divide-y divide-slate-200 text-left">
                                <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-200">
                                    <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        <th className="px-6 py-2.5 font-semibold">Student candidate</th>
                                        <th className="px-6 py-2.5 font-semibold">Internship role</th>
                                        <th className="px-6 py-2.5 text-center font-semibold">Status Badge</th>
                                        <th className="px-6 py-2.5 font-semibold">Submitted</th>
                                        <th className="px-6 py-2.5 text-right font-semibold">Actions Controls</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm">
                                    {applications.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="p-8">

    <EmptyState
    title="No Applications Yet"
    description="You haven't applied to any internships yet."
    buttonText="Browse Internships"
    onButtonClick={() => navigate("/internships")}
/>

</td>
                                        </tr>
                                    ) : (
                                        applications.map((application) => (
                                            <tr key={application.id} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="px-6 py-3 font-bold text-slate-900 pr-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 text-xs font-bold uppercase shadow-sm">
                                                            {application.student.fullName.substring(0, 2)}
                                                        </div>
                                                        <div className="text-left">
                                                            <p className="leading-tight">{application.student.fullName}</p>
                                                            <a
                                                                href={`/admin/students/${application.student.id}`}
                                                                className="text-[9px] text-slate-400 hover:text-blue-600 font-semibold"
                                                            >
                                                                View profile
                                                            </a>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3 text-slate-650 pr-2">
                                                    <div className="text-left">
                                                        <p className="font-semibold text-slate-900 leading-tight">{application.internship.title}</p>
                                                        <p className="text-[10px] text-slate-400 mt-0.5">{application.internship.companyName}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3 text-center">
                                                    <StatusBadge status={application.status} />
                                                </td>
                                                <td className="px-6 py-3 text-slate-500 text-xs pr-2">
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar size={13} className="text-slate-400" />
                                                        <span>
                                                            {application.appliedAt ? application.appliedAt.substring(0, 10) : "Just now"}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3 text-right">
                                                    {application.status === "PENDING" || application.status === "SHORTLISTED" ? (
                                                        <div className="flex items-center justify-end gap-1.5">
                                                            {application.status === "PENDING" && (
                                                                <button
                                                                    onClick={() => changeStatus(application.id, "SHORTLISTED")}
                                                                    className="btn-secondary py-1 px-2 text-[10px] font-bold"
                                                                    title="Shortlist Candidate"
                                                                >
                                                                    <Award size={12} />
                                                                    <span>Shortlist</span>
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => changeStatus(application.id, "ACCEPTED")}
                                                                className="btn-primary p-1.5 shadow-sm text-white"
                                                                title="Accept Application"
                                                            >
                                                                <Check size={12} />
                                                            </button>
                                                            <button
                                                                onClick={() => changeStatus(application.id, "REJECTED")}
                                                                className="btn-secondary p-1.5 text-slate-400 hover:text-red-650 hover:bg-red-50"
                                                                title="Reject Application"
                                                            >
                                                                <X size={12} />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="text-[10px] text-slate-400 italic font-semibold">Completed</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

export default ManageApplications;