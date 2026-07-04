import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { getStudent } from "../../services/studentAdminService";
import { ChevronLeft, GraduationCap, Calendar, Phone, Mail, FileText, Download } from "lucide-react";

function StudentDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStudent();
    }, [id]);

    async function loadStudent() {
        try {
            setLoading(true);
            const response = await getStudent(id);
            setStudent(response.data);
        } catch (error) {
            console.error("Failed to load student details", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading || !student) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[450px]">
                    <div className="text-sm font-semibold text-slate-500 animate-pulse">
                        Loading candidate profile credentials...
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-4">
                {/* Back link */}
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                        <ChevronLeft size={14} />
                        <span>Back to Directory</span>
                    </button>
                </div>

                {/* Main Profile Inspection Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Left Column: Core profile details */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white border border-slate-200 rounded-xl p-4 md:p-5 shadow-sm space-y-4">
                            {/* Initials & Name header */}
                            <div className="flex items-center gap-3">
                                <div className="h-14 w-14 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl font-bold uppercase shadow-sm">
                                    {student.fullName ? student.fullName.substring(0, 2) : "CN"}
                                </div>
                                <div className="text-left">
                                    <h2 className="text-base font-bold text-slate-900 leading-tight">
                                        {student.fullName}
                                    </h2>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                                        {student.degree || "Candidate Profile"}
                                    </p>
                                </div>
                            </div>

                            {/* Biography */}
                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Biography</h4>
                                <p className="text-xs text-slate-650 leading-relaxed whitespace-pre-wrap">
                                    {student.bio || "No biography provided by candidate."}
                                </p>
                            </div>

                            {/* Education Details */}
                            <div className="border-t border-slate-100 pt-3.5 space-y-2">
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Academic Qualifications</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                                    <div className="flex items-center gap-2">
                                        <GraduationCap size={14} className="text-slate-400" />
                                        <span>{student.college || "Not set"}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-slate-400" />
                                        <span>Class of {student.graduationYear || "Not set"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Skills Tags */}
                            <div className="border-t border-slate-100 pt-3.5 space-y-2">
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Skills Profile</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {student.skills ? (
                                        student.skills.split(",").map((skill, index) => (
                                            <span
                                                key={index}
                                                className="text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-650 px-2 py-0.5 rounded"
                                            >
                                                {skill.trim()}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-xs text-slate-400 italic">No skills listed.</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column: Document details and stats */}
                    <div className="space-y-4">
                        {/* Resume view panel */}
                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3.5">
                            <div className="flex items-center gap-2">
                                <FileText size={15} className="text-slate-700" />
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Candidate Document</h3>
                            </div>

                            <div className="border-t border-slate-100 pt-3">
                                {student.resumeUrl ? (
                                    <div className="space-y-3">
                                        <div className="p-3 bg-green-50 border border-green-100 text-green-800 rounded-lg text-xs">
                                            <p className="font-semibold">Resume Uploaded</p>
                                        </div>
                                        <a
                                            href={student.resumeUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn-secondary w-full py-1.5 px-3 text-xs"
                                        >
                                            <Download size={13} />
                                            <span>Download PDF Resume</span>
                                        </a>
                                    </div>
                                ) : (
                                    <div className="p-3 bg-slate-50 border border-slate-200 text-slate-500 rounded-lg text-xs italic">
                                        No resume uploaded by candidate.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Summary details */}
                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
                            <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-1.5">Profile Meta</h3>
                            <div className="space-y-2 text-[11px] text-slate-600">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-450">Total Submissions</span>
                                    <span className="font-semibold text-slate-900">{student.applicationCount || 0} applications</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-450 flex items-center gap-1.5">
                                        <Mail size={12} />
                                        <span>Email</span>
                                    </span>
                                    <span className="font-semibold text-slate-900 truncate max-w-[120px]" title={student.email}>
                                        {student.email}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-450 flex items-center gap-1.5">
                                        <Phone size={12} />
                                        <span>Phone</span>
                                    </span>
                                    <span className="font-semibold text-slate-900">
                                        {student.phone || "Not set"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default StudentDetails;