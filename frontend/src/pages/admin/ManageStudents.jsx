import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { getAllStudents } from "../../services/studentService";

function ManageStudents() {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        loadStudents();

    }, []);

    async function loadStudents() {

        try {

            const response = await getAllStudents();

            setStudents(response.data);

        }

        catch (error) {

            console.log(error);

        }

    }

    const filteredStudents = students.filter(student =>

        student.fullName.toLowerCase().includes(search.toLowerCase()) ||

        student.email.toLowerCase().includes(search.toLowerCase()) ||

        student.college.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <AdminLayout>

            <h1 className="text-4xl font-bold mb-8">

                Manage Students

            </h1>

            <input
                type="text"
                placeholder="Search students..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-xl px-4 py-3 w-full mb-6"
            />

            <div className="bg-white rounded-2xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">Name</th>

                            <th>Email</th>

                            <th>College</th>

                            <th>Degree</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredStudents.map(student => (

                                <tr
                                    key={student.id}
                                    className="border-t"
                                >

                                    <td className="p-4">

                                        {student.fullName}

                                    </td>

                                    <td>

                                        {student.email}

                                    </td>

                                    <td>

                                        {student.college}

                                    </td>

                                    <td>

                                        {student.degree}

                                    </td>

                                    <td>

                                        <button
                                            onClick={() =>
                                                navigate(`/admin/students/${student.id}`)
                                            }
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                        >

                                            View

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </AdminLayout>

    );

}

export default ManageStudents;