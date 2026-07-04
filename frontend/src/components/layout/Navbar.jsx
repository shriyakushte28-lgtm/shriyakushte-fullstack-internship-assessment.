import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                {/* Brand Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img
    src="/logo.png"
    alt="InternSphere"
    className="h-10 w-10"
/>
                    <span className="text-sm font-bold tracking-tight text-slate-900">
                        InternSphere
                    </span>
                </Link>

                {/* Nav Links */}
                <ul className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-500">
                    <li>
                        <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
                    </li>
                    <li>
                        <Link to="/" className="hover:text-slate-900 transition-colors">Browse Internships</Link>
                    </li>
                    <li>
                        <Link to="/" className="hover:text-slate-900 transition-colors">About Portal</Link>
                    </li>
                    <li>
                        <Link to="/" className="hover:text-slate-900 transition-colors">Contact Support</Link>
                    </li>
                </ul>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Link
                        to="/login"
                        className="btn-secondary py-1.5 px-3 text-xs"
                    >
                        Sign in
                    </Link>

                    <Link
                        to="/register"
                        className="btn-primary py-1.5 px-3 text-xs"
                    >
                        Create Account
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;