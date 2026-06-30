import { useEffect, useState } from "react";
import { getLatestInternships } from "../../services/internshipService";

function LatestInternships() {

    const [internships, setInternships] = useState([]);

    useEffect(() => {
        loadInternships();
    }, []);

    async function loadInternships() {

        try {

            const response = await getLatestInternships();

            setInternships(response.data);

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <div className="bg-white rounded-2xl shadow p-8 mt-8">

            <h2 className="text-2xl font-bold mb-6">

                Latest Internships

            </h2>

            <div className="space-y-5">

                {

                    internships.map((job) => (

                        <div
                            key={job.id}
                            className="border rounded-xl p-5 flex justify-between items-center"
                        >

                            <div>

                                <h3 className="font-bold text-lg">

                                    {job.title}

                                </h3>

                                <p className="text-gray-500">

                                    {job.companyName}

                                </p>

                                <p className="text-gray-400">

                                    📍 {job.location}

                                </p>

                            </div>

                            <button
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                            >
                                View
                            </button>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default LatestInternships;