import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import InternshipCard from "../../components/cards/InternshipCard";
import { getAllInternships, filterInternships } from "../../services/internshipService";
import InternshipFilters from "../../components/filters/InternshipFilters";
import { Briefcase } from "lucide-react";

function BrowseInternships() {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadInternships();
    }, []);

    async function loadInternships() {
        try {
            setLoading(true);
            const response = await getAllInternships();
            setInternships(response.data);
        } catch (error) {
            console.error("Failed to load internships database", error);
        } finally {
            setLoading(false);
        }
    }

    async function searchInternships(filters) {
        try {
            setLoading(true);
            if (Object.keys(filters).length === 0) {
                await loadInternships();
                return;
            }
            const response = await filterInternships(filters);
            setInternships(response.data);
        } catch (error) {
            console.error("Failed to filter search results", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <DashboardLayout>
            <div className="space-y-4">
                {/* Title Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                            <Briefcase size={18} className="text-slate-700" />
                            <span>Browse Internships</span>
                        </h1>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Discover and match matching skill sets with open postings.
                        </p>
                    </div>
                    {!loading && (
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-lg shrink-0 w-fit">
                            {internships.length} Available {internships.length === 1 ? "Role" : "Roles"}
                        </div>
                    )}
                </div>

                {/* Filters Panel */}
                <InternshipFilters onSearch={searchInternships} />

                {/* Listing Results */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-48 border border-slate-200 bg-slate-50 animate-pulse rounded-lg"></div>
                        ))}
                    </div>
                ) : internships.length === 0 ? (
                    <div className="py-12 text-center border border-dashed border-slate-200 bg-white rounded-xl shadow-sm">
                        <div className="text-slate-300 mb-2.5 flex justify-center">
                            <Briefcase size={36} />
                        </div>
                        <h3 className="text-sm font-bold text-slate-900">No positions found</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Modify search keywords or click clear filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {internships.map((job) => (
                            <InternshipCard
                                key={job.id}
                                internship={job}
                            />
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

export default BrowseInternships;