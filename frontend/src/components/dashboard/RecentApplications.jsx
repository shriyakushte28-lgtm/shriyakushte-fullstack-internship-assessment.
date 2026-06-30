function RecentApplications() {

    return (

        <div className="bg-white rounded-2xl shadow p-8 mt-8">

            <h2 className="text-2xl font-bold mb-6">

                Recent Applications

            </h2>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="text-left py-3">Internship</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    <tr>

                        <td className="py-5">

                            No applications yet

                        </td>

                        <td>

                            --

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    );

}

export default RecentApplications;