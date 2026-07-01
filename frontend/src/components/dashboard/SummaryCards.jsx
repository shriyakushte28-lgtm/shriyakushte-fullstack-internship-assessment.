import { useEffect, useState } from "react";
import { getApplicationSummary } from "../../services/dashboardService";

function SummaryCards() {

    const userId = Number(localStorage.getItem("userId"));

    const [summary, setSummary] = useState({

        applied: 0,
        pending: 0,
        shortlisted: 0,
        accepted: 0

    });

    useEffect(() => {

        loadSummary();

    }, []);

    async function loadSummary() {

        try {

            const response = await getApplicationSummary(userId);

            setSummary(response.data);

        }

        catch (error) {

            console.log(error);

        }

    }

    return (

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 my-8">

            <div className="bg-white rounded-2xl shadow p-6">

                <h3 className="text-gray-500">

                    Applied

                </h3>

                <p className="text-4xl font-bold mt-3">

                    {summary.applied}

                </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

                <h3 className="text-gray-500">

                    Pending

                </h3>

                <p className="text-4xl font-bold mt-3">

                    {summary.pending}

                </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

                <h3 className="text-gray-500">

                    Shortlisted

                </h3>

                <p className="text-4xl font-bold mt-3">

                    {summary.shortlisted}

                </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

                <h3 className="text-gray-500">

                    Accepted

                </h3>

                <p className="text-4xl font-bold mt-3">

                    {summary.accepted}

                </p>

            </div>

        </div>

    );

}

export default SummaryCards;