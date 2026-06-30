import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import InternshipTable from "../../components/admin/InternshipTable";
import InternshipForm from "../../components/admin/InternshipForm";

import {
    getAllInternships,
    createInternship,
    updateInternship,
    deleteInternship
} from "../../services/adminInternshipService";

function ManageInternships() {

    const [internships, setInternships] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [selectedInternship, setSelectedInternship] = useState(null);

    const [search, setSearch] = useState("");

    const filteredInternships = internships.filter((internship) =>
        internship.title.toLowerCase().includes(search.toLowerCase()) ||
        internship.companyName.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {

        loadInternships();

    }, []);

    async function loadInternships() {

        try {

            const response = await getAllInternships();

            setInternships(response.data);

        } catch (error) {

            console.log(error);

        }

    }

    function addInternship() {

        setSelectedInternship(null);

        setShowForm(true);

    }

    function editInternship(internship) {

        setSelectedInternship(internship);

        setShowForm(true);

    }

    async function saveInternship(data) {

        try {

            if (selectedInternship) {

                await updateInternship(selectedInternship.id, data);

            } else {

                await createInternship(data);

            }

            setShowForm(false);

            setSelectedInternship(null);

            loadInternships();

        } catch (error) {

            console.log(error);

        }

    }

    async function removeInternship(id) {

        if (!window.confirm("Are you sure you want to delete this internship?")) {

            return;

        }

        try {

            await deleteInternship(id);

            loadInternships();

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <AdminLayout>

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold">

                    Manage Internships

                </h1>

                <button
                    onClick={addInternship}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
                >

                    + Add Internship

                </button>

            </div>

            {

                showForm &&

                <InternshipForm

                    internship={selectedInternship}

                    onSave={saveInternship}

                    onCancel={() => {

                        setShowForm(false);

                        setSelectedInternship(null);

                    }}

                />

            }

            <input
                type="text"
                placeholder="Search internships..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-lg px-4 py-2 mb-6 w-80"
            />

            <InternshipTable

                internships={filteredInternships}

                onEdit={editInternship}

                onDelete={removeInternship}

            />

        </AdminLayout>

    );

}

export default ManageInternships;