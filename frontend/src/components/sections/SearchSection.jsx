import { Search, MapPin, Grid } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SearchSection() {
    const navigate = useNavigate();

    return (
        <section className="relative -mt-8 z-10 px-6">
            <div className="max-w-4xl mx-auto bg-white border border-slate-200 shadow-md rounded-xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {/* Position Search */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Search size={14} />
                        </div>
                        <input
                            placeholder="Title e.g. Frontend"
                            className="block w-full pl-9 pr-3 py-2 border border-slate-200 bg-slate-50/50 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all font-medium"
                        />
                    </div>

                    {/* Location search */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <MapPin size={14} />
                        </div>
                        <input
                            placeholder="Location e.g. Mumbai"
                            className="block w-full pl-9 pr-3 py-2 border border-slate-200 bg-slate-50/50 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all font-medium"
                        />
                    </div>

                    {/* Category Selection */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Grid size={14} />
                        </div>
                        <select className="block w-full pl-9 pr-3 py-2 border border-slate-200 bg-slate-50/50 rounded-lg text-xs text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all cursor-pointer font-medium">
                            <option>All Categories</option>
                            <option>Software Engineering</option>
                            <option>Product Design</option>
                            <option>Data Science</option>
                            <option>Marketing</option>
                        </select>
                    </div>

                    {/* Action button */}
                    <button
                        onClick={() => navigate("/login")}
                        className="btn-primary py-2 text-xs w-full shadow-sm"
                    >
                        Search Database
                    </button>
                </div>
            </div>
        </section>
    );
}

export default SearchSection;