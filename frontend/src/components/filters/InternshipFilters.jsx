import { useState } from "react";
import { Search, MapPin, Briefcase, IndianRupee, X } from "lucide-react";

function InternshipFilters({ onSearch }) {
    const initialFilters = {
        title: "",
        location: "",
        remote: "",
        minStipend: ""
    };

    const [filters, setFilters] = useState(initialFilters);

    function handleChange(e) {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    }

    function search() {
        const data = { ...filters };
        if (data.title === "") delete data.title;
        if (data.location === "") delete data.location;

        if (data.remote === "") {
            delete data.remote;
        } else {
            data.remote = data.remote === "true";
        }

        if (data.minStipend === "") {
            delete data.minStipend;
        }

        onSearch(data);
    }

    function clearFilters() {
        setFilters(initialFilters);
        onSearch({});
    }

    return (
        <div className="bg-white border border-zinc-200/80 rounded-xl p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {/* Search Title */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                        <Search size={14} />
                    </div>
                    <input
                        name="title"
                        value={filters.title}
                        onChange={handleChange}
                        placeholder="Search job title..."
                        className="block w-full pl-9 pr-3 py-2 border border-zinc-200 bg-zinc-55/30 rounded-lg text-sm text-zinc-950 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 focus:bg-white transition-all"
                    />
                </div>

                {/* Location Filter */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                        <MapPin size={14} />
                    </div>
                    <input
                        name="location"
                        value={filters.location}
                        onChange={handleChange}
                        placeholder="City or remote..."
                        className="block w-full pl-9 pr-3 py-2 border border-zinc-200 bg-zinc-55/30 rounded-lg text-sm text-zinc-950 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 focus:bg-white transition-all"
                    />
                </div>

                {/* Work Mode Filter */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                        <Briefcase size={14} />
                    </div>
                    <select
                        name="remote"
                        value={filters.remote}
                        onChange={handleChange}
                        className="block w-full pl-9 pr-3 py-2 border border-zinc-200 bg-zinc-55/30 rounded-lg text-sm text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 focus:bg-white transition-all cursor-pointer"
                    >
                        <option value="">Work Mode</option>
                        <option value="true">Remote only</option>
                        <option value="false">On Site only</option>
                    </select>
                </div>

                {/* Min Stipend Filter */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                        <IndianRupee size={14} />
                    </div>
                    <input
                        type="number"
                        name="minStipend"
                        value={filters.minStipend}
                        onChange={handleChange}
                        placeholder="Min stipend (₹)..."
                        className="block w-full pl-9 pr-3 py-2 border border-zinc-200 bg-zinc-55/30 rounded-lg text-sm text-zinc-950 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 focus:bg-white transition-all"
                    />
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={search}
                        className="flex-1 py-2 px-3 border border-transparent rounded-lg text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-950 shadow-sm transition-all cursor-pointer text-center"
                    >
                        Apply Filters
                    </button>
                    {(filters.title || filters.location || filters.remote || filters.minStipend) && (
                        <button
                            onClick={clearFilters}
                            className="p-2 border border-zinc-200 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50 rounded-lg shadow-sm transition-all cursor-pointer"
                            title="Clear Filters"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default InternshipFilters;