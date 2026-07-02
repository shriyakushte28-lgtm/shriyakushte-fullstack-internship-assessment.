import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

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

function InternshipDetails() {

    const navigate = useNavigate();

    const { id } = useParams();

    const userId = Number(localStorage.getItem("userId"));

    const [internship, setInternship] = useState(null);

    const [match, setMatch] = useState(null);

    const [profile, setProfile] = useState(null);

    const [saved, setSaved] = useState(false);

    const [saving, setSaving] = useState(false);

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

        }

        catch (error) {

            console.log(error);

        }

    }

    async function loadMatch() {

        try {

            const response = await getInternshipMatch(id, userId);

            setMatch(response.data);

        }

        catch (error) {

            console.log(error);

        }

    }

    async function handleApply() {

        if (!profile?.resumeUrl) {

    alert("Please upload your resume before applying.");

    navigate("/profile");

    return;

}

        try {

            await applyInternship({

                userId: userId,

                internshipId: internship.id,

                coverLetter: "",

                resumeUrl: profile?.resumeUrl || ""

            });

            alert("Application Submitted Successfully!");

            navigate("/applications");

        }

        catch (error) {

            if (error.response?.status === 409) {

                alert("You have already applied for this internship.");

            }

            else {

                alert("Something went wrong. Please try again.");

                console.log(error);

            }

        }

    }

    async function checkSaved() {

    try {

        const response = await checkSavedInternship(userId, id);

        setSaved(response.data);

    }

    catch (error) {

        console.log(error);

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

        alert("Internship saved successfully!");

    }

    catch (error) {

        if (error.response?.status === 409) {

            alert("Internship already saved.");

            setSaved(true);

        }

        else {

            console.log(error);

        }

    }

    finally {

        setSaving(false);

    }

}

async function loadProfile() {

    try {

        const response = await getProfile(userId);

        setProfile(response.data);

    }

    catch (error) {

        console.log(error);

    }

}

    if (!internship) {

        return (

            <DashboardLayout>

                <h2 className="text-2xl">

                    Loading...

                </h2>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <h1 className="text-4xl font-bold">

                {internship.title}

            </h1>

            <div className="bg-white rounded-2xl shadow p-8 mt-8">

                <p className="mb-3">

                    <strong>Company:</strong> {internship.companyName}

                </p>

                <p className="mb-3">

                    <strong>Location:</strong> {internship.location}

                </p>

                <p className="mb-3">

                    <strong>Stipend:</strong> ₹ {internship.stipend}

                </p>

                <p className="mb-3">

                    <strong>Duration:</strong> {internship.durationMonths} Months

                </p>

                <p className="mb-3">

                    <strong>Deadline:</strong> {internship.deadline}

                </p>

                <p className="mb-5">

                    <strong>Required Skills:</strong>

                    <br />

                    {internship.skillsRequired}

                </p>

                <p className="font-semibold text-lg">

                    Description

                </p>

                <p className="mt-2 mb-8">

                    {internship.description}

                </p>

                {

                    match && (

                        <div className="border rounded-2xl p-6 bg-slate-50 mb-8">

                            <h2 className="text-2xl font-bold mb-5">

                                🎯 Your Compatibility

                            </h2>

                            <div className="w-full bg-gray-200 rounded-full h-5">

                                <div

                                    className="bg-green-600 h-5 rounded-full transition-all"

                                    style={{

                                        width: `${match.matchPercentage}%`

                                    }}

                                >

                                </div>

                            </div>

                            <p className="text-xl font-bold mt-4">

                                {match.matchPercentage}% Match

                            </p>

                            <p className="text-gray-600 mb-6">

                                {match.matchedSkillCount} of {match.totalRequiredSkills} required skills matched.

                            </p>

                            <div className="grid md:grid-cols-2 gap-8">

                                <div>

                                    <h3 className="font-bold text-green-700 mb-3">

                                        ✅ Skills You Already Have

                                    </h3>

                                    {

                                        match.matchedSkills.length === 0 ?

                                            (

                                                <p>

                                                    No matching skills.

                                                </p>

                                            )

                                            :

                                            match.matchedSkills.map(skill => (

                                                <p
                                                    key={skill}
                                                    className="mb-2"
                                                >

                                                    ✔ {skill}

                                                </p>

                                            ))

                                    }

                                </div>

                                <div>

                                    <h3 className="font-bold text-orange-600 mb-3">

                                        📚 Skills You Can Learn

                                    </h3>

                                    {

                                        match.missingSkills.length === 0 ?

                                            (

                                                <p>

                                                    Excellent! You already have every required skill.

                                                </p>

                                            )

                                            :

                                            match.missingSkills.map(skill => (

                                                <p
                                                    key={skill}
                                                    className="mb-2"
                                                >

                                                    • {skill}

                                                </p>

                                            ))

                                    }

                                </div>

                            </div>

                        </div>

                    )

                }

                <div className="flex gap-4 mt-8">

    <button

        onClick={handleApply}

        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"

    >

        Apply Now

    </button>

    <button

        disabled={saved || saving}

        onClick={handleSave}

        className={`px-8 py-3 rounded-xl text-white ${
            saved
                ? "bg-green-600"
                : "bg-pink-600 hover:bg-pink-700"
        }`}

    >

        {

            saved

                ? "❤️ Saved"

                : "🤍 Save Internship"

        }

    </button>

</div>

            </div>

        </DashboardLayout>

    );

}

export default InternshipDetails;