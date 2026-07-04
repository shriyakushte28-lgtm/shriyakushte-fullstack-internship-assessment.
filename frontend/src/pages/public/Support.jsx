import { useMemo, useState } from "react";
import {
    Search,
    ChevronDown,
    ChevronUp,
    HelpCircle,
    UserPlus,
    FileText,
    Briefcase,
    Bell,
    Bookmark,
    MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";

import PublicLayout from "../../layouts/PublicLayout";

function Support() {
    const [searchTerm, setSearchTerm] = useState("");
    const [openQuestion, setOpenQuestion] = useState(null);

    const faqs = [
        {
            category: "Account",
            icon: UserPlus,
            question: "How do I create a student account?",
            answer:
                "Click Create Account from the navigation bar, enter your full name, email address, and password, then submit the registration form. After successful registration, you can sign in and access the student dashboard."
        },
        {
            category: "Account",
            icon: UserPlus,
            question: "What should I do after creating my account?",
            answer:
                "After signing in, complete your student profile with your college, degree, graduation year, skills, bio, and other relevant information. You should also upload your resume before applying for internships."
        },
        {
            category: "Resume",
            icon: FileText,
            question: "How do I upload my resume?",
            answer:
                "Sign in to your student account and open your profile or resume section. Select your resume file and upload it. Once uploaded successfully, the resume can be used while submitting internship applications."
        },
        {
            category: "Resume",
            icon: FileText,
            question: "Why is my resume upload failing?",
            answer:
                "Check that you are signed in with the correct student account, that your student profile exists, and that the selected file meets the portal's file size requirements. If the issue continues, contact support with the error details."
        },
        {
            category: "Internships",
            icon: Briefcase,
            question: "Can I browse internships without creating an account?",
            answer:
                "Yes. Internship listings and their details can be viewed publicly. However, you need to register and sign in with a student account before submitting an application or using student-specific features."
        },
        {
            category: "Internships",
            icon: Briefcase,
            question: "How do I search for internships?",
            answer:
                "Open the Browse Internships page and use the available search and filter options. You can review matching listings and open an internship card to view complete details."
        },
        {
            category: "Applications",
            icon: Briefcase,
            question: "How do I apply for an internship?",
            answer:
                "Sign in, open an internship listing, review its details, and submit your application using the Apply option. Make sure your student profile and resume information are ready before applying."
        },
        {
            category: "Applications",
            icon: Briefcase,
            question: "Can I apply to the same internship twice?",
            answer:
                "No. InternSphere prevents duplicate applications for the same internship. You can track the existing application from the My Applications section."
        },
        {
            category: "Applications",
            icon: Briefcase,
            question: "What do the application statuses mean?",
            answer:
                "Pending means the application is awaiting review. Shortlisted means you have progressed to the next stage. Accepted means the application was approved, while Rejected means the application was not selected."
        },
        {
            category: "Saved Internships",
            icon: Bookmark,
            question: "How do saved internships work?",
            answer:
                "When signed in, you can bookmark internship opportunities for later. Saved listings appear in the Saved Internships section, where you can review them, open their details, or remove them from your saved list."
        },
        {
            category: "Notifications",
            icon: Bell,
            question: "When will I receive notifications?",
            answer:
                "The portal creates application-related notifications when important status updates occur. Depending on the event, email notifications may also be sent to the email address associated with your account."
        },
        {
            category: "Notifications",
            icon: Bell,
            question: "Why did I not receive an email notification?",
            answer:
                "First check your spam or junk folder and confirm that the email address registered with your account is correct. Email delivery can also be delayed by the email provider. If the issue continues, contact support."
        }
    ];

    const filteredFaqs = useMemo(() => {
        const search = searchTerm.trim().toLowerCase();

        if (!search) {
            return faqs;
        }

        return faqs.filter((faq) =>
            faq.question.toLowerCase().includes(search) ||
            faq.answer.toLowerCase().includes(search) ||
            faq.category.toLowerCase().includes(search)
        );
    }, [searchTerm]);

    function toggleQuestion(index) {
        setOpenQuestion(
            openQuestion === index ? null : index
        );
    }

    return (
        <PublicLayout>

            {/* Hero */}
            <section className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-14 md:py-16 text-center">

                    <div className="h-11 w-11 mx-auto rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <HelpCircle size={21} />
                    </div>

                    <h1 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                        How can we help you?
                    </h1>

                    <p className="mt-3 text-sm text-slate-500 max-w-xl mx-auto leading-6">
                        Find answers about student accounts, resumes,
                        internship applications, saved opportunities,
                        application tracking, and notifications.
                    </p>

                    {/* Search */}
                    <div className="relative max-w-xl mx-auto mt-7">

                        <Search
                            size={17}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                            placeholder="Search help topics..."
                            className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                        />

                    </div>

                </div>
            </section>


            {/* Quick Topics */}
            <section className="max-w-5xl mx-auto px-6 py-10">

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                    <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                        <UserPlus
                            size={18}
                            className="mx-auto text-slate-600"
                        />

                        <p className="mt-2 text-xs font-bold text-slate-900">
                            Accounts
                        </p>
                    </div>


                    <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                        <FileText
                            size={18}
                            className="mx-auto text-slate-600"
                        />

                        <p className="mt-2 text-xs font-bold text-slate-900">
                            Resume
                        </p>
                    </div>


                    <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                        <Briefcase
                            size={18}
                            className="mx-auto text-slate-600"
                        />

                        <p className="mt-2 text-xs font-bold text-slate-900">
                            Applications
                        </p>
                    </div>


                    <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                        <Bell
                            size={18}
                            className="mx-auto text-slate-600"
                        />

                        <p className="mt-2 text-xs font-bold text-slate-900">
                            Notifications
                        </p>
                    </div>

                </div>

            </section>


            {/* FAQ */}
            <section className="max-w-3xl mx-auto px-6 pb-14">

                <div className="mb-5">
                    <h2 className="text-xl font-bold text-slate-900">
                        Frequently Asked Questions
                    </h2>

                    <p className="text-xs text-slate-500 mt-1">
                        Select a question to view the answer.
                    </p>
                </div>


                {filteredFaqs.length === 0 ? (

                    <div className="bg-white border border-dashed border-slate-300 rounded-xl py-10 text-center">

                        <Search
                            size={28}
                            className="mx-auto text-slate-300"
                        />

                        <h3 className="mt-3 text-sm font-bold text-slate-900">
                            No matching help topics
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                            Try using different keywords or contact support.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-2.5">

                        {filteredFaqs.map((faq, index) => {
                            const Icon = faq.icon;

                            return (
                                <div
                                    key={`${faq.question}-${index}`}
                                    className="bg-white border border-slate-200 rounded-xl overflow-hidden"
                                >

                                    <button
                                        onClick={() =>
                                            toggleQuestion(index)
                                        }
                                        className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-slate-50 transition-colors"
                                    >

                                        <div className="flex items-center gap-3">

                                            <div className="h-8 w-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                                                <Icon size={15} />
                                            </div>

                                            <div>
                                                <span className="text-[9px] uppercase tracking-wider font-bold text-blue-600">
                                                    {faq.category}
                                                </span>

                                                <h3 className="text-xs md:text-sm font-semibold text-slate-900 mt-0.5">
                                                    {faq.question}
                                                </h3>
                                            </div>

                                        </div>


                                        {openQuestion === index ? (
                                            <ChevronUp
                                                size={16}
                                                className="text-slate-400 shrink-0"
                                            />
                                        ) : (
                                            <ChevronDown
                                                size={16}
                                                className="text-slate-400 shrink-0"
                                            />
                                        )}

                                    </button>


                                    {openQuestion === index && (

                                        <div className="px-4 pb-4">

                                            <div className="ml-11 border-t border-slate-100 pt-3">

                                                <p className="text-xs text-slate-500 leading-6">
                                                    {faq.answer}
                                                </p>

                                            </div>

                                        </div>

                                    )}

                                </div>
                            );
                        })}

                    </div>

                )}

            </section>


            {/* Contact CTA */}
            <section className="max-w-5xl mx-auto px-6 pb-14">

                <div className="bg-slate-900 rounded-2xl p-7 md:p-9 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                    <div className="flex items-start gap-3">

                        <div className="h-10 w-10 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0">
                            <MessageCircle size={18} />
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-white">
                                Still need help?
                            </h2>

                            <p className="text-xs text-slate-400 mt-1 leading-5">
                                Send a support request with details about your
                                question or technical issue.
                            </p>
                        </div>

                    </div>


                    <Link
                        to="/contact"
                        className="bg-white text-slate-900 hover:bg-slate-100 transition-colors rounded-lg px-4 py-2.5 text-xs font-bold text-center shrink-0"
                    >
                        Contact Support
                    </Link>

                </div>

            </section>

        </PublicLayout>
    );
}

export default Support;