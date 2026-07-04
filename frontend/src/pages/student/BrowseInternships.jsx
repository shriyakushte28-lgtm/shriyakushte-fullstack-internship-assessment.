import { useEffect, useState } from "react";

import {
    useSearchParams
} from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import PublicLayout from "../../layouts/PublicLayout";

import InternshipCard from "../../components/cards/InternshipCard";

import {
    getAllInternships,
    filterInternships
} from "../../services/internshipService";

import InternshipFilters from "../../components/filters/InternshipFilters";

import { Briefcase } from "lucide-react";

import toast from "react-hot-toast";


function BrowseInternships() {

    const [internships, setInternships] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    const [searchParams] =
        useSearchParams();


    const token =
        localStorage.getItem("token");

    const role =
        localStorage.getItem("role");


    const isStudentLoggedIn =
        Boolean(token) &&
        role === "STUDENT";


    // ==========================================
    // LOAD FROM LANDING PAGE SEARCH
    // ==========================================

    useEffect(() => {

        const title =
            searchParams.get("title");

        const location =
            searchParams.get("location");

        const category =
            searchParams.get("category");


        const filters = {};


        if (title) {
            filters.title = title;
        }


        if (location) {
            filters.location = location;
        }


        if (category) {
            filters.category = category;
        }


        if (Object.keys(filters).length > 0) {

            searchInternships(filters);

        } else {

            loadInternships();

        }

    }, [searchParams]);


    // ==========================================
    // LOAD ALL INTERNSHIPS
    // ==========================================

    async function loadInternships() {

        try {

            setLoading(true);


            const response =
                await getAllInternships();


            setInternships(
                response.data
            );


        } catch (error) {

            console.error(
                "Failed to load internships",
                error
            );


            toast.error(
                "Unable to load internships. Please try again."
            );


        } finally {

            setLoading(false);

        }

    }


    // ==========================================
    // SEARCH
    // ==========================================

    async function searchInternships(filters) {

        try {

            setLoading(true);


            if (
                Object.keys(filters).length === 0
            ) {

                await loadInternships();

                return;

            }


            const response =
                await filterInternships(filters);


            setInternships(
                response.data
            );


        } catch (error) {

            console.error(
                "Failed to filter internships",
                error
            );


            toast.error(
                "Unable to search internships."
            );


        } finally {

            setLoading(false);

        }

    }


    // ==========================================
    // PAGE CONTENT
    // ==========================================

    const content = (

        <div
            className={
                isStudentLoggedIn
                    ? "space-y-4"
                    : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6"
            }
        >


            {/* HEADER */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">


                <div>

                    <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">


                        <Briefcase
                            size={18}
                            className="text-slate-700"
                        />


                        <span>
                            Browse Internships
                        </span>


                    </h1>


                    <p className="text-xs text-slate-500 mt-0.5">

                        Discover internship opportunities and find roles matching your skills.

                    </p>


                </div>


                {!loading && (

                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-lg shrink-0 w-fit">


                        {internships.length} Available{" "}


                        {internships.length === 1
                            ? "Role"
                            : "Roles"}


                    </div>

                )}


            </div>


            {/* GUEST MESSAGE */}

            {!isStudentLoggedIn && (

                <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">


                    <p className="text-sm text-blue-900 font-medium">

                        Browse all available internships freely.

                    </p>


                    <p className="text-xs text-blue-700 mt-1">

                        Create an account or sign in when you're ready to apply or save an internship.

                    </p>


                </div>

            )}


            {/* FILTERS */}

            <InternshipFilters
                onSearch={searchInternships}
            />


            {/* RESULTS */}

            {loading ? (


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">


                    {[...Array(6)].map(
                        (_, index) => (

                            <div
                                key={index}
                                className="h-48 border border-slate-200 bg-slate-100 animate-pulse rounded-xl"
                            />

                        )
                    )}


                </div>


            ) : internships.length === 0 ? (


                <div className="py-12 text-center border border-dashed border-slate-200 bg-white rounded-xl shadow-sm">


                    <div className="text-slate-300 mb-2.5 flex justify-center">

                        <Briefcase size={36} />

                    </div>


                    <h3 className="text-sm font-bold text-slate-900">

                        No positions found

                    </h3>


                    <p className="text-xs text-slate-400 mt-0.5">

                        Try modifying your search or clearing the filters.

                    </p>


                </div>


            ) : (


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">


                    {internships.map(
                        (job) => (

                            <InternshipCard
                                key={job.id}
                                internship={job}
                            />

                        )
                    )}


                </div>


            )}


        </div>

    );


    // ==========================================
    // LAYOUT
    // ==========================================

    if (isStudentLoggedIn) {

        return (

            <DashboardLayout>

                {content}

            </DashboardLayout>

        );

    }


    return (

        <PublicLayout>

            {content}

        </PublicLayout>

    );

}


export default BrowseInternships;