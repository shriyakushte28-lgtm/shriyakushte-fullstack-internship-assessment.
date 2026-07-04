import { useState } from "react";
import {
    Mail,
    MapPin,
    Clock,
    Send,
    MessageSquare,
    HelpCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import PublicLayout from "../../layouts/PublicLayout";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [submitting, setSubmitting] = useState(false);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.subject.trim() ||
            !formData.message.trim()
        ) {
            toast.error("Please complete all fields.");
            return;
        }

        setSubmitting(true);

        try {
            // Backend contact API will be connected next.
            await new Promise((resolve) => setTimeout(resolve, 600));

            toast.success("Your message is ready to be submitted.");

            setFormData({
                name: "",
                email: "",
                subject: "",
                message: ""
            });

        } catch (error) {
            console.error(error);
            toast.error("Unable to process your message.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <PublicLayout>

            {/* Header */}
            <section className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-14 md:py-16">

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                        Contact Support
                    </span>

                    <h1 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                        How can we help?
                    </h1>

                    <p className="mt-4 text-sm text-slate-500 leading-6 max-w-2xl">
                        Have a question about your profile, internship applications,
                        resume upload, or portal features? Send us a message and the
                        support team can review your request.
                    </p>

                </div>
            </section>


            {/* Main Content */}
            <section className="max-w-7xl mx-auto px-6 py-12">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Contact Information */}
                    <div className="space-y-4">

                        <div className="bg-white border border-slate-200 rounded-xl p-5">

                            <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Mail size={17} />
                            </div>

                            <h3 className="mt-4 text-sm font-bold text-slate-900">
                                Email Support
                            </h3>

                            <p className="mt-2 text-xs text-slate-500 leading-5">
                                Send questions about portal usage, applications,
                                profiles, or technical issues.
                            </p>

                            <p className="mt-3 text-xs font-semibold text-slate-700">
                                support@internsphere.com
                            </p>

                        </div>


                        <div className="bg-white border border-slate-200 rounded-xl p-5">

                            <div className="h-9 w-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                                <MapPin size={17} />
                            </div>

                            <h3 className="mt-4 text-sm font-bold text-slate-900">
                                Location
                            </h3>

                            <p className="mt-2 text-xs text-slate-500">
                                Mumbai, Maharashtra, India
                            </p>

                        </div>


                        <div className="bg-white border border-slate-200 rounded-xl p-5">

                            <div className="h-9 w-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                                <Clock size={17} />
                            </div>

                            <h3 className="mt-4 text-sm font-bold text-slate-900">
                                Support Information
                            </h3>

                            <p className="mt-2 text-xs text-slate-500 leading-5">
                                For quick answers to common questions, visit the
                                Help Center before sending a support request.
                            </p>

                            <Link
                                to="/support"
                                className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-blue-600 hover:text-blue-700"
                            >
                                <HelpCircle size={13} />
                                Visit Help Center
                            </Link>

                        </div>

                    </div>


                    {/* Contact Form */}
                    <div className="lg:col-span-2">

                        <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8">

                            <div className="flex items-center gap-3 mb-6">

                                <div className="h-10 w-10 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                                    <MessageSquare size={18} />
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">
                                        Send a Message
                                    </h2>

                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Describe your question or issue clearly.
                                    </p>
                                </div>

                            </div>


                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                        />
                                    </div>


                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                        />
                                    </div>

                                </div>


                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                        Subject
                                    </label>

                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="What do you need help with?"
                                        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                                    />
                                </div>


                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                        Message
                                    </label>

                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="7"
                                        placeholder="Describe your question or issue..."
                                        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
                                    />
                                </div>


                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="btn-primary py-2.5 px-4 text-xs inline-flex items-center gap-2 disabled:opacity-50"
                                >
                                    <Send size={14} />

                                    {submitting
                                        ? "Processing..."
                                        : "Send Message"}
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </section>

        </PublicLayout>
    );
}

export default Contact;