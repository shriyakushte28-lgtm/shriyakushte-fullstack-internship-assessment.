import { useEffect, useState } from "react";
import {
    User,
    Mail,
    Shield,
    Calendar,
    Lock,
    KeyRound,
    Save
} from "lucide-react";
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

            const response = await api.get(
                `/admin/profile/${adminId}`
            );

            setProfile(response.data);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load profile.");

        }

        finally {

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

            await api.put(

                `/admin/profile/${adminId}`,

                {

                    fullName: profile.fullName,

                    email: profile.email

                }

            );

            localStorage.setItem(
                "fullName",
                profile.fullName
            );

            toast.success("Profile updated successfully.");

        }

        catch (error) {

            console.log(error);

            toast.error("Failed to update profile.");

        }

        finally {

            setProfileSaving(false);

        }

    }

    async function updatePassword() {

        if (

            password.newPassword !==
            password.confirmPassword

        ) {

            toast.error("Passwords do not match.");

            return;

        }

        setPasswordSaving(true);

        try {

            await api.put(

                `/admin/change-password/${adminId}`,

                {

                    currentPassword:
                        password.currentPassword,

                    newPassword:
                        password.newPassword

                }

            );

            toast.success("Password updated successfully.");

            setPassword({

                currentPassword: "",

                newPassword: "",

                confirmPassword: ""

            });

        }

        catch (error) {

            console.log(error);

            toast.error("Failed to update password.");

        }

        finally {

            setPasswordSaving(false);

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

                    <div className="flex items-center gap-5">

                        <div className="h-24 w-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">

                            {profile.fullName.charAt(0)}

                        </div>

                        <div>

                            <h1 className="text-3xl font-bold">

                                {profile.fullName}

                            </h1>

                            <p className="text-slate-500">

                                System Administrator

                            </p>

                        </div>

                    </div>

                </div>

                <div className="grid lg:grid-cols-2 gap-6"></div>

                                <div className="bg-white rounded-2xl border shadow p-6">

                    <h2 className="text-xl font-bold mb-6">
                        Personal Information
                    </h2>

                    <div className="space-y-5">

                        <div>

                            <label className="text-sm font-medium">
                                Full Name
                            </label>

                            <div className="relative mt-2">

                                <User
                                    size={18}
                                    className="absolute left-3 top-3 text-slate-400"
                                />

                                <input
                                    type="text"
                                    name="fullName"
                                    value={profile.fullName}
                                    onChange={handleProfile}
                                    className="w-full border rounded-lg pl-10 pr-3 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                            </div>

                        </div>

                        <div>

                            <label className="text-sm font-medium">
                                Email Address
                            </label>

                            <div className="relative mt-2">

                                <Mail
                                    size={18}
                                    className="absolute left-3 top-3 text-slate-400"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleProfile}
                                    className="w-full border rounded-lg pl-10 pr-3 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                            </div>

                        </div>

                        <div>

                            <label className="text-sm font-medium">
                                Role
                            </label>

                            <div className="relative mt-2">

                                <Shield
                                    size={18}
                                    className="absolute left-3 top-3 text-slate-400"
                                />

                                <input
                                    value={profile.role}
                                    disabled
                                    className="w-full border rounded-lg bg-slate-100 pl-10 pr-3 py-2.5"
                                />

                            </div>

                        </div>

                        <div>

                            <label className="text-sm font-medium">
                                Joined On
                            </label>

                            <div className="relative mt-2">

                                <Calendar
                                    size={18}
                                    className="absolute left-3 top-3 text-slate-400"
                                />

                                <input
                                    value={
                                        profile.createdAt
                                            ? new Date(profile.createdAt).toLocaleDateString()
                                            : ""
                                    }
                                    disabled
                                    className="w-full border rounded-lg bg-slate-100 pl-10 pr-3 py-2.5"
                                />

                            </div>

                        </div>

                        <button
                            onClick={updateProfile}
                            disabled={profileSaving}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 flex items-center justify-center gap-2 transition cursor-pointer"
                        >

                            <Save size={18} />

                            {profileSaving
                                ? "Saving..."
                                : "Save Changes"}

                        </button>

                    </div>

                </div>

                                <div className="space-y-6">

                    {/* Change Password */}

                    <div className="bg-white rounded-2xl border shadow p-6">

                        <h2 className="text-xl font-bold mb-6">
                            Change Password
                        </h2>

                        <div className="space-y-5">

                            <div>

                                <label className="text-sm font-medium">
                                    Current Password
                                </label>

                                <div className="relative mt-2">

                                    <Lock
                                        size={18}
                                        className="absolute left-3 top-3 text-slate-400"
                                    />

                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={password.currentPassword}
                                        onChange={handlePassword}
                                        className="w-full border rounded-lg pl-10 pr-3 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="text-sm font-medium">
                                    New Password
                                </label>

                                <div className="relative mt-2">

                                    <KeyRound
                                        size={18}
                                        className="absolute left-3 top-3 text-slate-400"
                                    />

                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={password.newPassword}
                                        onChange={handlePassword}
                                        className="w-full border rounded-lg pl-10 pr-3 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="text-sm font-medium">
                                    Confirm Password
                                </label>

                                <div className="relative mt-2">

                                    <KeyRound
                                        size={18}
                                        className="absolute left-3 top-3 text-slate-400"
                                    />

                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={password.confirmPassword}
                                        onChange={handlePassword}
                                        className="w-full border rounded-lg pl-10 pr-3 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />

                                </div>

                            </div>

                            <button
                                onClick={updatePassword}
                                disabled={passwordSaving}
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-lg py-3 flex justify-center items-center gap-2 transition cursor-pointer"
                            >

                                <Lock size={18} />

                                {passwordSaving
                                    ? "Updating..."
                                    : "Update Password"}

                            </button>

                        </div>

                    </div>

                    {/* Account Information */}

                    <div className="bg-white rounded-2xl border shadow p-6">

                        <h2 className="text-xl font-bold mb-5">
                            Account Information
                        </h2>

                        <div className="space-y-4">

                            <div className="flex justify-between border-b pb-3">

                                <span className="text-slate-500">
                                    Admin ID
                                </span>

                                <span className="font-semibold">
                                    #{profile.id}
                                </span>

                            </div>

                            <div className="flex justify-between border-b pb-3">

                                <span className="text-slate-500">
                                    Role
                                </span>

                                <span className="font-semibold">
                                    {profile.role}
                                </span>

                            </div>

                            <div className="flex justify-between border-b pb-3">

                                <span className="text-slate-500">
                                    Account Status
                                </span>

                                <span className="font-semibold text-green-600">
                                    Active
                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-slate-500">
                                    Member Since
                                </span>

                                <span className="font-semibold">
                                    {profile.createdAt
                                        ? new Date(profile.createdAt).toLocaleDateString()
                                        : "-"}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </AdminLayout>

    );

}

export default AdminProfile;