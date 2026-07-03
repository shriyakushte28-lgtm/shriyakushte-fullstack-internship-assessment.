import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowRight, Compass, Sparkles } from "lucide-react";
import { getRecommendedInternships } from "../../services/internshipService";

function RecommendedInternships() {
    const navigate = useNavigate();
    const userId = Number(localStorage.getItem("userId"));
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRecommendations();
    }, []);

    async function loadRecommendations() {
        try {
            setLoading(true);
            const response = await getRecommendedInternships(userId);
            setInternships(response.data);
        } catch (error) {
            console.error("Failed to load recommended internships", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-sm font-bold text-slate-900">
                        Recommended for you
                    </h2>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                        Roles tailored to match your profile skills
                    </p>
                </div>
                <Compass size={16} className="text-slate-400" />
            </div>

            {loading ? (
                <div className="space-y-2 py-2">
                    <div className="h-16 w-full bg-slate-100 animate-pulse rounded-lg"></div>
                    <div className="h-16 w-full bg-slate-100 animate-pulse rounded-lg"></div>
                </div>
            ) : internships.length === 0 ? (
                <div className="py-6 text-center border border-dashed border-slate-200 rounded-xl">
                    <p className="text-xs text-slate-400">No recommendations available yet.</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Complete your profile to get matches.</p>
                </div>
            ) : (
                <div className="space-y-2.5">
                    {internships.slice(0, 3).map((job) => (
                        <div
                            key={job.id}
                            className="group border border-slate-150 rounded-lg p-3 bg-slate-50/30 hover:bg-white hover:border-slate-350 hover:shadow-[0_1px_3px_0_rgba(0,0,0,0.01)] transition-all duration-150"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                                        {job.title}
                                    </h3>
                                    <p className="text-[10px] text-slate-500 mt-0.5">
                                        {job.companyName}
                                    </p>
                                </div>
                                <span className="inline-flex items-center gap-0.5 text-[9px] font-bold bg-blue-50 border border-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                                    <Sparkles size={8} />
                                    {job.matchPercentage || "85"}% Match
                                </span>
                            </div>

                            <div className="flex gap-4 mt-2 text-[10px] text-slate-500">
                                <span className="flex items-center gap-1">
                                    <MapPin size={11} className="text-slate-400" />
                                    {job.location}
                                </span>
                                <span className="font-semibold text-slate-700">
                                    ₹ {job.stipend ? job.stipend.toLocaleString() : "0"}/mo
                                </span>
                            </div>

                            <button
                                onClick={() => navigate(`/internships/${job.id}`)}
                                className="btn-secondary w-full mt-3 py-1 px-2.5 text-[10px]"
                            >
                                <span>Inspect Position</span>
                                <ArrowRight size={11} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {internships.length > 3 && (
                <button
                    onClick={() => navigate("/internships")}
                    className="mt-3.5 w-full text-center text-[10px] font-bold text-slate-500 hover:text-slate-900 hover:underline"
                >
                    View all recommendations ({internships.length}) &rarr;
                </button>
            )}
        </div>
    );
}

export default RecommendedInternships;