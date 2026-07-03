import { useEffect, useState } from "react";
import InternshipCard from "../cards/InternshipCard";
import { getLatestInternships } from "../../services/internshipService";

function FeaturedInternships() {
    const [internships, setInternships] = useState([]);

    useEffect(() => {
        loadInternships();
    }, []);

    const loadInternships = async () => {
        try {
            const response = await getLatestInternships();
            setInternships(response.data);
        } catch (error) {
            console.error("Failed to load featured postings", error);
        }
    };

    return (
        <section className="py-16 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Featured Internship Roles
                    </h2>
                    <p className="text-sm text-slate-500 mt-2">
                        Inspect active internship listings in tech, design, marketing, and management.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    {internships.slice(0, 6).map((internship) => (
                        <InternshipCard
                            key={internship.id}
                            internship={internship}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturedInternships;