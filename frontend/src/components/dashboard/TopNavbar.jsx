import { Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import NotificationBell from "../dashboard/NotificationBell";

function TopNavbar() {
    const fullName = localStorage.getItem("fullName") || "Student User";
    const location = useLocation();

    // Generate dynamic page title based on path
    const getPageTitle = () => {
        const path = location.pathname;
        if (path === "/dashboard") return "Dashboard";
        if (path.startsWith("/internships")) return "Browse Internships";
        if (path.startsWith("/applications")) return "My Applications";
        if (path.startsWith("/saved")) return "Saved Internships";
        if (path.startsWith("/profile")) return "Student Profile";
        if (path.startsWith("/settings")) return "Settings";
        return "Portal";
    };

    return (
        <header className="bg-white border-b border-slate-200 h-14 px-5 flex items-center justify-between sticky top-0 z-40">
            {/* Left side: Breadcrumb / Page Title */}
            <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-medium">Portal</span>
                <span className="text-slate-350">/</span>
                <span className="text-slate-900 font-bold tracking-tight">
                    {getPageTitle()}
                </span>
            </div>

            {/* Right side: Actions & Profile */}
            <div className="flex items-center gap-4">
                {/* Search Bar Shortcut (Aesthetic) */}
                <div className="relative hidden md:block w-56">
                    <Search
                        size={13}
                        className="absolute left-2.5 top-2 text-slate-400"
                    />
                    <input
                        type="text"
                        placeholder="Search workspace..."
                        className="w-full pl-8 pr-2.5 py-1 rounded-md border border-slate-200 bg-slate-50/50 placeholder-slate-400 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                    />
                </div>

                {/* Notifications Bell */}
                <NotificationBell />

                <div className="h-3 w-px bg-slate-200"></div>

                {/* Profile Widget */}
                <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs uppercase shadow-sm">
                        {fullName.substring(0, 2)}
                    </div>
                    <div className="hidden sm:block text-left">
                        <h3 className="text-xs font-bold text-slate-900 leading-none">
                            {fullName}
                        </h3>
                        <span className="text-[9px] text-slate-500 font-medium">
                            Student Account
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default TopNavbar;