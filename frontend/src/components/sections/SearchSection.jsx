import { useState } from "react";
import { Search, MapPin, Grid } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SearchSection() {

    const navigate = useNavigate();


    const [title, setTitle] = useState("");

    const [location, setLocation] = useState("");

    const [category, setCategory] = useState("");


    function handleSearch() {

        const params = new URLSearchParams();


        if (title.trim()) {
            params.set(
                "title",
                title.trim()
            );
        }


        if (location.trim()) {
            params.set(
                "location",
                location.trim()
            );
        }


        if (category) {
            params.set(
                "category",
                category
            );
        }


        const queryString =
            params.toString();


        if (queryString) {

            navigate(
                `/internships?${queryString}`
            );

        } else {

            navigate("/internships");

        }

    }


    function handleKeyDown(event) {

        if (event.key === "Enter") {
            handleSearch();
        }

    }


    return (

        <section className="relative -mt-8 z-10 px-6">

            <div className="max-w-4xl mx-auto bg-white border border-slate-200 shadow-md rounded-xl p-4">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">


                    {/* TITLE SEARCH */}

                    <div className="relative">

                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">

                            <Search size={14} />

                        </div>


                        <input
                            type="text"
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                            onKeyDown={handleKeyDown}
                            placeholder="Title e.g. Frontend"
                            className="block w-full pl-9 pr-3 py-2 border border-slate-200 bg-slate-50/50 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all font-medium"
                        />

                    </div>


                    {/* LOCATION SEARCH */}

                    <div className="relative">

                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">

                            <MapPin size={14} />

                        </div>


                        <input
                            type="text"
                            value={location}
                            onChange={(event) =>
                                setLocation(event.target.value)
                            }
                            onKeyDown={handleKeyDown}
                            placeholder="Location e.g. Mumbai"
                            className="block w-full pl-9 pr-3 py-2 border border-slate-200 bg-slate-50/50 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all font-medium"
                        />

                    </div>


                    {/* CATEGORY */}

                    <div className="relative">

                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">

                            <Grid size={14} />

                        </div>


                        <select
                            value={category}
                            onChange={(event) =>
                                setCategory(event.target.value)
                            }
                            className="block w-full pl-9 pr-3 py-2 border border-slate-200 bg-slate-50/50 rounded-lg text-xs text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all cursor-pointer font-medium"
                        >

                            <option value="">
                                All Categories
                            </option>

                            <option value="Software Engineering">
                                Software Engineering
                            </option>

                            <option value="Product Design">
                                Product Design
                            </option>

                            <option value="Data Science">
                                Data Science
                            </option>

                            <option value="Marketing">
                                Marketing
                            </option>

                        </select>

                    </div>


                    {/* SEARCH BUTTON */}

                    <button
                        onClick={handleSearch}
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