import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getSavedInternships, removeSavedInternship } from "../../services/savedService";
import { Bookmark, MapPin, IndianRupee, Trash2, ArrowRight } from "lucide-react";
import ConfirmModal from "../../components/common/ConfirmModal";
import toast from "react-hot-toast";
import SkeletonCard from "../../components/skeletons/SkeletonCard";

function MySavedInternships() {
    const navigate = useNavigate();
    const userId = Number(localStorage.getItem("userId"));
    const [savedInternships, setSavedInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [internshipToRemove, setInternshipToRemove] = useState(null);

    useEffect(() => {
        loadSavedInternships();
    }, []);

    async function loadSavedInternships() {
        try {
            setLoading(true);
            const response = await getSavedInternships(userId);
            setSavedInternships(response.data);
        } catch (error) {
            console.error("Failed to load saved internships list", error);
        } finally {
            setLoading(false);
        }
    }

    function handleRemove(internshipId) {
    setInternshipToRemove(internshipId);
    setShowRemoveModal(true);
}

async function confirmRemoveInternship() {
    try {
        await removeSavedInternship(userId, internshipToRemove);

        toast.success("Internship removed from saved list.");

        loadSavedInternships();

    } catch (error) {

        console.error(error);

        toast.error("Unable to remove internship.");

    } finally {

        setShowRemoveModal(false);

        setInternshipToRemove(null);

    }
}

    return (
        <DashboardLayout>
            <div className="space-y-4">
                {/* Title */}
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        <Bookmark size={18} className="text-slate-700" />
                        <span>Saved Internships</span>
                    </h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Review roles you bookmarked for later submission
                    </p>
                </div>

                {/* Grid */}
                {loading ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
        ))}
    </div>
                ) : savedInternships.length === 0 ? (
                    <div className="py-12 text-center border border-dashed border-slate-200 bg-white rounded-xl shadow-sm">
                        <div className="text-slate-300 mb-2.5 flex justify-center">
                            <Bookmark size={36} />
                        </div>
                        <h3 className="text-sm font-bold text-slate-900">No saved internships</h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Bookmark positions while browsing to keep track of them here.
                        </p>
                        <button
                            onClick={() => navigate("/internships")}
                            className="btn-primary mt-3.5 py-1.5 px-3.5 text-xs"
                        >
                            Browse Listings
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {savedInternships.map((saved) => (
                            <div
                                key={saved.id}
                                className="bg-white border border-slate-200 rounded-xl p-4 hover:border-slate-350 hover:shadow-sm transition-all duration-150 flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-50 border border-slate-200 text-slate-500">
                                            {saved.internship.status || "OPEN"}
                                        </span>
                                        <button
                                            onClick={() => handleRemove(saved.internship.id)}
                                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                                            title="Unsave Posting"
                                        >
                                            <Trash2 size={13} />
                                        </button>
                                    </div>

                                    <h3 className="text-xs font-bold text-slate-900 mt-3 leading-snug">
                                        {saved.internship.title}
                                    </h3>
                                    <p className="text-[10px] font-semibold text-slate-500 mt-0.5">
                                        {saved.internship.companyName}
                                    </p>

                                    <div className="mt-3.5 space-y-1.5 text-xs text-slate-650 border-t border-slate-100 pt-3">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={13} className="text-slate-400" />
                                            <span className="truncate text-[11px]">{saved.internship.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                                            <IndianRupee size={13} className="text-slate-400" />
                                            <span className="text-[11px]">₹ {saved.internship.stipend ? saved.internship.stipend.toLocaleString() : "0"}/month</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate(`/internships/${saved.internship.id}`)}
                                    className="btn-secondary w-full mt-4 py-1.5 px-3 text-xs"
                                >
                                    <span>View Details</span>
                                    <ArrowRight size={13} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ConfirmModal
    open={showRemoveModal}
    title="Remove Saved Internship"
    message="Are you sure you want to remove this internship from your saved list?"
    confirmText="Remove"
    cancelText="Cancel"
    danger={true}
    onConfirm={confirmRemoveInternship}
    onCancel={() => {
        setShowRemoveModal(false);
        setInternshipToRemove(null);
    }}
/>
        </DashboardLayout>
    );
}

export default MySavedInternships;