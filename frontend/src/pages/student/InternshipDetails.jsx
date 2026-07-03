import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getInternshipById, getInternshipMatch } from "../../services/internshipService";
import { saveInternship, checkSavedInternship } from "../../services/savedService";
import { applyInternship } from "../../services/applicationService";
import { getProfile } from "../../services/profileService";
import { MapPin, IndianRupee, Calendar, Bookmark, Send, Sparkles, CheckCircle2, ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";

function InternshipDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const userId = Number(localStorage.getItem("userId"));

    const [internship, setInternship] = useState(null);
    const [match, setMatch] = useState(null);
    const [profile, setProfile] = useState(null);
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        loadInternship();
        loadMatch();
        checkSaved();
        loadProfile();
    }, [id]);

    async function loadInternship() {
        try {
            const response = await getInternshipById(id);
            setInternship(response.data);
        } catch (error) {
            console.error("Failed to load internship", error);
        }
    }

    async function loadMatch() {
        try {
            const response = await getInternshipMatch(id, userId);
            setMatch(response.data);
        } catch (error) {
            console.error("Failed to load match score", error);
        }
    }

    async function handleApply() {
        if (!profile?.resumeUrl) {
            toast.error("Please upload your resume before applying.");
            navigate("/profile");
            return;
        }

        try {
            setApplying(true);
            await applyInternship({
                userId: userId,
                internshipId: internship.id,
                coverLetter: "",
                resumeUrl: profile?.resumeUrl || ""
            });
            toast.success("Application submitted successfully!");
            navigate("/applications");
        } catch (error) {
            if (error.response?.status === 409) {
                toast.error("You have already applied for this internship.");
            } else {
                toast.error("Something went wrong. Please try again.");
                console.error(error);
            }
        } finally {
            setApplying(false);
        }
    }

    async function checkSaved() {
        try {
            const response = await checkSavedInternship(userId, id);
            setSaved(response.data);
        } catch (error) {
            console.error("Failed to check bookmark status", error);
        }
    }

    async function handleSave() {
        try {
            setSaving(true);
            await saveInternship({
                userId,
                internshipId: internship.id
            });
            setSaved(true);
            toast.success("Internship saved successfully!");
        } catch (error) {
            if (error.response?.status === 409) {
                setSaved(true);
            } else {
                console.error(error);
            }
        } finally {
            setSaving(false);
        }
    }

    async function loadProfile() {
        try {
            const response = await getProfile(userId);
            setProfile(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    if (!internship) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-sm font-semibold text-slate-500 animate-pulse">Loading posting details...</div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-4">
                {/* Back Link */}
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                        <ChevronLeft size={14} />
                        <span>Back to Listings</span>
                    </button>
                </div>

                {/* Cover Header */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 md:p-5 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-green-50 border border-green-100 text-green-700">
                                {internship.status || "OPEN"}
                            </span>
                            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mt-2.5">
                                {internship.title}
                            </h1>
                            <p className="text-xs font-semibold text-slate-500 mt-0.5">
                                {internship.companyName}
                            </p>
                            <div className="flex flex-wrap items-center gap-4 mt-3 text-[11px] text-slate-550">
                                <span className="flex items-center gap-1">
                                    <MapPin size={13} className="text-slate-400" />
                                    {internship.location}
                                </span>
                                <span className="flex items-center gap-1 font-semibold text-slate-700">
                                    <IndianRupee size={13} className="text-slate-400" />
                                    ₹ {internship.stipend ? internship.stipend.toLocaleString() : "0"}/month
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar size={13} className="text-slate-400" />
                                    {internship.durationMonths} Months Duration
                                </span>
                            </div>
                        </div>

                        {/* Top action controls */}
                        <div className="flex gap-2">
                            <button
                                disabled={saved || saving}
                                onClick={handleSave}
                                className={`inline-flex items-center justify-center p-2 rounded-lg border shadow-sm transition-all duration-150 cursor-pointer
                                    ${saved
                                        ? "bg-rose-50 border-rose-200 text-rose-600 cursor-not-allowed"
                                        : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                    }`}
                            >
                                <Bookmark size={15} className={saved ? "fill-rose-650" : ""} />
                            </button>
                            <button
                                onClick={handleApply}
                                disabled={applying}
                                className="btn-primary py-2 px-4 text-xs font-semibold"
                            >
                                <Send size={13} />
                                <span>{applying ? "Applying..." : "Apply Now"}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Detail Columns Split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Left: Job description */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white border border-slate-200 rounded-xl p-4 md:p-5 shadow-sm space-y-4">
                            <div>
                                <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                                    Role Description
                                </h2>
                                <div className="mt-3 text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                                    {internship.description || "No full description provided."}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                                    Candidate Qualifications & Skills
                                </h2>
                                <div className="mt-3">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">REQUIRED SKILLS</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {internship.skillsRequired ? (
                                            internship.skillsRequired.split(",").map((skill, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1 rounded"
                                                >
                                                    {skill.trim()}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-xs text-slate-400">None specified.</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column: Compatibility details */}
                    <div className="space-y-4">
                        {match && (
                            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3.5">
                                <div className="flex items-center gap-1.5">
                                    <Sparkles size={14} className="text-blue-600 animate-pulse" />
                                    <h2 className="text-sm font-bold text-slate-900">
                                        Compatibility Analysis
                                    </h2>
                                </div>

                                <div className="border-t border-slate-100 pt-3">
                                    <div className="flex justify-between text-[10px] font-bold text-slate-800 mb-1">
                                        <span>Skills Match Rating</span>
                                        <span>{match.matchPercentage}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                                        <div
                                            className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                                            style={{ width: `${match.matchPercentage}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-[10px] text-slate-500 mt-1.5">
                                        Matched {match.matchedSkillCount} of {match.totalRequiredSkills} total required skills.
                                    </p>
                                </div>

                                {/* Skills listings */}
                                <div className="space-y-3 pt-1">
                                    <div>
                                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-green-600 mb-1.5">
                                            Matched Skills
                                        </h4>
                                        {match.matchedSkills.length === 0 ? (
                                            <p className="text-[10px] text-slate-400 italic">None of your skills matched this posting.</p>
                                        ) : (
                                            <div className="space-y-1">
                                                {match.matchedSkills.map((skill) => (
                                                    <div key={skill} className="flex items-center gap-1.5 text-xs text-slate-700">
                                                        <CheckCircle2 size={12} className="text-green-500 shrink-0" />
                                                        <span>{skill}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                                            Missing Skills
                                        </h4>
                                        {match.missingSkills.length === 0 ? (
                                            <p className="text-[10px] text-green-600 font-semibold">Excellent! You possess all required skills.</p>
                                        ) : (
                                            <div className="space-y-1">
                                                {match.missingSkills.map((skill) => (
                                                    <div key={skill} className="flex items-center gap-1.5 text-xs text-slate-500">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-slate-300 shrink-0"></span>
                                                        <span>{skill}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Summary Widget */}
                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
                            <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-1.5">Listing Metadata</h3>
                            <div className="space-y-2 text-[11px] text-slate-600">
                                <div className="flex justify-between">
                                    <span className="text-slate-450">Position Status</span>
                                    <span className="font-semibold text-slate-900 uppercase">{internship.status || "OPEN"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-450">Application Deadline</span>
                                    <span className="font-semibold text-slate-900">{internship.deadline || "Open"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-450">Office Location</span>
                                    <span className="font-semibold text-slate-900">{internship.location}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-450">Stipend Amount</span>
                                    <span className="font-semibold text-slate-900">₹ {internship.stipend ? internship.stipend.toLocaleString() : "0"}/mo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default InternshipDetails;