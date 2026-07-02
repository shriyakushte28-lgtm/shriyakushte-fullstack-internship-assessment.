import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecommendedInternships } from "../../services/internshipService";

function RecommendedInternships() {

    const navigate = useNavigate();

    const userId = Number(localStorage.getItem("userId"));

    const [internships, setInternships] = useState([]);

    useEffect(() => {

        loadRecommendations();

    }, []);

    async function loadRecommendations() {

        try {

            const response = await getRecommendedInternships(userId);

            setInternships(response.data);

        }

        catch (error) {

            console.log(error);

        }

    }

    return (

        <div className="bg-white rounded-2xl shadow p-6 mt-8">

            <h2 className="text-2xl font-bold mb-6">

                ⭐ Recommended For You

            </h2>

            {

                internships.length === 0 ?

                    <p>No recommendations available.</p>

                    :

                    internships.map(internship => (

                        <div
                            key={internship.id}
                            className="border rounded-xl p-4 mb-4 hover:shadow-md transition"
                        >

                            <h3 className="text-xl font-semibold">

                                {internship.title}

                            </h3>

                            <p className="text-gray-600">

                                {internship.companyName}

                            </p>

                            <p className="mt-2">

                                📍 {internship.location}

                            </p>

                            <p>

                                💰 ₹ {internship.stipend}

                            </p>

                            <button
                                onClick={() => navigate(`/internships/${internship.id}`)}
                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                            >

                                View Internship

                            </button>

                        </div>

                    ))

            }

        </div>

    );

}

export default RecommendedInternships;