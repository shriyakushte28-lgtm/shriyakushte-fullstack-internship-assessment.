import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowRight, Zap } from "lucide-react";
import { getLatestInternships } from "../../services/internshipService";

function LatestInternships() {
    const navigate = useNavigate();
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadInternships();
    }, []);

    async function loadInternships() {
        try {
            setLoading(true);
            const response = await getLatestInternships();
            setInternships(response.data);
        } catch (error) {
            console.error("Failed to load latest student openings", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3.5">
                <div>
                    <h2 className="text-sm font-bold text-slate-900">
                        Latest Openings
                    </h2>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                        Recently added internship listings
                    </p>
                </div>
                <Zap size={16} className="text-amber-500 fill-amber-50" />
            </div>

            {loading ? (
                <div className="space-y-2.5">
                    <div className="h-14 bg-slate-50 animate-pulse rounded-lg"></div>
                    <div className="h-14 bg-slate-50 animate-pulse rounded-lg"></div>
                </div>
            ) : internships.length === 0 ? (
                <div className="py-5 text-center border border-dashed border-slate-200 rounded-xl">
                    <p className="text-xs text-slate-400">No new postings at this time.</p>
                </div>
            ) : (
                <div className="divide-y divide-slate-100">
                    {internships.slice(0, 4).map((job) => (
                        <div
                            key={job.id}
                            className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 group"
                        >
                            <div className="min-w-0">
                                <h3 className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                                    {job.title}
                                </h3>
                                <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-slate-500">
                                    <span className="font-semibold text-slate-700">{job.companyName}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-0.5">
                                        <MapPin size={10} className="text-slate-450" />
                                        <span>{job.location}</span>
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate(`/internships/${job.id}`)}
                                className="flex items-center justify-center p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-650 hover:text-slate-900 shadow-sm transition-all cursor-pointer"
                            >
                                <ArrowRight size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LatestInternships;