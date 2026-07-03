import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, getProfileCompletion } from "../../services/profileService";
import { Check, X, ShieldAlert, Award, FileText, ArrowRight, Calendar } from "lucide-react";

function ProfileCompletion() {
    const navigate = useNavigate();
    const userId = Number(localStorage.getItem("userId"));
    const [completion, setCompletion] = useState(0);
    const [lastUpdated, setLastUpdated] = useState("Not set");
    const [resumeUploaded, setResumeUploaded] = useState(false);
    const [sections, setSections] = useState({
        account: false, // Name, Phone
        education: false, // College, Degree, Year
        resume: false, // resumeUrl
        details: false // bio, skills
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCompletenessData();
    }, []);

    async function loadCompletenessData() {
        try {
            setLoading(true);
            // Fetch completeness rating
            const compRes = await getProfileCompletion(userId);
            setCompletion(compRes.data.completion);

            // Fetch profile record to determine sections & resume upload status
            const profileRes = await getProfile(userId);
            if (profileRes.data) {
                const profile = profileRes.data;
                const hasAccount = !!(profile.fullName && profile.phone);
                const hasEducation = !!(profile.college && profile.degree && profile.graduationYear);
                const hasResume = !!profile.resumeUrl;
                const hasDetails = !!(profile.bio && profile.skills);

                setSections({
                    account: hasAccount,
                    education: hasEducation,
                    resume: hasResume,
                    details: hasDetails
                });
                setResumeUploaded(hasResume);
            }

            // Get last updated timestamp from client logs
            const savedDate = localStorage.getItem("profileLastUpdated");
            setLastUpdated(savedDate || "Recently updated");
        } catch (error) {
            console.warn("Could not retrieve profile completeness credentials", error);
            // Default states for new users with no profile record created yet
            setCompletion(0);
            setSections({
                account: false,
                education: false,
                resume: false,
                details: false
            });
            setResumeUploaded(false);
            setLastUpdated("Not created yet");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4">
            {/* Header Title */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Profile completeness
                    </h2>
                </div>
                <span className="text-xs font-extrabold text-blue-650 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                    {completion}% Completed
                </span>
            </div>

            {/* Circular/Linear Completeness bar */}
            <div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${completion}%` }}
                    ></div>
                </div>
                <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400 font-semibold uppercase">
                    <span>Incomplete</span>
                    <span>Ready for match</span>
                </div>
            </div>

            {/* Completed Sections List */}
            <div className="space-y-2">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sections Audit</h3>
                <div className="grid grid-cols-2 gap-2">
                    <div className={`p-2 rounded-lg border text-xs flex items-center justify-between ${sections.account ? "border-green-100 bg-green-50/20 text-green-700 font-semibold" : "border-slate-100 bg-slate-50/50 text-slate-400"}`}>
                        <span>Account details</span>
                        {sections.account ? <Check size={12} /> : <X size={12} />}
                    </div>
                    <div className={`p-2 rounded-lg border text-xs flex items-center justify-between ${sections.education ? "border-green-100 bg-green-50/20 text-green-700 font-semibold" : "border-slate-100 bg-slate-50/50 text-slate-400"}`}>
                        <span>Academic info</span>
                        {sections.education ? <Check size={12} /> : <X size={12} />}
                    </div>
                    <div className={`p-2 rounded-lg border text-xs flex items-center justify-between ${sections.resume ? "border-green-100 bg-green-50/20 text-green-700 font-semibold" : "border-slate-100 bg-slate-50/50 text-slate-400"}`}>
                        <span>PDF Resume</span>
                        {sections.resume ? <Check size={12} /> : <X size={12} />}
                    </div>
                    <div className={`p-2 rounded-lg border text-xs flex items-center justify-between ${sections.details ? "border-green-100 bg-green-50/20 text-green-700 font-semibold" : "border-slate-100 bg-slate-50/50 text-slate-400"}`}>
                        <span>Profile details</span>
                        {sections.details ? <Check size={12} /> : <X size={12} />}
                    </div>
                </div>
            </div>

            {/* Document and Metadata specs */}
            <div className="border-t border-slate-100 pt-3 space-y-2 text-[11px] text-slate-655 font-medium leading-relaxed">
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Resume status:</span>
                    {resumeUploaded ? (
                        <span className="text-green-755 font-bold flex items-center gap-1">
                            <FileText size={12} />
                            <span>Active Upload</span>
                        </span>
                    ) : (
                        <span className="text-red-600 font-bold flex items-center gap-1">
                            <ShieldAlert size={12} />
                            <span>Missing</span>
                        </span>
                    )}
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Profile Last updated:</span>
                    <span className="text-slate-900 font-semibold flex items-center gap-1">
                        <Calendar size={12} className="text-slate-400" />
                        <span>{lastUpdated}</span>
                    </span>
                </div>
            </div>

            {/* Edit Profile Action button */}
            <button
                onClick={() => navigate("/profile")}
                className="btn-primary w-full py-1.5 px-3 text-xs"
            >
                <span>Edit Profile Details</span>
                <ArrowRight size={13} />
            </button>
        </div>
    );
}

export default ProfileCompletion;