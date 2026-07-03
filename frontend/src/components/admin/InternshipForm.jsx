import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

function InternshipForm({ internship, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        title: "",
        companyName: "",
        description: "",
        location: "",
        isRemote: false,
        stipend: "",
        durationMonths: "",
        skillsRequired: "",
        openings: "",
        deadline: "",
        status: "OPEN"
    });

    useEffect(() => {
        if (internship) {
            setFormData({
                title: internship.title || "",
                companyName: internship.companyName || "",
                description: internship.description || "",
                location: internship.location || "",
                isRemote: internship.isRemote || false,
                stipend: internship.stipend || "",
                durationMonths: internship.durationMonths || "",
                skillsRequired: internship.skillsRequired || "",
                openings: internship.openings || "",
                deadline: internship.deadline || "",
                status: internship.status || "OPEN"
            });
        }
    }, [internship]);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSave(formData);
    }

    return (
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 md:p-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-100 pb-3 mb-5">
                {internship ? "Modify Listing Details" : "Create New Posting"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                            Posting Title
                        </label>
                        <input
                            name="title"
                            required
                            placeholder="Frontend Engineer Intern"
                            value={formData.title}
                            onChange={handleChange}
                            className="block w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-950 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 text-sm transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                            Company Name
                        </label>
                        <input
                            name="companyName"
                            required
                            placeholder="Stripe"
                            value={formData.companyName}
                            onChange={handleChange}
                            className="block w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-950 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 text-sm transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                            Office Location
                        </label>
                        <input
                            name="location"
                            required
                            placeholder="Bangalore, IN"
                            value={formData.location}
                            onChange={handleChange}
                            className="block w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-950 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 text-sm transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                            Monthly Stipend (INR)
                        </label>
                        <input
                            type="number"
                            name="stipend"
                            required
                            placeholder="45000"
                            value={formData.stipend}
                            onChange={handleChange}
                            className="block w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-950 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 text-sm transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                            Duration (Months)
                        </label>
                        <input
                            type="number"
                            name="durationMonths"
                            required
                            placeholder="6"
                            value={formData.durationMonths}
                            onChange={handleChange}
                            className="block w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-950 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 text-sm transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                            Available Openings
                        </label>
                        <input
                            type="number"
                            name="openings"
                            required
                            placeholder="3"
                            value={formData.openings}
                            onChange={handleChange}
                            className="block w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-950 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 text-sm transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                            Application Deadline
                        </label>
                        <input
                            type="date"
                            name="deadline"
                            required
                            value={formData.deadline}
                            onChange={handleChange}
                            className="block w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-950 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 text-sm transition-all"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                        Skills Required (Comma separated)
                    </label>
                    <input
                        name="skillsRequired"
                        required
                        placeholder="React, Javascript, CSS, Tailwind"
                        value={formData.skillsRequired}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-950 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 text-sm transition-all"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                        Full Role Description
                    </label>
                    <textarea
                        name="description"
                        required
                        placeholder="Detailed role responsibility logs..."
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="block w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-950 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 text-sm transition-all"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                            Posting Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="block w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-650 focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 text-sm transition-all cursor-pointer"
                        >
                            <option value="OPEN">OPEN</option>
                            <option value="CLOSED">CLOSED</option>
                        </select>
                    </div>

                    <div className="flex items-center pt-6">
                        <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-zinc-700">
                            <input
                                type="checkbox"
                                name="isRemote"
                                checked={formData.isRemote}
                                onChange={handleChange}
                                className="h-4 w-4 text-zinc-900 focus:ring-zinc-900 border-zinc-300 rounded"
                            />
                            <span>Remote Working Option</span>
                        </label>
                    </div>
                </div>

                <div className="pt-5 border-t border-zinc-100 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="inline-flex items-center gap-1.5 py-2 px-4 border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-semibold text-zinc-700 hover:text-zinc-950 rounded-lg shadow-sm transition-all cursor-pointer"
                    >
                        <X size={14} />
                        <span>Cancel</span>
                    </button>
                    <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 py-2 px-4 border border-transparent rounded-lg text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 transition-all shadow-sm cursor-pointer"
                    >
                        <Check size={14} />
                        <span>Save Posting</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default InternshipForm;