import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
    getAllApplications,
    updateApplicationStatus
} from "../../services/adminApplicationService";

function StatusBadge({ status }) {

    if (status === "ACCEPTED") {
        return (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                Accepted
            </span>
        );
    }

    if (status === "REJECTED") {
        return (
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                Rejected
            </span>
        );
    }

    return (
        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
            Pending
        </span>
    );
}

function ManageApplications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {

        loadApplications();

    }, []);

    async function loadApplications() {

        try {

            const response = await getAllApplications();

            setApplications(response.data);

        } catch (error) {

            console.log(error);

        }

    }

    async function changeStatus(id, status) {

        try {

            await updateApplicationStatus(id, status);

            loadApplications();

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <AdminLayout>

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold">

                    Manage Applications

                </h1>

            </div>

            <div className="bg-white rounded-2xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4 text-left">Student</th>

                            <th>Internship</th>

                            <th>Status</th>

                            <th>Applied On</th>

                            <th className="text-center">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {applications.map((application) => (

                            <tr
                                key={application.id}
                                className="border-t hover:bg-gray-50"
                            >

                                <td className="p-4">

                                    {application.student.fullName}

                                </td>

                                <td>

                                    {application.internship.title}

                                </td>

                                <td>

                                    <StatusBadge
                                        status={application.status}
                                    />

                                </td>

                                <td>

                                    {application.appliedAt.substring(0,10)}

                                </td>

                                <td className="text-center">

                                    <button
                                        onClick={() =>
                                            changeStatus(application.id,"ACCEPTED")
                                        }
                                        className="bg-green-600 text-white px-3 py-2 rounded-lg mr-2 hover:bg-green-700"
                                    >
                                        Accept
                                    </button>

                                    <button
                                        onClick={() =>
                                            changeStatus(application.id,"REJECTED")
                                        }
                                        className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                                    >
                                        Reject
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </AdminLayout>

    );

}

export default ManageApplications;