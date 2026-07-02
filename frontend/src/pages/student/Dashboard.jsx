import DashboardLayout from "../../layouts/DashboardLayout";

import WelcomeBanner from "../../components/dashboard/WelcomeBanner";

import SummaryCards from "../../components/dashboard/SummaryCards";

import QuickActions from "../../components/dashboard/QuickActions";

import LatestInternships from "../../components/dashboard/LatestInternships";

import RecentApplications from "../../components/dashboard/RecentApplications";

import ProfileCompletion from "../../components/dashboard/ProfileCompletion";

import Notifications from "../../components/dashboard/Notifications";

import NotificationBell from "../../components/dashboard/NotificationBell";

import RecommendedInternships from "../../components/dashboard/RecommendedInternships";



function Dashboard() {

    return (

        <DashboardLayout>

            <WelcomeBanner />

            <SummaryCards />

            <div className="grid lg:grid-cols-2 gap-8">

                <LatestInternships />

                <ProfileCompletion />

            </div>

            <RecommendedInternships />

            <RecentApplications />

            <Notifications />

            <QuickActions />

        </DashboardLayout>

    );

}

export default Dashboard;