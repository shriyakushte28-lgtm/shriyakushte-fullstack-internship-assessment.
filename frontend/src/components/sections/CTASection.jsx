import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function CTASection() {
    const navigate = useNavigate();

    return (
        <section className="py-16 bg-white">
            <div className="max-w-5xl mx-auto px-6">
                <div className="bg-slate-900 border border-slate-850 rounded-2xl p-10 md:p-14 text-center text-white relative overflow-hidden shadow-sm">
                    {/* Glow element */}
                    <div className="absolute inset-0 bg-blue-500/5 blur-3xl -z-10"></div>

                    <h2 className="text-2xl md:text-3.5xl font-extrabold tracking-tight text-white leading-tight">
                        Ready to Find Your Next Internship?
                    </h2>
                    <p className="mt-4 text-xs md:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
                        Join hundreds of students already matching their skill profiles with verified tech, design, and engineering postings.
                    </p>

                    <button
                        onClick={() => navigate("/register")}
                        className="btn-primary mt-8 px-6 py-2.5 text-xs shadow-md inline-flex items-center gap-1.5"
                    >
                        <span>Create Student Account</span>
                        <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </section>
    );
}

export default CTASection;