import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import InternshipCard from "../../components/cards/InternshipCard";
import { getAllInternships } from "../../services/internshipService";

function BrowseInternships() {

    const [internships, setInternships] = useState([]);
    const [search, setSearch] = useState("");

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

    const filteredInternships = internships.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DashboardLayout>

            <h1 className="text-4xl font-bold mb-8">
                Browse Internships
            </h1>

            <input
                type="text"
                placeholder="Search internship..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-4 rounded-xl w-full mb-10"
            />

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

                {filteredInternships.map((job) => (

                    <InternshipCard
                        key={job.id}
                        internship={job}
                    />

                ))}

            </div>

        </DashboardLayout>
    );

}

export default BrowseInternships;