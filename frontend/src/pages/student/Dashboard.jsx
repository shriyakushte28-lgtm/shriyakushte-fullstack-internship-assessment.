import DashboardLayout from "../../layouts/DashboardLayout";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import SummaryCards from "../../components/dashboard/SummaryCards";
import RecommendedInternships from "../../components/dashboard/RecommendedInternships";
import LatestInternships from "../../components/dashboard/LatestInternships";
import RecentApplications from "../../components/dashboard/RecentApplications";
import ProfileCompletion from "../../components/dashboard/ProfileCompletion";
import QuickActions from "../../components/dashboard/QuickActions";

function Dashboard() {
    return (
        <DashboardLayout>
            <div className="space-y-4">
                {/* Header Welcome Banner */}
                <WelcomeBanner />

                {/* KPI Metrics Dashboard Grid */}
                <SummaryCards />

                {/* Primary Dashboard Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                    {/* Left Column: Recommendations & Applications */}
                    <div className="lg:col-span-2 space-y-4">
                        <RecommendedInternships />
                        <RecentApplications />
                    </div>

                    {/* Right Column: Profile Completion, Actions, and Latest Openings */}
                    <div className="space-y-4">
                        <ProfileCompletion />
                        <QuickActions />
                        <LatestInternships />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Dashboard;