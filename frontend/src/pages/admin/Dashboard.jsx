import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import StatisticsCards from "../../components/admin/StatisticsCards";
import RecentApplications from "../../components/admin/RecentApplications";
import RecentStudents from "../../components/admin/RecentStudents";
import LatestInternships from "../../components/admin/LatestInternships";
import { getAnalytics, getDashboardData } from "../../services/adminService";
import ApplicationStatusChart from "../../components/admin/ApplicationStatusChart";
import MonthlyApplicationsChart from "../../components/admin/MonthlyApplicationsChart";
import PlatformInsights from "../../components/admin/PlatformInsights";
import AdminWelcomeBanner from "../../components/admin/AdminWelcomeBanner";
import QuickActions from "../../components/admin/QuickActions";
import RecentActivity from "../../components/admin/RecentActivity";

function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    async function loadDashboardData() {
        try {
            setLoading(true);
            const [dashRes, analyticsRes] = await Promise.all([
                getDashboardData(),
                getAnalytics()
            ]);
            setDashboard(dashRes.data);
            setAnalytics(analyticsRes.data);
        } catch (error) {
            console.error("Failed to load admin dashboard datasets", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading || !dashboard || !analytics) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-sm font-semibold text-slate-500 animate-pulse">
                        Loading admin dashboard datasets...
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-4">
                {/* Admin Header */}
                <AdminWelcomeBanner />

                {/* Dashboard Metrics */}
                <StatisticsCards dashboard={dashboard} />

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <ApplicationStatusChart data={analytics.statusChart} />
                    <MonthlyApplicationsChart data={analytics.monthlyApplications} />
                </div>

                {/* KPI Metrics */}
                <PlatformInsights analytics={analytics} />

                {/* Recent tables row split */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <RecentApplications applications={dashboard.recentApplications} />
                    <RecentStudents students={dashboard.recentStudents} />
                </div>

                {/* Latest postings details list */}
                <LatestInternships internships={dashboard.latestInternships} />

                {/* Recent activity & quick shortcuts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <RecentActivity dashboard={dashboard} />
                    <QuickActions />
                </div>
            </div>
        </AdminLayout>
    );
}

export default Dashboard;