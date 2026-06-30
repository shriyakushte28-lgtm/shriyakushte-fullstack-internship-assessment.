import AdminLayout from "../../layouts/AdminLayout";
import StatisticsCards from "../../components/admin/StatisticsCards";

function Dashboard() {

    return (

        <AdminLayout>

            <h1 className="text-4xl font-bold mb-8">

                Dashboard

            </h1>

            <StatisticsCards />

        </AdminLayout>

    );

}

export default Dashboard;