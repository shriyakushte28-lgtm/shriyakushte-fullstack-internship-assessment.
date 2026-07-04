import { useEffect, useState } from "react";
import { User, Mail, Shield, Calendar, Lock, KeyRound, Save } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../services/api";

function AdminProfile() {
    const adminId = localStorage.getItem("userId");
    const [loading, setLoading] = useState(true);
    const [profileSaving, setProfileSaving] = useState(false);
    const [passwordSaving, setPasswordSaving] = useState(false);

    const [profile, setProfile] = useState({
        id: "",
        fullName: "",
        email: "",
        role: "",
        createdAt: ""
    });

    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        try {
            setLoading(true);
            const response = await api.get(`/admin/profile/${adminId}`);
            setProfile(response.data);
        } catch (error) {
            console.error("Unable to load admin profile", error);
            toast.error("Unable to load profile.");
        } finally {
            setLoading(false);
        }
    }

    function handleProfile(e) {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    }

    function handlePassword(e) {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        });
    }

    async function updateProfile() {
        setProfileSaving(true);
        try {
            await api.put(`/admin/profile/${adminId}`, {
                fullName: profile.fullName,
                email: profile.email
            });
            localStorage.setItem("fullName", profile.fullName);
            toast.success("Profile updated successfully.");
        } catch (error) {
            console.error("Failed to update profile", error);
            toast.error("Failed to update profile.");
        } finally {
            setProfileSaving(false);
        }
    }

    async function updatePassword() {
        if (password.newPassword !== password.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setPasswordSaving(true);
        try {
            await api.put(`/admin/change-password/${adminId}`, {
                currentPassword: password.currentPassword,
                newPassword: password.newPassword
            });
            toast.success("Password updated successfully.");
            setPassword({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        } catch (error) {
            console.error("Failed to update password", error);
            toast.error("Failed to update password.");
        } finally {
            setPasswordSaving(false);
        }
    }

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-sm font-semibold text-slate-500 animate-pulse">Loading admin profile...</div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-4">
                {/* Header Banner */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5 shadow-sm flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold uppercase shrink-0">
                        {profile.fullName ? profile.fullName.charAt(0) : "A"}
                    </div>
                    <div className="text-left">
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">
                            {profile.fullName}
                        </h1>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                            System Administrator
                        </p>
                    </div>
                </div>

                {/* Details split grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                    {/* Left column: Personal info */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5 shadow-sm space-y-4">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
                                Personal Information
                            </h2>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User size={13} className="absolute left-3 top-2.5 text-slate-400" />
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={profile.fullName || ""}
                                            onChange={handleProfile}
                                            className="block w-full pl-9 pr-3 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-xs transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail size={13} className="absolute left-3 top-2.5 text-slate-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={profile.email || ""}
                                            onChange={handleProfile}
                                            className="block w-full pl-9 pr-3 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-xs transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                        System Role
                                    </label>
                                    <div className="relative">
                                        <Shield size={13} className="absolute left-3 top-2.5 text-slate-400" />
                                        <input
                                            value={profile.role || ""}
                                            disabled
                                            className="block w-full pl-9 pr-3 py-1.5 border border-slate-200 bg-slate-100 rounded-lg text-slate-500 text-xs cursor-not-allowed uppercase font-semibold"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Joined On
                                    </label>
                                    <div className="relative">
                                        <Calendar size={13} className="absolute left-3 top-2.5 text-slate-400" />
                                        <input
                                            value={profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : ""}
                                            disabled
                                            className="block w-full pl-9 pr-3 py-1.5 border border-slate-200 bg-slate-100 rounded-lg text-slate-500 text-xs cursor-not-allowed font-medium"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex justify-end">
                                <button
                                    onClick={updateProfile}
                                    disabled={profileSaving}
                                    className="btn-primary py-1.5 px-4 text-xs"
                                >
                                    <Save size={13} />
                                    <span>{profileSaving ? "Saving..." : "Save Changes"}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right column: password & info */}
                    <div className="space-y-4">
                        {/* Change Password */}
                        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-4">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
                                Update Password
                            </h2>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Current Password
                                    </label>
                                    <div className="relative">
                                        <Lock size={13} className="absolute left-3 top-2.5 text-slate-400" />
                                        <input
                                            type="password"
                                            name="currentPassword"
                                            value={password.currentPassword}
                                            onChange={handlePassword}
                                            placeholder="••••••••"
                                            className="block w-full pl-9 pr-3 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-xs transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <KeyRound size={13} className="absolute left-3 top-2.5 text-slate-400" />
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={password.newPassword}
                                            onChange={handlePassword}
                                            placeholder="••••••••"
                                            className="block w-full pl-9 pr-3 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-xs transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <KeyRound size={13} className="absolute left-3 top-2.5 text-slate-400" />
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={password.confirmPassword}
                                            onChange={handlePassword}
                                            placeholder="••••••••"
                                            className="block w-full pl-9 pr-3 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-xs transition-all font-medium"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex justify-end">
                                <button
                                    onClick={updatePassword}
                                    disabled={passwordSaving}
                                    className="btn-primary py-1.5 px-4 text-xs w-full"
                                >
                                    <Lock size={13} />
                                    <span>{passwordSaving ? "Updating..." : "Update Password"}</span>
                                </button>
                            </div>
                        </div>

                        {/* Account Stats */}
                        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
                            <h2 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-1.5">
                                System Audit Meta
                            </h2>

                            <div className="space-y-2 text-[11px] text-slate-605">
                                <div className="flex justify-between items-center border-b border-slate-50 pb-1.5">
                                    <span className="text-slate-400">Admin Account ID</span>
                                    <span className="font-semibold text-slate-900">#{profile.id}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-slate-50 pb-1.5">
                                    <span className="text-slate-400">Security Group</span>
                                    <span className="font-semibold text-slate-900 uppercase">{profile.role}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Status</span>
                                    <span className="font-bold text-green-600">Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default AdminProfile;