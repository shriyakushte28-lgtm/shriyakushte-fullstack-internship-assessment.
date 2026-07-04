import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import PublicLayout from "../../layouts/PublicLayout";

import {
    getInternshipById,
    getInternshipMatch
} from "../../services/internshipService";

import {
    saveInternship,
    checkSavedInternship
} from "../../services/savedService";

import { applyInternship } from "../../services/applicationService";
import { getProfile } from "../../services/profileService";

import {
    MapPin,
    IndianRupee,
    Calendar,
    Bookmark,
    Send,
    Sparkles,
    CheckCircle2,
    ChevronLeft
} from "lucide-react";

import toast from "react-hot-toast";


function InternshipDetails() {

    const navigate = useNavigate();

    const { id } = useParams();


    // ============================================
    // AUTHENTICATION CHECK
    // ============================================

    const token = localStorage.getItem("token");
const userIdValue = localStorage.getItem("userId");
const role = localStorage.getItem("role");

const isLoggedIn =
    Boolean(token) &&
    Boolean(userIdValue) &&
    role === "STUDENT";

const userId = isLoggedIn
    ? Number(userIdValue)
    : null;


    // ============================================
    // STATE
    // ============================================

    const [internship, setInternship] = useState(null);

    const [match, setMatch] = useState(null);

    const [profile, setProfile] = useState(null);

    const [saved, setSaved] = useState(false);

    const [saving, setSaving] = useState(false);

    const [applying, setApplying] = useState(false);


    // ============================================
    // LOAD DATA
    // ============================================

    useEffect(() => {

        loadInternship();

        // Only logged-in students need these API calls
        if (isLoggedIn && userId) {

            loadMatch();

            checkSaved();

            loadProfile();

        }

    }, [id, isLoggedIn, userId]);


    // ============================================
    // LOAD INTERNSHIP
    // ============================================

    async function loadInternship() {

        try {

            const response =
                await getInternshipById(id);

            setInternship(response.data);

        } catch (error) {

            console.error(
                "Failed to load internship",
                error
            );

            toast.error(
                "Unable to load internship details."
            );

        }

    }


    // ============================================
    // LOAD MATCH SCORE
    // ============================================

    async function loadMatch() {

        try {

            const response =
                await getInternshipMatch(
                    id,
                    userId
                );

            setMatch(response.data);

        } catch (error) {

            console.error(
                "Failed to load match score",
                error
            );

        }

    }


    // ============================================
    // LOAD PROFILE
    // ============================================

    async function loadProfile() {

        try {

            const response =
                await getProfile(userId);

            setProfile(response.data);

        } catch (error) {

            console.error(
                "Failed to load student profile",
                error
            );

        }

    }


    // ============================================
    // CHECK SAVED INTERNSHIP
    // ============================================

    async function checkSaved() {

        try {

            const response =
                await checkSavedInternship(
                    userId,
                    id
                );

            setSaved(response.data);

        } catch (error) {

            console.error(
                "Failed to check bookmark status",
                error
            );

        }

    }


    // ============================================
    // APPLY
    // ============================================

    async function handleApply() {

    if (!isLoggedIn) {

        toast(
            "Please create an account or sign in to apply.",
            {
                icon: "👋"
            }
        );

        navigate("/register", {
            state: {
                redirectTo: `/internships/${id}`
            }
        });

        return;
    }


    if (!profile?.resumeUrl) {

        toast.error(
            "Please upload your resume before applying."
        );

        navigate("/profile");

        return;
    }


    try {

        setApplying(true);

        await applyInternship({
            userId: userId,
            internshipId: internship.id,
            coverLetter: "",
            resumeUrl: profile.resumeUrl
        });

        toast.success(
            "Application submitted successfully!"
        );

        navigate("/applications");

    } catch (error) {

        if (error.response?.status === 409) {

            toast.error(
                "You have already applied for this internship."
            );

        } else {

            toast.error(
                "Something went wrong. Please try again."
            );

            console.error(error);
        }

    } finally {

        setApplying(false);
    }
}


    // ============================================
    // SAVE INTERNSHIP
    // ============================================

    async function handleSave() {

        // Guest user
        if (!isLoggedIn) {

            toast(
                "Create an account to save internships.",
                {
                    icon: "🔖"
                }
            );

            navigate("/register", {
                state: {
                    redirectTo:
                        `/internships/${id}`
                }
            });

            return;

        }


        try {

            setSaving(true);


            await saveInternship({

                userId: userId,

                internshipId:
                    internship.id

            });


            setSaved(true);


            toast.success(
                "Internship saved successfully!"
            );


        } catch (error) {


            if (
                error.response?.status === 409
            ) {

                setSaved(true);

                toast.error(
                    "Internship is already saved."
                );

            } else {

                toast.error(
                    "Unable to save internship."
                );

                console.error(error);

            }


        } finally {

            setSaving(false);

        }

    }


    // ============================================
    // LOADING PAGE
    // ALWAYS PUBLIC LAYOUT
    // ============================================

    if (!internship) {

        return (

            <PublicLayout>

                <div className="flex items-center justify-center min-h-[400px]">

                    <div className="text-sm font-semibold text-slate-500 animate-pulse">

                        Loading posting details...

                    </div>

                </div>

            </PublicLayout>

        );

    }


    // ============================================
    // PAGE
    // ============================================

    return (

        <PublicLayout>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">


                {/* BACK BUTTON */}

                <div>

                    <button
                        onClick={() =>
                            navigate("/internships")
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                    >

                        <ChevronLeft size={14} />

                        <span>
                            Back to Listings
                        </span>

                    </button>

                </div>


                {/* ================================= */}
                {/* INTERNSHIP HEADER */}
                {/* ================================= */}

                <div className="bg-white border border-slate-200 rounded-xl p-4 md:p-5 shadow-sm">

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">


                        {/* Internship Info */}

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


                            <div className="flex flex-wrap items-center gap-4 mt-3 text-[11px] text-slate-500">


                                <span className="flex items-center gap-1">

                                    <MapPin
                                        size={13}
                                        className="text-slate-400"
                                    />

                                    {internship.location}

                                </span>


                                <span className="flex items-center gap-1 font-semibold text-slate-700">

                                    <IndianRupee
                                        size={13}
                                        className="text-slate-400"
                                    />

                                    ₹{" "}

                                    {internship.stipend
                                        ? internship.stipend.toLocaleString()
                                        : "0"}

                                    /month

                                </span>


                                <span className="flex items-center gap-1">

                                    <Calendar
                                        size={13}
                                        className="text-slate-400"
                                    />

                                    {internship.durationMonths} Months Duration

                                </span>


                            </div>

                        </div>


                        {/* ACTION BUTTONS */}

                        <div className="flex gap-2">


                            {/* SAVE */}

                            <button
                                disabled={
                                    isLoggedIn &&
                                    (saved || saving)
                                }
                                onClick={handleSave}
                                title={
                                    saved
                                        ? "Internship Saved"
                                        : "Save Internship"
                                }
                                className={`inline-flex items-center justify-center p-2 rounded-lg border shadow-sm transition-all duration-150 cursor-pointer ${
                                    saved
                                        ? "bg-rose-50 border-rose-200 text-rose-600 cursor-not-allowed"
                                        : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                }`}
                            >

                                <Bookmark
                                    size={15}
                                    className={
                                        saved
                                            ? "fill-rose-600"
                                            : ""
                                    }
                                />

                            </button>


                            {/* APPLY */}

                            <button
                                onClick={handleApply}
                                disabled={applying}
                                className="btn-primary py-2 px-4 text-xs font-semibold"
                            >

                                <Send size={13} />

                                <span>

                                    {applying
                                        ? "Applying..."
                                        : "Apply Now"}

                                </span>

                            </button>


                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* CONTENT GRID */}
                {/* ================================= */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">


                    {/* LEFT COLUMN */}

                    <div className="lg:col-span-2 space-y-4">


                        <div className="bg-white border border-slate-200 rounded-xl p-4 md:p-5 shadow-sm space-y-4">


                            {/* DESCRIPTION */}

                            <div>

                                <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">

                                    Role Description

                                </h2>


                                <div className="mt-3 text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">

                                    {internship.description ||
                                        "No full description provided."}

                                </div>

                            </div>


                            {/* SKILLS */}

                            <div>

                                <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">

                                    Candidate Qualifications & Skills

                                </h2>


                                <div className="mt-3">

                                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">

                                        REQUIRED SKILLS

                                    </p>


                                    <div className="flex flex-wrap gap-1.5">


                                        {internship.skillsRequired ? (

                                            internship.skillsRequired
                                                .split(",")
                                                .map(
                                                    (
                                                        skill,
                                                        index
                                                    ) => (

                                                        <span
                                                            key={index}
                                                            className="text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1 rounded"
                                                        >

                                                            {skill.trim()}

                                                        </span>

                                                    )
                                                )

                                        ) : (

                                            <span className="text-xs text-slate-400">

                                                None specified.

                                            </span>

                                        )}


                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ================================= */}
                    {/* RIGHT COLUMN */}
                    {/* ================================= */}

                    <div className="space-y-4">


                        {/* MATCH SCORE */}
                        {/* ONLY LOGGED-IN STUDENTS */}

                        {isLoggedIn && match && (

                            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3.5">


                                <div className="flex items-center gap-1.5">

                                    <Sparkles
                                        size={14}
                                        className="text-blue-600 animate-pulse"
                                    />

                                    <h2 className="text-sm font-bold text-slate-900">

                                        Compatibility Analysis

                                    </h2>

                                </div>


                                <div className="border-t border-slate-100 pt-3">


                                    <div className="flex justify-between text-[10px] font-bold text-slate-800 mb-1">

                                        <span>
                                            Skills Match Rating
                                        </span>

                                        <span>
                                            {match.matchPercentage}%
                                        </span>

                                    </div>


                                    <div className="w-full bg-slate-100 rounded-full h-1.5">

                                        <div
                                            className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                                            style={{
                                                width:
                                                    `${match.matchPercentage}%`
                                            }}
                                        />

                                    </div>


                                    <p className="text-[10px] text-slate-500 mt-1.5">

                                        Matched{" "}

                                        {match.matchedSkillCount}{" "}

                                        of{" "}

                                        {match.totalRequiredSkills}{" "}

                                        required skills.

                                    </p>

                                </div>


                                {/* MATCHED SKILLS */}

                                <div className="space-y-3 pt-1">


                                    <div>

                                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-green-600 mb-1.5">

                                            Matched Skills

                                        </h4>


                                        {match.matchedSkills?.length === 0 ? (

                                            <p className="text-[10px] text-slate-400 italic">

                                                None of your skills matched this posting.

                                            </p>

                                        ) : (

                                            <div className="space-y-1">

                                                {match.matchedSkills?.map(
                                                    (skill) => (

                                                        <div
                                                            key={skill}
                                                            className="flex items-center gap-1.5 text-xs text-slate-700"
                                                        >

                                                            <CheckCircle2
                                                                size={12}
                                                                className="text-green-500 shrink-0"
                                                            />

                                                            <span>
                                                                {skill}
                                                            </span>

                                                        </div>

                                                    )
                                                )}

                                            </div>

                                        )}

                                    </div>


                                    {/* MISSING SKILLS */}

                                    <div>

                                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">

                                            Missing Skills

                                        </h4>


                                        {match.missingSkills?.length === 0 ? (

                                            <p className="text-[10px] text-green-600 font-semibold">

                                                Excellent! You possess all required skills.

                                            </p>

                                        ) : (

                                            <div className="space-y-1">

                                                {match.missingSkills?.map(
                                                    (skill) => (

                                                        <div
                                                            key={skill}
                                                            className="flex items-center gap-1.5 text-xs text-slate-500"
                                                        >

                                                            <span className="h-1.5 w-1.5 rounded-full bg-slate-300 shrink-0" />

                                                            <span>
                                                                {skill}
                                                            </span>

                                                        </div>

                                                    )
                                                )}

                                            </div>

                                        )}

                                    </div>

                                </div>

                            </div>

                        )}


                        {/* ================================= */}
                        {/* GUEST REGISTER PROMPT */}
                        {/* ================================= */}

                        {!isLoggedIn && (

                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">

                                <Sparkles
                                    size={17}
                                    className="text-blue-600"
                                />


                                <h3 className="text-sm font-bold text-blue-950 mt-3">

                                    See your skill match

                                </h3>


                                <p className="text-xs text-blue-700 mt-1.5 leading-5">

                                    Create a student account and complete
                                    your profile to see how your skills
                                    match this internship.

                                </p>


                                <button
                                    onClick={() =>
                                        navigate("/register")
                                    }
                                    className="mt-3 text-xs font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
                                >

                                    Create Account →

                                </button>

                            </div>

                        )}


                        {/* ================================= */}
                        {/* LISTING METADATA */}
                        {/* ================================= */}

                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">


                            <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-1.5">

                                Listing Metadata

                            </h3>


                            <div className="space-y-2 text-[11px] text-slate-600">


                                <div className="flex justify-between gap-3">

                                    <span className="text-slate-500">
                                        Position Status
                                    </span>

                                    <span className="font-semibold text-slate-900 uppercase">

                                        {internship.status || "OPEN"}

                                    </span>

                                </div>


                                <div className="flex justify-between gap-3">

                                    <span className="text-slate-500">
                                        Application Deadline
                                    </span>

                                    <span className="font-semibold text-slate-900">

                                        {internship.deadline || "Open"}

                                    </span>

                                </div>


                                <div className="flex justify-between gap-3">

                                    <span className="text-slate-500">
                                        Office Location
                                    </span>

                                    <span className="font-semibold text-slate-900 text-right">

                                        {internship.location}

                                    </span>

                                </div>


                                <div className="flex justify-between gap-3">

                                    <span className="text-slate-500">
                                        Stipend Amount
                                    </span>

                                    <span className="font-semibold text-slate-900">

                                        ₹{" "}

                                        {internship.stipend
                                            ? internship.stipend.toLocaleString()
                                            : "0"}

                                        /mo

                                    </span>

                                </div>


                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </PublicLayout>

    );

}


export default InternshipDetails;