import Sidebar from "../components/dashboard/Sidebar";
import TopNavbar from "../components/dashboard/TopNavbar";

function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-slate-50 text-slate-600">
            {/* Left navigation sidebar */}
            <Sidebar />

            {/* Main content viewport */}
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <TopNavbar />
                <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto space-y-5">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;