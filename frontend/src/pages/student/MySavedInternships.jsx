import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
    getSavedInternships,
    removeSavedInternship
} from "../../services/savedService";

function MySavedInternships() {

    const navigate = useNavigate();

    const userId = Number(localStorage.getItem("userId"));

    const [savedInternships, setSavedInternships] = useState([]);

    useEffect(() => {

        loadSavedInternships();

    }, []);

    async function loadSavedInternships() {

        try {

            const response = await getSavedInternships(userId);

            setSavedInternships(response.data);

        }

        catch (error) {

            console.log(error);

        }

    }

    async function handleRemove(internshipId) {

        if (!window.confirm("Remove this saved internship?")) {

            return;

        }

        try {

            await removeSavedInternship(userId, internshipId);

            loadSavedInternships();

        }

        catch (error) {

            console.log(error);

        }

    }

    return (

        <DashboardLayout>

            <h1 className="text-4xl font-bold mb-8">

                ❤️ Saved Internships

            </h1>

            {

                savedInternships.length === 0 ?

                (

                    <div className="bg-white rounded-2xl shadow p-10 text-center">

                        <h2 className="text-2xl font-semibold">

                            No Saved Internships

                        </h2>

                        <p className="mt-3 text-gray-500">

                            Save internships to view them later.

                        </p>

                    </div>

                )

                :

                savedInternships.map(saved => (

                    <div
                        key={saved.id}
                        className="bg-white rounded-2xl shadow p-6 mb-5"
                    >

                        <h2 className="text-2xl font-bold">

                            {saved.internship.title}

                        </h2>

                        <p className="mt-2">

                            {saved.internship.companyName}

                        </p>

                        <p className="mt-2">

                            📍 {saved.internship.location}

                        </p>

                        <p className="mt-2">

                            💰 ₹ {saved.internship.stipend}

                        </p>

                        <div className="flex gap-4 mt-6">

                            <button

                                onClick={() =>
                                    navigate(`/internships/${saved.internship.id}`)
                                }

                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"

                            >

                                View Details

                            </button>

                            <button

                                onClick={() =>
                                    handleRemove(saved.internship.id)
                                }

                                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"

                            >

                                Remove

                            </button>

                        </div>

                    </div>

                ))

            }

        </DashboardLayout>

    );

}

export default MySavedInternships;