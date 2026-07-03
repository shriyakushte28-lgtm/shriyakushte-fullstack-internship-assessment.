import { Link } from "react-router-dom";
import { SearchX, Home } from "lucide-react";

function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">

            <div className="max-w-md text-center">

                <div className="flex justify-center mb-6">
                    <div className="h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center">
                        <SearchX
                            size={46}
                            className="text-slate-400"
                        />
                    </div>
                </div>

                <h1 className="text-6xl font-bold text-slate-900">
                    404
                </h1>

                <h2 className="mt-4 text-2xl font-semibold text-slate-800">
                    Page Not Found
                </h2>

                <p className="mt-3 text-slate-500">
                    Sorry, the page you're looking for doesn't exist
                    or may have been moved.
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 mt-8 btn-primary px-5 py-2.5"
                >
                    <Home size={18} />
                    <span>Back to Home</span>
                </Link>

            </div>

        </div>
    );
}

export default NotFound;