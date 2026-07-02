import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getStudentApplications } from "../../services/applicationService";

function MyApplications() {

    const [applications, setApplications] = useState([]);
    const userId = Number(localStorage.getItem("userId"));

    useEffect(() => {

        loadApplications();

    }, []);

    async function loadApplications() {

        try {

            const response = await getStudentApplications(userId);

            setApplications(response.data);

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <DashboardLayout>

            <h1 className="text-4xl font-bold mb-8">

                My Applications

            </h1>

            <div className="bg-white rounded-2xl shadow p-8">

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left py-4">Internship</th>

                            <th>Company</th>

                            <th>Status</th>

                            <th>Applied On</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            applications.map((application) => (

                                <tr
                                    key={application.id}
                                    className="border-b"
                                >

                                    <td className="py-5">

                                        {application.internship.title}

                                    </td>

                                    <td>

                                        {application.internship.companyName}

                                    </td>

                                    <td>

                                        {application.status}

                                    </td>

                                    <td>

                                        {application.appliedAt.substring(0,10)}

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </DashboardLayout>

    );

}

export default MyApplications;