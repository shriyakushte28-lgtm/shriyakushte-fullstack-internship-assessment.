import { useNavigate } from "react-router-dom";
import { MapPin, IndianRupee, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getInternshipMatch } from "../../services/internshipService";

function InternshipCard({ internship }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

const userId = token
    ? Number(localStorage.getItem("userId"))
    : null;
    const [matchScore, setMatchScore] = useState(null);

    useEffect(() => {
    if (token && userId && internship.id) {

        getInternshipMatch(
            internship.id,
            userId
        )
            .then((res) => {
                setMatchScore(
                    res.data.matchScore
                );
            })
            .catch(() => {
                setMatchScore(null);
            });
    }

}, [internship.id, userId, token]);

    const getStatusStyle = (status) => {
        if (status === "OPEN" || status === "ACTIVE") {
            return "bg-green-50 border-green-100 text-green-700";
        }
        return "bg-slate-100 border-slate-200 text-slate-500";
    };

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-4 hover:border-slate-300 hover:shadow-sm transition-all duration-150 flex flex-col justify-between h-full group">
            <div>
                {/* Header Badge Row */}
                <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusStyle(internship.status)}`}>
                        {internship.status || "OPEN"}
                    </span>
                    {matchScore !== null && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-blue-50 border border-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                            {matchScore}% Match
                        </span>
                    )}
                </div>

                {/* Job Title & Company */}
                <h3 className="text-sm font-bold text-slate-900 mt-3 leading-snug">
                    {internship.title}
                </h3>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                    {internship.companyName}
                </p>

                {/* Details Meta */}
                <div className="mt-3.5 space-y-1.5 text-xs text-slate-650 border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-slate-400 shrink-0" />
                        <span className="truncate">{internship.location} {internship.isRemote ? "(Remote)" : ""}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                        <IndianRupee size={13} className="text-slate-400 shrink-0" />
                        <span>₹ {internship.stipend ? internship.stipend.toLocaleString() : "0"}/month</span>
                    </div>
                </div>

                {/* Skills tags */}
                {internship.skillsRequired && (
                    <div className="mt-3 flex flex-wrap gap-1">
                        {internship.skillsRequired.split(",").slice(0, 3).map((skill, idx) => (
                            <span
                                key={idx}
                                className="text-[10px] font-medium bg-slate-50 border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded"
                            >
                                {skill.trim()}
                            </span>
                        ))}
                        {internship.skillsRequired.split(",").length > 3 && (
                            <span className="text-[10px] font-medium bg-slate-50 border border-slate-200 text-slate-400 px-1.5 py-0.5 rounded">
                                +{internship.skillsRequired.split(",").length - 3} more
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* View Details button */}
            <button
                onClick={() => navigate(`/internships/${internship.id}`)}
                className="btn-secondary w-full mt-4 py-1.5 px-3 text-xs"
            >
                <span>View Details</span>
                <ArrowRight size={13} />
            </button>
        </div>
    );
}

export default InternshipCard;