import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getInternshipById } from "../../services/internshipService";
import { applyInternship } from "../../services/applicationService";
import { useNavigate } from "react-router-dom";

function InternshipDetails() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [internship, setInternship] = useState(null);

    useEffect(() => {

        loadInternship();

    }, [id]);

    async function loadInternship() {

        try {

            const response = await getInternshipById(id);

            setInternship(response.data);

        } catch (error) {

            console.log(error);

        }
    }

    async function handleApply() {

    try {

        await applyInternship({

            studentId: 1,
            internshipId: internship.id,
            coverLetter: "",
            resumeUrl: "resume.pdf"

        });

        alert("Application Submitted Successfully!");

        navigate("/applications");

    } catch (error) {

    if (error.response?.status === 409) {

        alert("You have already applied for this internship.");

    } else {

        alert("Something went wrong. Please try again.");

        console.log(error);

    }

}

}

    if (!internship) {

        return (

            <DashboardLayout>

                <h2 className="text-2xl">Loading...</h2>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <h1 className="text-4xl font-bold">

                {internship.title}

            </h1>

            <div className="bg-white rounded-2xl shadow p-8 mt-8 space-y-4">

                <p><strong>Company:</strong> {internship.companyName}</p>

                <p><strong>Location:</strong> {internship.location}</p>

                <p><strong>Stipend:</strong> ₹ {internship.stipend}</p>

                <p><strong>Duration:</strong> {internship.durationMonths} Months</p>

                <p><strong>Deadline:</strong> {internship.deadline}</p>

                <p><strong>Skills:</strong> {internship.skillsRequired}</p>

                <p><strong>Description:</strong></p>

                <p>{internship.description}</p>

                <button
                    onClick={handleApply}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl mt-6 hover:bg-blue-700"
                >
                    Apply Now
                </button>

            </div>

        </DashboardLayout>

    );

}

export default InternshipDetails;