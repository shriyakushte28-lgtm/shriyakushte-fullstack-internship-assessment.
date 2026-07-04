function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center gap-2">
                            <img
    src="/logo.png"
    alt="InternSphere"
    className="h-10 w-10"
/>
                            <span className="text-sm font-bold text-white tracking-tight">
                                InternSphere
                            </span>
                        </div>
                        <p className="mt-4 text-slate-400 leading-relaxed">
                            A production-ready Student Internship Portal designed to connect matching skillsets with active opportunities.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-bold uppercase tracking-wider mb-3">Platform</h3>
                        <ul className="space-y-2">
                            <li><span className="hover:text-white transition-colors cursor-pointer">Find Internships</span></li>
                            <li><span className="hover:text-white transition-colors cursor-pointer">Post a Role</span></li>
                            <li><span className="hover:text-white transition-colors cursor-pointer">Portal FAQs</span></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold uppercase tracking-wider mb-3">Guidelines</h3>
                        <ul className="space-y-2">
                            <li><span className="hover:text-white transition-colors cursor-pointer">Privacy Charter</span></li>
                            <li><span className="hover:text-white transition-colors cursor-pointer">Platform Terms</span></li>
                            <li><span className="hover:text-white transition-colors cursor-pointer">Security Center</span></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold uppercase tracking-wider mb-3">Office Info</h3>
                        <p className="leading-relaxed">
                            support@internsphere.com<br />
                            Mumbai, India
                        </p>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500">
                    <p>© 2026 InternSphere Portal. All Rights Reserved.</p>
                    <p className="flex gap-4">
                        <span className="hover:text-slate-400 transition-colors cursor-pointer">Terms</span>
                        <span className="hover:text-slate-400 transition-colors cursor-pointer">Privacy</span>
                        <span className="hover:text-slate-400 transition-colors cursor-pointer">System Status</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;