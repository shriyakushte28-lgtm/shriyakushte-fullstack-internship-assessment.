import { useEffect, useState } from "react";

function InternshipForm({

    internship,
    onSave,
    onCancel

}) {

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

            [name]:

                type === "checkbox"

                    ? checked

                    : value

        });

    }

    function handleSubmit(e) {

        e.preventDefault();

        onSave(formData);

    }

    return (

        <div className="bg-white rounded-2xl shadow p-8 mb-8">

            <h2 className="text-2xl font-bold mb-6">

                {internship ? "Edit Internship" : "Add Internship"}

            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 gap-5"
            >

                <input
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                />

                <input
                    name="companyName"
                    placeholder="Company"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                />

                <input
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                />

                <input
                    name="stipend"
                    placeholder="Stipend"
                    value={formData.stipend}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                />

                <input
                    name="durationMonths"
                    placeholder="Duration"
                    value={formData.durationMonths}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                />

                <input
                    name="openings"
                    placeholder="Openings"
                    value={formData.openings}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                />

                <input
                    name="skillsRequired"
                    placeholder="Skills"
                    value={formData.skillsRequired}
                    onChange={handleChange}
                    className="border p-3 rounded-lg col-span-2"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border p-3 rounded-lg col-span-2"
                    rows="4"
                />

                <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                />

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                >

                    <option value="OPEN">OPEN</option>

                    <option value="CLOSED">CLOSED</option>

                </select>

                <label className="col-span-2 flex items-center gap-3">

                    <input
                        type="checkbox"
                        name="isRemote"
                        checked={formData.isRemote}
                        onChange={handleChange}
                    />

                    Remote Internship

                </label>

                <div className="col-span-2 flex gap-4">

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                    >
                        Save
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-500 text-white px-6 py-3 rounded-lg"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    );

}

export default InternshipForm;