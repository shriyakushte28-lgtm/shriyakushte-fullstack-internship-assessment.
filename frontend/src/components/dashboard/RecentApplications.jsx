import { useEffect, useState } from "react";
import { getStudentApplications } from "../../services/applicationService";

function RecentApplications() {

    const userId = Number(localStorage.getItem("userId"));

    const [applications, setApplications] = useState([]);

    useEffect(() => {

        loadApplications();

    }, []);

    async function loadApplications() {

        try {

            const response = await getStudentApplications(userId);

            setApplications(response.data);

        }

        catch (error) {

            console.log(error);

        }

    }

    function getStatusColor(status) {

        switch (status) {

            case "PENDING":
                return "text-yellow-600 font-semibold";

            case "SHORTLISTED":
                return "text-green-600 font-semibold";

            case "ACCEPTED":
                return "text-blue-600 font-semibold";

            case "REJECTED":
                return "text-red-600 font-semibold";

            default:
                return "";

        }

    }

    return (

        <div className="bg-white rounded-2xl shadow p-8 mt-8">

            <h2 className="text-2xl font-bold mb-6">

                Recent Applications

            </h2>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="text-left py-3">Internship</th>

                        <th className="text-left">Company</th>

                        <th>Status</th>

                        <th>Applied On</th>

                    </tr>

                </thead>

                <tbody>

                    {applications.length === 0 ? (

                        <tr>

                            <td
                                colSpan="4"
                                className="py-6 text-center text-gray-500"
                            >
                                No applications yet.
                            </td>

                        </tr>

                    ) : (

                        applications.map((application) => (

                            <tr
                                key={application.id}
                                className="border-b"
                            >

                                <td className="py-4">

                                    {application.internship.title}

                                </td>

                                <td>

                                    {application.internship.companyName}

                                </td>

                                <td
                                    className={getStatusColor(application.status)}
                                >

                                    {application.status}

                                </td>

                                <td>

                                    {application.appliedAt.substring(0, 10)}

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default RecentApplications;