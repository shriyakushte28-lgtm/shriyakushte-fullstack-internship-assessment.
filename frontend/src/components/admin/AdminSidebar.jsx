import {
    LayoutDashboard,
    Briefcase,
    FileText,
    Users,
    User,
    Settings,
    LogOut
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function AdminSidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const menu = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin/dashboard"
    },
    {
        title: "Manage Internships",
        icon: Briefcase,
        path: "/admin/internships"
    },
    {
        title: "Manage Applications",
        icon: FileText,
        path: "/admin/applications"
    },
    {
        title: "Manage Students",
        icon: Users,
        path: "/admin/students"
    },
    {
        title: "Admin Profile",
        icon: User,
        path: "/admin/profile"
    },
    {
        title: "Admin Settings",
        icon: Settings,
        path: "/admin/settings"
    }
];

    function handleLogout() {
        localStorage.clear();
        navigate("/admin/login");
    }

    return (
        <aside className="w-60 bg-slate-900 text-slate-400 flex flex-col justify-between border-r border-slate-800 shrink-0 h-screen sticky top-0">
            <div>
                {/* Brand Header */}
                <div className="px-5 py-5 border-b border-slate-800 flex items-center gap-2">
                    <div className="h-7 w-7 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        I
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-white tracking-tight leading-none">
                            InternSphere
                        </h1>
                        <p className="text-[9px] text-emerald-500 mt-1 uppercase font-semibold tracking-wider">
                            Admin Console
                        </p>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="mt-4 px-2 space-y-0.5">
                    {menu.map(item => {
                        const Icon = item.icon;
                        const active = location.pathname === item.path || (item.path !== "/admin/dashboard" && location.pathname.startsWith(item.path));

                        return (
                            <Link
                                key={item.title}
                                to={item.path}
                                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-150 group
                                ${active
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
                                }`}
                            >
                                <Icon size={16} className={`shrink-0 transition-colors ${active ? "text-white" : "text-slate-500 group-hover:text-slate-350"}`} />
                                <span>{item.title}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Logout Footer */}
            <div className="p-2.5 border-t border-slate-800">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg text-slate-500 hover:bg-red-950/20 hover:text-red-400 transition-all duration-150 cursor-pointer"
                >
                    <LogOut size={16} className="shrink-0" />
                    <span>Log out</span>
                </button>
            </div>
        </aside>
    );
}

export default AdminSidebar;