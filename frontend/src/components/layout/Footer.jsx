import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs">

            <div className="max-w-7xl mx-auto px-6 py-12">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand */}
                    <div>

                        <Link
                            to="/"
                            className="flex items-center gap-2 w-fit"
                        >
                            <img
                                src="/logo.png"
                                alt="InternSphere"
                                className="h-10 w-10"
                            />

                            <span className="text-sm font-bold text-white tracking-tight">
                                InternSphere
                            </span>
                        </Link>

                        <p className="mt-4 text-slate-400 leading-relaxed">
                            A Student Internship Portal designed to help students
                            discover opportunities, apply for internships, and
                            track their application journey.
                        </p>

                    </div>


                    {/* Platform */}
                    <div>

                        <h3 className="text-white font-bold uppercase tracking-wider mb-3">
                            Platform
                        </h3>

                        <ul className="space-y-2">

                            <li>
                                <Link
                                    to="/internships"
                                    className="hover:text-white transition-colors"
                                >
                                    Find Internships
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/about"
                                    className="hover:text-white transition-colors"
                                >
                                    About InternSphere
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/support"
                                    className="hover:text-white transition-colors"
                                >
                                    Portal FAQs
                                </Link>
                            </li>

                        </ul>

                    </div>


                    {/* Help */}
                    <div>

                        <h3 className="text-white font-bold uppercase tracking-wider mb-3">
                            Help & Support
                        </h3>

                        <ul className="space-y-2">

                            <li>
                                <Link
                                    to="/contact"
                                    className="hover:text-white transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/support"
                                    className="hover:text-white transition-colors"
                                >
                                    Help Center
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/login"
                                    className="hover:text-white transition-colors"
                                >
                                    Student Login
                                </Link>
                            </li>

                        </ul>

                    </div>


                    {/* Contact */}
                    <div>

                        <h3 className="text-white font-bold uppercase tracking-wider mb-3">
                            Contact
                        </h3>

                        <p className="leading-relaxed">
                            support@internsphere.com
                            <br />
                            Mumbai, India
                        </p>

                        <Link
                            to="/contact"
                            className="inline-block mt-3 text-slate-300 hover:text-white transition-colors"
                        >
                            Send us a message →
                        </Link>

                    </div>

                </div>


                {/* Bottom Footer */}
                <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500">

                    <p>
                        © 2026 InternSphere Portal. All Rights Reserved.
                    </p>

                    <div className="flex gap-4">

                        <Link
                            to="/about"
                            className="hover:text-slate-300 transition-colors"
                        >
                            About
                        </Link>

                        <Link
                            to="/contact"
                            className="hover:text-slate-300 transition-colors"
                        >
                            Contact
                        </Link>

                        <Link
                            to="/support"
                            className="hover:text-slate-300 transition-colors"
                        >
                            Support
                        </Link>

                    </div>

                </div>

            </div>

        </footer>
    );
}

export default Footer;