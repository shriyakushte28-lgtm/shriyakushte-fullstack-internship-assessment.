import { Link, useNavigate } from "react-router-dom";

function AdminSidebar() {

    const navigate = useNavigate();

    function logout() {

        if (window.confirm("Are you sure you want to logout?")) {

            localStorage.clear();

            navigate("/admin/login");

        }

    }

    return (

        <aside className="w-72 bg-slate-900 text-white shadow-xl">

            <div className="text-3xl font-bold text-center py-8">

                InternSphere Admin

            </div>

            <nav className="px-6 space-y-3">

                <Link
                    to="/admin/dashboard"
                    className="block p-3 rounded-xl hover:bg-slate-700"
                >
                    Dashboard
                </Link>

                <Link
                    to="/admin/internships"
                    className="block p-3 rounded-xl hover:bg-slate-700"
                >
                    Manage Internships
                </Link>

                <Link
                    to="/admin/applications"
                    className="block p-3 rounded-xl hover:bg-slate-700"
                >
                    Manage Applications
                </Link>

                <Link
                    to="/admin/students"
                    className="block p-3 rounded-xl hover:bg-slate-700"
                >
                    Manage Students
                </Link>

                <button
                    onClick={logout}
                    className="w-full text-left p-3 rounded-xl hover:bg-red-600"
                >
                    Logout
                </button>

            </nav>

        </aside>

    );

}

export default AdminSidebar;