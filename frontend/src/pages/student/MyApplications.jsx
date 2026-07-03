import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getStudentApplications } from "../../services/applicationService";
import { ClipboardList, Calendar, Building, ArrowUpRight } from "lucide-react";

function MyApplications() {
    const [applications, setApplications] = useState([]);
    const [filteredApps, setFilteredApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("ALL");
    const userId = Number(localStorage.getItem("userId"));

    useEffect(() => {
        loadApplications();
    }, []);

    async function loadApplications() {
        try {
            setLoading(true);
            const response = await getStudentApplications(userId);
            setApplications(response.data);
            setFilteredApps(response.data);
        } catch (error) {
            console.error("Failed to load student applications list", error);
        } finally {
            setLoading(false);
        }
    }

    const handleTabChange = (status) => {
        setActiveTab(status);
        if (status === "ALL") {
            setFilteredApps(applications);
        } else {
            setFilteredApps(applications.filter(app => app.status === status));
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "PENDING":
                return "bg-amber-50 border-amber-100 text-amber-700";
            case "SHORTLISTED":
                return "bg-indigo-50 border-indigo-100 text-indigo-700";
            case "ACCEPTED":
                return "bg-green-50 border-green-100 text-green-700 font-semibold";
            case "REJECTED":
                return "bg-slate-100 border-slate-200 text-slate-500";
            default:
                return "bg-slate-50 border-slate-150 text-slate-500";
        }
    };

    const tabs = [
        { label: "All", status: "ALL", count: applications.length },
        { label: "Pending", status: "PENDING", count: applications.filter(a => a.status === "PENDING").length },
        { label: "Shortlisted", status: "SHORTLISTED", count: applications.filter(a => a.status === "SHORTLISTED").length },
        { label: "Accepted", status: "ACCEPTED", count: applications.filter(a => a.status === "ACCEPTED").length },
        { label: "Rejected", status: "REJECTED", count: applications.filter(a => a.status === "REJECTED").length }
    ];

    return (
        <DashboardLayout>
            <div className="space-y-4">
                {/* Title */}
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        <ClipboardList size={18} className="text-slate-700" />
                        <span>My Applications</span>
                    </h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Track progress of your submitted resumes and offers
                    </p>
                </div>

                {/* Tabs */}
                <div className="border-b border-slate-200 flex flex-wrap gap-1.5">
                    {tabs.map((tab) => (
                        <button
                            key={tab.status}
                            onClick={() => handleTabChange(tab.status)}
                            className={`pb-2 px-1 text-xs font-semibold relative cursor-pointer transition-all duration-150
                                ${activeTab === tab.status
                                    ? "text-blue-600 border-b-2 border-blue-600 font-bold"
                                    : "text-slate-400 hover:text-slate-750"
                                }`}
                        >
                            <span>{tab.label}</span>
                            <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[9px] bg-slate-100 border border-slate-200 text-slate-650 font-bold">
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Table Data */}
                {loading ? (
                    <div className="space-y-2.5">
                        <div className="h-14 bg-slate-50 animate-pulse rounded-lg"></div>
                        <div className="h-14 bg-slate-50 animate-pulse rounded-lg"></div>
                    </div>
                ) : filteredApps.length === 0 ? (
                    <div className="py-12 text-center border border-dashed border-slate-200 bg-white rounded-xl shadow-sm">
                        <div className="text-slate-300 mb-2.5 flex justify-center">
                            <ClipboardList size={36} />
                        </div>
                        <h3 className="text-sm font-bold text-slate-900">No applications</h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                            No active submissions under this status tab.
                        </p>
                    </div>
                ) : (
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto max-h-[450px]">
                            <table className="min-w-full divide-y divide-slate-200 text-left">
                                <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-200">
                                    <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        <th className="px-6 py-2.5 font-semibold">Position details</th>
                                        <th className="px-6 py-2.5 font-semibold">Company Name</th>
                                        <th className="px-6 py-2.5 text-center font-semibold">Status Badge</th>
                                        <th className="px-6 py-2.5 font-semibold">Submitted</th>
                                        <th className="px-6 py-2.5 text-right font-semibold">Details link</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm">
                                    {filteredApps.map((application) => (
                                        <tr key={application.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-3 font-bold text-slate-900 pr-2">
                                                {application.internship.title}
                                            </td>
                                            <td className="px-6 py-3 text-slate-600 pr-2">
                                                <div className="flex items-center gap-1.5">
                                                    <Building size={13} className="text-slate-400 shrink-0" />
                                                    <span className="truncate">{application.internship.companyName}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 text-center">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusStyle(application.status)}`}>
                                                    {application.status}
                                                </span>
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
                                                <a
                                                    href={`/internships/${application.internship.id}`}
                                                    className="inline-flex items-center gap-0.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
                                                >
                                                    <span>View Listing</span>
                                                    <ArrowUpRight size={12} />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

export default MyApplications;