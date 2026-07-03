import { useEffect, useState } from "react";
import {
    Settings,
    Save,
    Building2,
    Mail,
    Briefcase,
    CalendarDays,
    Info
} from "lucide-react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";
import api from "../../services/api";

function AdminSettings() {

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [settings, setSettings] = useState({

        portalName: "",

        supportEmail: "",

        maxApplications: "",

        internshipDuration: ""

    });

    useEffect(() => {

        loadSettings();

    }, []);

    async function loadSettings() {

        try {

            const response = await api.get("/admin/settings");

            setSettings({

                portalName: response.data.portalName,

                supportEmail: response.data.supportEmail,

                maxApplications: response.data.maxApplications,

                internshipDuration: response.data.internshipDuration

            });

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load settings.");
        }

        finally {

            setLoading(false);

        }

    }

    function handleChange(e) {

        setSettings({

            ...settings,

            [e.target.name]: e.target.value

        });

    }

    async function saveSettings() {

        setSaving(true);

        try {

            await api.put(

                "/admin/settings",

                settings

            );

            toast.success("Settings updated successfully.");

        }

        catch (error) {

            console.log(error);

            toast.error("Failed to update settings.");

        }

        finally {

            setSaving(false);

        }

    }

    if (loading) {

        return (

            <AdminLayout>

                <div className="text-center py-20">

                    Loading...

                </div>

            </AdminLayout>

        );

    }

    return (

        <AdminLayout>

            <div className="max-w-6xl mx-auto space-y-6">

                <div className="bg-white rounded-2xl border shadow p-8">

                    <div className="flex items-center gap-3">

                        <Settings className="text-blue-600"/>

                        <div>

                            <h1 className="text-3xl font-bold">

                                Portal Settings

                            </h1>

                            <p className="text-slate-500">

                                Configure your internship portal.

                            </p>

                        </div>

                    </div>

                </div>

                <div className="grid lg:grid-cols-2 gap-6">

                                  {/* Portal Information */}

                <div className="bg-white rounded-2xl border shadow p-6">

                    <h2 className="text-xl font-bold mb-6">
                        Portal Information
                    </h2>

                    <div className="space-y-5">

                        <div>

                            <label className="text-sm font-medium">
                                Portal Name
                            </label>

                            <div className="relative mt-2">

                                <Building2
                                    size={18}
                                    className="absolute left-3 top-3 text-slate-400"
                                />

                                <input
                                    type="text"
                                    name="portalName"
                                    value={settings.portalName}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg pl-10 pr-3 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                            </div>

                        </div>

                        <div>

                            <label className="text-sm font-medium">
                                Support Email
                            </label>

                            <div className="relative mt-2">

                                <Mail
                                    size={18}
                                    className="absolute left-3 top-3 text-slate-400"
                                />

                                <input
                                    type="email"
                                    name="supportEmail"
                                    value={settings.supportEmail}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg pl-10 pr-3 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                            </div>

                        </div>

                        <div>

                            <label className="text-sm font-medium">
                                Maximum Applications Per Student
                            </label>

                            <div className="relative mt-2">

                                <Briefcase
                                    size={18}
                                    className="absolute left-3 top-3 text-slate-400"
                                />

                                <input
                                    type="number"
                                    name="maxApplications"
                                    value={settings.maxApplications}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg pl-10 pr-3 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                            </div>

                        </div>

                        <div>

                            <label className="text-sm font-medium">
                                Default Internship Duration
                            </label>

                            <div className="relative mt-2">

                                <CalendarDays
                                    size={18}
                                    className="absolute left-3 top-3 text-slate-400"
                                />

                                <input
                                    type="text"
                                    name="internshipDuration"
                                    value={settings.internshipDuration}
                                    onChange={handleChange}
                                    placeholder="Example : 6 Months"
                                    className="w-full border rounded-lg pl-10 pr-3 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                            </div>

                        </div>

                        <button
                            onClick={saveSettings}
                            disabled={saving}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 flex justify-center items-center gap-2 transition cursor-pointer"
                        >

                            <Save size={18} />

                            {saving ? "Saving..." : "Save Settings"}

                        </button>

                    </div>

                </div>

                {/* About InternSphere */}

                <div className="bg-white rounded-2xl border shadow p-6">

                    <div className="flex items-center gap-2 mb-6">

                        <Info className="text-blue-600"/>

                        <h2 className="text-xl font-bold">
                            About InternSphere
                        </h2>

                    </div>

                    <div className="space-y-4">

                        <div className="flex justify-between border-b pb-3">

                            <span className="text-slate-500">
                                Application
                            </span>

                            <span className="font-semibold">
                                InternSphere
                            </span>

                        </div>

                        <div className="flex justify-between border-b pb-3">

                            <span className="text-slate-500">
                                Version
                            </span>

                            <span className="font-semibold">
                                1.0.0
                            </span>

                        </div>

                        <div className="flex justify-between border-b pb-3">

                            <span className="text-slate-500">
                                Frontend
                            </span>

                            <span className="font-semibold">
                                React + Tailwind CSS
                            </span>

                        </div>

                        <div className="flex justify-between border-b pb-3">

                            <span className="text-slate-500">
                                Backend
                            </span>

                            <span className="font-semibold">
                                Spring Boot
                            </span>

                        </div>

                        <div className="flex justify-between border-b pb-3">

                            <span className="text-slate-500">
                                Database
                            </span>

                            <span className="font-semibold">
                                MySQL
                            </span>

                        </div>

                        <div className="flex justify-between border-b pb-3">

                            <span className="text-slate-500">
                                Developer
                            </span>

                            <span className="font-semibold">
                                Shriya Kushte
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span className="text-slate-500">
                                Status
                            </span>

                            <span className="font-semibold text-green-600">
                                Production Ready
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </AdminLayout>

);

}

export default AdminSettings;