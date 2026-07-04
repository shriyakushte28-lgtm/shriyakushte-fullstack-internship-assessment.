import {
    Briefcase,
    Search,
    FileText,
    Bell,
    ShieldCheck,
    Target,
    Users,
    ArrowRight
} from "lucide-react";

import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

function About() {
    const features = [
        {
            icon: Search,
            title: "Discover Opportunities",
            description:
                "Browse and filter internship opportunities based on role, location, skills, and other preferences."
        },
        {
            icon: FileText,
            title: "Simple Applications",
            description:
                "Maintain your student profile, upload your resume, and submit internship applications through one portal."
        },
        {
            icon: Target,
            title: "Skill Match Insights",
            description:
                "Compare your profile skills with internship requirements through compatibility scores."
        },
        {
            icon: Bell,
            title: "Application Updates",
            description:
                "Receive in-app and email notifications when the status of an application changes."
        },
        {
            icon: Briefcase,
            title: "Application Tracking",
            description:
                "Track pending, shortlisted, accepted, and rejected applications from a centralized dashboard."
        },
        {
            icon: ShieldCheck,
            title: "Role-Based Access",
            description:
                "Separate student and administrator workflows provide controlled access to portal features."
        }
    ];

    return (
        <PublicLayout>
            {/* Hero Section */}
            <section className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                            About the Platform
                        </span>

                        <h1 className="mt-5 text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                            Helping students discover and manage internship opportunities.
                        </h1>

                        <p className="mt-5 text-sm md:text-base text-slate-500 leading-7 max-w-2xl">
                            InternSphere is a Student Internship Portal that brings
                            internship discovery, profile management, applications,
                            status tracking, and notifications into one organized
                            platform.
                        </p>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <Link
                                to="/internships"
                                className="btn-primary py-2.5 px-4 text-xs inline-flex items-center gap-2"
                            >
                                Browse Internships
                                <ArrowRight size={14} />
                            </Link>

                            <Link
                                to="/register"
                                className="btn-secondary py-2.5 px-4 text-xs"
                            >
                                Create Student Account
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="max-w-7xl mx-auto px-6 py-14">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                            Our Purpose
                        </span>

                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                            A simpler internship journey for students.
                        </h2>

                        <p className="mt-4 text-sm text-slate-500 leading-7">
                            Internship opportunities are often spread across multiple
                            sources, while students also need to manage resumes,
                            application records, deadlines, and status updates.
                            InternSphere brings these activities together in a single
                            workflow.
                        </p>

                        <p className="mt-3 text-sm text-slate-500 leading-7">
                            Students can explore opportunities before creating an
                            account. After signing in, they can maintain a profile,
                            save internships, apply using their uploaded resume,
                            monitor application progress, and receive important
                            updates.
                        </p>
                    </div>

                    <div className="bg-slate-900 rounded-2xl p-7 md:p-9 text-white">
                        <div className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center">
                            <Users size={21} />
                        </div>

                        <h3 className="mt-5 text-xl font-bold">
                            Built around the student workflow
                        </h3>

                        <p className="mt-3 text-sm text-slate-300 leading-6">
                            From finding an internship to receiving an application
                            decision, the portal keeps the main stages of the process
                            connected and easy to track.
                        </p>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <div className="border border-slate-700 rounded-xl p-4">
                                <p className="text-lg font-bold">Search</p>
                                <p className="text-[11px] text-slate-400 mt-1">
                                    Discover relevant roles
                                </p>
                            </div>

                            <div className="border border-slate-700 rounded-xl p-4">
                                <p className="text-lg font-bold">Track</p>
                                <p className="text-[11px] text-slate-400 mt-1">
                                    Follow application progress
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-14">
                    <div className="max-w-2xl">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                            Platform Capabilities
                        </span>

                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                            Everything needed to manage the internship process.
                        </h2>

                        <p className="mt-3 text-sm text-slate-500 leading-6">
                            InternSphere combines public internship discovery with
                            student and administrator workflows.
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-sm transition-all"
                                >
                                    <div className="h-9 w-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                                        <Icon size={17} />
                                    </div>

                                    <h3 className="mt-4 text-sm font-bold text-slate-900">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-2 text-xs text-slate-500 leading-5">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-6 py-14">
                <div className="bg-blue-600 rounded-2xl px-6 py-10 md:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-white">
                            Ready to explore internship opportunities?
                        </h2>

                        <p className="mt-2 text-sm text-blue-100">
                            Browse available roles freely and create an account when
                            you're ready to apply.
                        </p>
                    </div>

                    <Link
                        to="/internships"
                        className="bg-white text-blue-700 hover:bg-blue-50 transition-colors rounded-lg px-4 py-2.5 text-xs font-bold inline-flex items-center justify-center gap-2 shrink-0"
                    >
                        Explore Internships
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
}

export default About;