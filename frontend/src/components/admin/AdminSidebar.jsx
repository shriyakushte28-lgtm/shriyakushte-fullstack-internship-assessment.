import { Link } from "react-router-dom";

function AdminSidebar() {

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
                    to="/"
                    className="block p-3 rounded-xl hover:bg-red-600"
                >
                    Logout
                </Link>

            </nav>

        </aside>

    );

}

export default AdminSidebar;