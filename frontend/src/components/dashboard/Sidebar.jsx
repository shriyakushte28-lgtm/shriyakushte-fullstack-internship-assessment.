import { Link } from "react-router-dom";

function Sidebar() {

    return (

        <aside className="w-72 bg-white shadow-xl">

            <div className="text-3xl font-bold text-blue-600 p-8">

                InternSphere

            </div>

            <nav className="px-6 space-y-3">

                <Link className="block p-3 rounded-xl hover:bg-blue-100" to="/dashboard">
                    Dashboard
                </Link>

                <Link className="block p-3 rounded-xl hover:bg-blue-100" to="/internships">
                    Browse Internships
                </Link>

                <Link className="block p-3 rounded-xl hover:bg-blue-100" to="/applications">
                    My Applications
                </Link>

                <Link className="block p-3 rounded-xl hover:bg-blue-100" to="/profile">
                    Profile
                </Link>

                <Link className="block p-3 rounded-xl hover:bg-blue-100" to="/internships">
                    Settings
                </Link>

                <Link className="block p-3 rounded-xl hover:bg-red-100 text-red-600" to="/">
                    Logout
                </Link>

            </nav>

        </aside>

    );

}

export default Sidebar;