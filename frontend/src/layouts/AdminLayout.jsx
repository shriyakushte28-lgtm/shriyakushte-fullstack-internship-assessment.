import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopNavbar from "../components/admin/AdminTopNavbar";

function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-slate-50 text-slate-600">
            {/* Left admin navigation sidebar */}
            <AdminSidebar />

            {/* Main console viewport */}
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <AdminTopNavbar />
                <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto space-y-5">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;