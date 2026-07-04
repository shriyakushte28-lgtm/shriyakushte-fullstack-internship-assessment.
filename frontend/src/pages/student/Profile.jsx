import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getProfile, createProfile, updateProfile, getProfileCompletion } from "../../services/profileService";
import { uploadResume } from "../../services/resumeService";
import { getUser } from "../../services/userService";
import { User, Phone, GraduationCap, Calendar, FileText, Upload, Check, Edit2, CheckCircle2, Mail, Compass, Award } from "lucide-react";
import toast from "react-hot-toast";
import SkeletonProfile from "../../components/skeletons/SkeletonProfile";


function Profile() {
    const userId = Number(localStorage.getItem("userId"));
    const [isNewProfile, setIsNewProfile] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
    const [completion, setCompletion] = useState(0);
    const [email, setEmail] = useState("");

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        college: "",
        degree: "",
        graduationYear: "",
        skills: "",
        resumeUrl: "",
        bio: ""
    });

    useEffect(() => {
        loadProfileData();
    }, []);

    async function loadProfileData() {
        try {
            setLoading(true);
            // Load core account settings to display email address
            try {
                const userRes = await getUser(userId);
                if (userRes.data) {
                    setEmail(userRes.data.email);
                }
            } catch (err) {
                console.error("Failed to load user email address", err);
            }

            // Fetch profile record details
            try {
                const profileRes = await getProfile(userId);
                if (profileRes.data) {
                    setFormData(profileRes.data);
                    setIsNewProfile(false);
                }
            } catch (error) {
                console.warn("No profile record found. Creating a new one.", error);
                setIsNewProfile(true);
                setEditMode(true); // force edit mode for new profiles
            }

            // Fetch profile completion status
            try {
                const compRes = await getProfileCompletion(userId);
                setCompletion(compRes.data.completion);
            } catch (err) {
                console.error("Failed to load completeness metrics", err);
            }
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setSaving(true);
            if (isNewProfile) {
                await createProfile(userId, formData);
                setIsNewProfile(false);
                toast.success("Profile created successfully!");
            } else {
                await updateProfile(userId, formData);
                toast.success("Profile updated successfully!");
            }

            // Save last updated timestamp locally for dashboard auditing
            localStorage.setItem("profileLastUpdated", new Date().toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }));

            setEditMode(false);
            await loadProfileData();
        } catch (error) {
            console.error("Failed to save profile details", error);
            toast.error("Failed to save profile.");
        } finally {
            setSaving(false);
        }
    }

    async function handleResumeUpload(e) {
        e.preventDefault();
        if (!resumeFile) {
            toast.error("Please select a PDF resume.");
            return;
        }

        try {
            setUploading(true);
            const response = await uploadResume(userId, resumeFile);
            toast.success("Resume uploaded successfully!");
            setFormData({
                ...formData,
                resumeUrl: response.data.resumeUrl
            });
            await loadProfileData();
        } catch (error) {
            console.error("Failed to upload resume file", error);
            toast.error("Resume upload failed.");
        } finally {
            setUploading(false);
        }
    }

    if (loading) {
    return (
        <DashboardLayout>
            <SkeletonProfile />
        </DashboardLayout>
    );
}

    return (
        <DashboardLayout>
            <div className="space-y-4">
                {/* Title Bar */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                            <User size={18} className="text-slate-700" />
                            <span>My Profile</span>
                        </h1>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Manage resume files, academic qualifications, and career summaries
                        </p>
                    </div>
                    {!editMode && (
                        <button
                            onClick={() => setEditMode(true)}
                            className="btn-secondary py-1.5 px-3 text-xs inline-flex items-center gap-1.5"
                        >
                            <Edit2 size={13} />
                            <span>Edit Profile</span>
                        </button>
                    )}
                </div>

                {/* Profile Completeness Rating Bar */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                        <span>Profile Completeness Metrics</span>
                        <span className="text-blue-650 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">{completion}% Completed</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${completion}%` }}
                        ></div>
                    </div>
                </div>

                {/* Main grid split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Left & Middle Column: Core Info Form/View */}
                    <div className="lg:col-span-2 space-y-4">
                        {editMode ? (
                            /* Edit Mode Form Card */
                            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-4 md:p-5 shadow-sm space-y-4">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
                                    Modify Profile Records
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                            Full Name
                                        </label>
                                        <input
                                            name="fullName"
                                            required
                                            value={formData.fullName || ""}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="block w-full px-3 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-xs transition-all font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                            Phone Number
                                        </label>
                                        <input
                                            name="phone"
                                            required
                                            value={formData.phone || ""}
                                            onChange={handleChange}
                                            placeholder="+91 99999 99999"
                                            className="block w-full px-3 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-xs transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="sm:col-span-2">
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                            College / University
                                        </label>
                                        <input
                                            name="college"
                                            required
                                            value={formData.college || ""}
                                            onChange={handleChange}
                                            placeholder="Indian Institute of Technology"
                                            className="block w-full px-3 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-xs transition-all font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                            Graduation Year
                                        </label>
                                        <input
                                            name="graduationYear"
                                            type="number"
                                            required
                                            value={formData.graduationYear || ""}
                                            onChange={handleChange}
                                            placeholder="2026"
                                            className="block w-full px-3 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-xs transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                            Degree & Major
                                        </label>
                                        <input
                                            name="degree"
                                            required
                                            value={formData.degree || ""}
                                            onChange={handleChange}
                                            placeholder="B.Tech Computer Science"
                                            className="block w-full px-3 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-xs transition-all font-medium"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                            Skills (comma separated)
                                        </label>
                                        <input
                                            name="skills"
                                            value={formData.skills || ""}
                                            onChange={handleChange}
                                            placeholder="React, Spring Boot, MySQL, Java"
                                            className="block w-full px-3 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-xs transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Biography
                                    </label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio || ""}
                                        onChange={handleChange}
                                        placeholder="Tell recruiters about yourself..."
                                        rows="4"
                                        className="block w-full px-3 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-xs transition-all font-medium"
                                    />
                                </div>

                                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                    {!isNewProfile && (
                                        <button
                                            type="button"
                                            onClick={() => setEditMode(false)}
                                            className="btn-secondary py-1.5 px-4 text-xs"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="btn-primary py-1.5 px-4 text-xs"
                                    >
                                        <Check size={14} />
                                        <span>{saving ? "Saving..." : "Save Profile Details"}</span>
                                    </button>
                                </div>
                            </form>
                        ) : (
                            /* Presentation View Cards */
                            <div className="space-y-4">
                                <div className="bg-white border border-slate-200 rounded-xl p-4 md:p-5 shadow-sm space-y-4">
                                    {/* Avatar row */}
                                    <div className="flex items-center gap-3">
                                        <div className="h-14 w-14 rounded-full bg-blue-600 text-white border border-blue-500 shadow-sm flex items-center justify-center text-xl font-bold uppercase shrink-0">
                                            {formData.fullName ? formData.fullName.substring(0, 2) : "CN"}
                                        </div>
                                        <div className="text-left">
                                            <h2 className="text-base font-bold text-slate-900 leading-tight">
                                                {formData.fullName}
                                            </h2>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                                                {formData.degree || "Student Candidate"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Core Details Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs border-t border-slate-100 pt-4">
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <Mail size={14} className="text-slate-400 shrink-0" />
                                            <span className="font-semibold text-slate-900">Email:</span>
                                            <span>{email || "Not set"}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <Phone size={14} className="text-slate-400 shrink-0" />
                                            <span className="font-semibold text-slate-900">Phone:</span>
                                            <span>{formData.phone || "Not set"}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <GraduationCap size={14} className="text-slate-400 shrink-0" />
                                            <span className="font-semibold text-slate-900">College:</span>
                                            <span>{formData.college || "Not set"}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <Calendar size={14} className="text-slate-400 shrink-0" />
                                            <span className="font-semibold text-slate-900">Graduation Year:</span>
                                            <span>{formData.graduationYear || "Not set"}</span>
                                        </div>
                                    </div>

                                    {/* Skills Profile */}
                                    <div className="border-t border-slate-100 pt-4 space-y-2">
                                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                            <Award size={13} />
                                            <span>Skills Set</span>
                                        </h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {formData.skills ? (
                                                formData.skills.split(",").map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-655 px-2 py-0.5 rounded"
                                                    >
                                                        {skill.trim()}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">No skills listed yet.</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Career Summary Card */}
                                <div className="bg-white border border-slate-200 rounded-xl p-4 md:p-5 shadow-sm space-y-2.5">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                                        <Compass size={14} className="text-slate-500" />
                                        <span>Career Summary</span>
                                    </h3>
                                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                                        {formData.bio || "No biography/career summary provided yet. Update your details to write one."}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Resume View/Replace Actions */}
                    <div className="space-y-4">
                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4">
                            <div className="flex items-center gap-2">
                                <FileText size={15} className="text-slate-700" />
                                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                                    Resume Control Desk
                                </h2>
                            </div>

                            {/* Resume Status / View */}
                            <div className="border-t border-slate-100 pt-3 space-y-3">
                                {formData.resumeUrl ? (
                                    <div className="space-y-2.5">
                                        <div className="p-3 bg-green-50 border border-green-100 text-green-800 rounded-lg flex items-center gap-2 text-xs">
                                            <CheckCircle2 size={15} className="text-green-500 shrink-0" />
                                            <div>
                                                <p className="font-semibold">Resume Active</p>
                                                <p className="text-[10px] text-green-600 mt-0.5">Your resume is accessible for matching.</p>
                                            </div>
                                        </div>
                                        <a
                                            href={formData.resumeUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn-secondary w-full py-1.5 px-3 text-xs"
                                        >
                                            <span>View Resume (PDF)</span>
                                        </a>
                                    </div>
                                ) : (
                                    <div className="p-3 bg-slate-50 border border-slate-200 text-slate-500 rounded-lg text-[11px] flex items-center gap-2">
                                        <Upload size={14} className="text-slate-400 shrink-0" />
                                        <span>No resume uploaded yet. Attach one below.</span>
                                    </div>
                                )}
                            </div>

                            {/* Upload / Replace Form */}
                            <div className="border-t border-slate-100 pt-3 space-y-3">
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    {formData.resumeUrl ? "Replace Resume" : "Upload Resume (PDF)"}
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setResumeFile(e.target.files[0])}
                                    className="block w-full text-xs text-slate-500 file:mr-2.5 file:py-1 file:px-2.5 file:rounded file:border file:border-slate-200 file:text-[10px] file:font-semibold file:bg-white file:text-slate-700 hover:file:bg-slate-50 file:cursor-pointer"
                                />
                                <button
                                    type="button"
                                    onClick={handleResumeUpload}
                                    disabled={uploading}
                                    className="btn-primary w-full py-1.5 px-3 text-xs"
                                >
                                    <Upload size={13} />
                                    <span>{uploading ? "Uploading..." : formData.resumeUrl ? "Replace Resume" : "Upload Resume"}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Profile;