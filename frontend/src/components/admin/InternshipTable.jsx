import StatusBadge from "./StatusBadge";

function InternshipTable({

    internships,
    onEdit,
    onDelete

}) {

    return (

        <div className="bg-white rounded-2xl shadow overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-100">

                    <tr>

                        <th className="p-4 text-left">Title</th>

                        <th>Company</th>

                        <th>Location</th>

                        <th>Stipend</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        internships.map((internship) => (

                            <tr
                                key={internship.id}
                                className="border-t hover:bg-gray-50"
                            >

                                <td className="p-4">

                                    {internship.title}

                                </td>

                                <td>

                                    {internship.companyName}

                                </td>

                                <td>

                                    {internship.location}

                                </td>

                                <td>

                                    ₹ {internship.stipend}

                                </td>

                                <td>

                                    <StatusBadge
                                        status={internship.status}
                                    />

                                </td>

                                <td>

                                    <button
                                        onClick={() => onEdit(internship)}
                                        className="bg-yellow-500 text-white px-3 py-2 rounded-lg mr-2 hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => onDelete(internship.id)}
                                        className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default InternshipTable;