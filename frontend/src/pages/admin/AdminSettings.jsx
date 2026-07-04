import { useEffect, useState } from "react";
import { Settings, Save, Building2, Mail, Briefcase, CalendarDays, Info } from "lucide-react";
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
            setLoading(true);
            const response = await api.get("/admin/settings");
            setSettings({
                portalName: response.data.portalName,
                supportEmail: response.data.supportEmail,
                maxApplications: response.data.maxApplications,
                internshipDuration: response.data.internshipDuration
            });
        } catch (error) {
            console.error("Unable to load admin settings", error);
            toast.error("Unable to load settings.");
        } finally {
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
            await api.put("/admin/settings", settings);
            toast.success("Settings updated successfully.");
        } catch (error) {
            console.error("Failed to update settings", error);
            toast.error("Failed to update settings.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-sm font-semibold text-slate-500 animate-pulse">Loading settings...</div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-4">
                {/* Header title banner */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-50 border border-blue-100 text-blue-650 rounded-xl">
                            <Settings size={20} />
                        </div>
                        <div className="text-left">
                            <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">
                                Portal Settings
                            </h1>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Configure institutional controls, support routing, and system parameters
                            </p>
                        </div>
                    </div>
                </div>

                {/* Configurations Split Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                    {/* Left Column: Form config */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5 shadow-sm space-y-4">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
                                System Configuration Parameters
                            </h2>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Portal Branding Title
                                    </label>
                                    <div className="relative">
                                        <Building2 size={13} className="absolute left-3 top-2.5 text-slate-400" />
                                        <input
                                            type="text"
                                            name="portalName"
                                            value={settings.portalName || ""}
                                            onChange={handleChange}
                                            className="block w-full pl-9 pr-3 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-xs transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Helpdesk Support Email
                                    </label>
                                    <div className="relative">
                                        <Mail size={13} className="absolute left-3 top-2.5 text-slate-400" />
                                        <input
                                            type="email"
                                            name="supportEmail"
                                            value={settings.supportEmail || ""}
                                            onChange={handleChange}
                                            className="block w-full pl-9 pr-3 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-xs transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Maximum Active Applications Per Student
                                    </label>
                                    <div className="relative">
                                        <Briefcase size={13} className="absolute left-3 top-2.5 text-slate-400" />
                                        <input
                                            type="number"
                                            name="maxApplications"
                                            value={settings.maxApplications || ""}
                                            onChange={handleChange}
                                            className="block w-full pl-9 pr-3 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-xs transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Default Internship Term (Duration)
                                    </label>
                                    <div className="relative">
                                        <CalendarDays size={13} className="absolute left-3 top-2.5 text-slate-400" />
                                        <input
                                            type="text"
                                            name="internshipDuration"
                                            value={settings.internshipDuration || ""}
                                            onChange={handleChange}
                                            placeholder="Example: 6 Months"
                                            className="block w-full pl-9 pr-3 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-xs transition-all font-medium"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex justify-end">
                                <button
                                    onClick={saveSettings}
                                    disabled={saving}
                                    className="btn-primary py-1.5 px-4 text-xs"
                                >
                                    <Save size={13} />
                                    <span>{saving ? "Saving..." : "Save Settings"}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: About Meta */}
                    <div>
                        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-4">
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                                <Info size={14} className="text-slate-500" />
                                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                                    About InternSphere
                                </h2>
                            </div>

                            <div className="space-y-2.5 text-[11px] text-slate-600">
                                <div className="flex justify-between items-center border-b border-slate-50 pb-1.5">
                                    <span className="text-slate-400">Application</span>
                                    <span className="font-semibold text-slate-900">InternSphere Portal</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-slate-50 pb-1.5">
                                    <span className="text-slate-450">Version Release</span>
                                    <span className="font-semibold text-slate-900">v1.0.0-GA</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-slate-50 pb-1.5">
                                    <span className="text-slate-450">Frontend Engine</span>
                                    <span className="font-semibold text-slate-900">React + Tailwind</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-slate-50 pb-1.5">
                                    <span className="text-slate-450">Backend Core</span>
                                    <span className="font-semibold text-slate-900">Spring Boot REST API</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-slate-50 pb-1.5">
                                    <span className="text-slate-450">Database Engine</span>
                                    <span className="font-semibold text-slate-900">MySQL Server</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-slate-50 pb-1.5">
                                    <span className="text-slate-450">System Developer</span>
                                    <span className="font-semibold text-slate-900">Shriya Kushte</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-450">Build State</span>
                                    <span className="font-bold text-green-600">Production Ready</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default AdminSettings;