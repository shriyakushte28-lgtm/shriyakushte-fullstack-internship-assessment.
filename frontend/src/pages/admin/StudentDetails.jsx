import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { getStudentById } from "../../services/studentService";

function StudentDetails() {

    const { id } = useParams();

    const [student, setStudent] = useState(null);

    useEffect(() => {

        loadStudent();

    }, []);

    async function loadStudent() {

        try {

            const response = await getStudentById(id);

            setStudent(response.data);

        }

        catch (error) {

            console.log(error);

        }

    }

    if (!student) {

        return (

            <AdminLayout>

                <h2>Loading...</h2>

            </AdminLayout>

        );

    }

    return (

        <AdminLayout>

            <h1 className="text-4xl font-bold mb-8">

                Student Details

            </h1>

            <div className="bg-white rounded-2xl shadow p-8 space-y-4">

                <p><strong>Name:</strong> {student.fullName}</p>

                <p><strong>Email:</strong> {student.user.email}</p>

                <p><strong>Phone:</strong> {student.phone}</p>

                <p><strong>College:</strong> {student.college}</p>

                <p><strong>Degree:</strong> {student.degree}</p>

                <p><strong>Graduation Year:</strong> {student.graduationYear}</p>

                <p><strong>Skills:</strong> {student.skills}</p>

                <p><strong>Bio:</strong> {student.bio}</p>

                <p><strong>Resume:</strong> {student.resumeUrl}</p>

            </div>

        </AdminLayout>

    );

}

export default StudentDetails;