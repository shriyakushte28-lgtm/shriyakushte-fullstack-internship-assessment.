import { useEffect, useState } from "react";
import { getStatistics } from "../../services/adminService";

function Card({ title, value }) {
    return (
        <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-gray-500">{title}</h3>

            <h2 className="text-4xl font-bold mt-3">
                {value}
            </h2>
        </div>
    );
}

function StatisticsCards() {

    const [stats, setStats] = useState({
        students: 0,
        internships: 0,
        applications: 0,
        openInternships: 0
    });

    useEffect(() => {

        loadStatistics();

    }, []);

    async function loadStatistics() {

        try {

            const response = await getStatistics();

            setStats(response.data);

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <Card title="Students" value={stats.students} />

            <Card title="Internships" value={stats.internships} />

            <Card title="Applications" value={stats.applications} />

            <Card title="Open Internships" value={stats.openInternships} />

        </div>

    );

}

export default StatisticsCards;