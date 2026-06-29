import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        <h2 className="text-2xl font-bold text-blue-600">
          InternSphere
        </h2>

        <ul className="flex gap-8 text-gray-700 font-medium">

          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/">Internships</Link>
          </li>

          <li>
            <Link to="/">About</Link>
          </li>

          <li>
            <Link to="/">Contact</Link>
          </li>

        </ul>

        <div className="flex gap-3">

          <Link
            to="/login"
            className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;