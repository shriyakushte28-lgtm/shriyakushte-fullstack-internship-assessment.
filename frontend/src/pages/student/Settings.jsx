import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import ConfirmModal from "../../components/common/ConfirmModal";
import { getUser, updateUser, changePassword } from "../../services/userService";
import { Settings as SettingsIcon, User, Shield, LogOut, Check, Save } from "lucide-react";
import toast from "react-hot-toast";

function Settings() {
    const navigate = useNavigate();
    const userId = Number(localStorage.getItem("userId"));
    const [activeTab, setActiveTab] = useState("PROFILE");
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const [user, setUser] = useState({
        fullName: "",
        email: "",
        role: "",
        createdAt: ""
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [savingAccount, setSavingAccount] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
        try {
            const response = await getUser(userId);
            setUser(response.data);
        } catch (error) {
            console.error("Failed to load user details", error);
        }
    }

    function handleUserChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    async function handleAccountUpdate(e) {
        e.preventDefault();
        setSavingAccount(true);
        try {
            await updateUser(userId, user);
            localStorage.setItem("fullName", user.fullName);
            toast.success("Account updated successfully.");
            loadUser();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update account.");
        } finally {
            setSavingAccount(false);
        }
    }

    function handlePasswordChange(e) {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        });
    }

    async function handlePasswordSubmit(e) {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setChangingPassword(true);
        try {
            await changePassword(userId, {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            toast.success("Password updated successfully.");
            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        } catch (error) {
            console.error(error);
            toast.error("Current password is incorrect.");
        } finally {
            setChangingPassword(false);
        }
    }

    function logout() {
    setShowLogoutModal(true);
}

function confirmLogout() {

    localStorage.clear();

    navigate("/login");

}

    return (
        <DashboardLayout>
            <div className="space-y-4">
                {/* Title */}
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        <SettingsIcon size={18} className="text-slate-700" />
                        <span>Settings</span>
                    </h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Manage your account settings, passwords, and portal configurations
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    {/* Navigation sidebar */}
                    <div className="md:w-56 shrink-0 flex flex-row md:flex-col gap-1 border-b md:border-b-0 md:border-r border-slate-200 pb-3 md:pb-0 md:pr-4">
                        <button
                            onClick={() => setActiveTab("PROFILE")}
                            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg text-left cursor-pointer transition-all w-full
                                ${activeTab === "PROFILE"
                                    ? "bg-blue-50/50 text-blue-750 font-bold border-l-2 border-blue-600 rounded-l-none"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <User size={13} />
                            <span>Account Details</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("SECURITY")}
                            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg text-left cursor-pointer transition-all w-full
                                ${activeTab === "SECURITY"
                                    ? "bg-blue-50/50 text-blue-750 font-bold border-l-2 border-blue-600 rounded-l-none"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <Shield size={13} />
                            <span>Update Password</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("HAZARD")}
                            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg text-left cursor-pointer transition-all w-full
                                ${activeTab === "HAZARD"
                                    ? "bg-red-50 text-red-700 font-bold"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <LogOut size={13} />
                            <span>Danger Zone</span>
                        </button>
                    </div>

                    {/* Tab panels */}
                    <div className="flex-1 max-w-xl">
                        {activeTab === "PROFILE" && (
                            <form onSubmit={handleAccountUpdate} className="bg-white border border-slate-200 rounded-xl p-4 md:p-5 shadow-sm space-y-4">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2 mb-3">
                                    Account Profile Info
                                </h3>

                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={user.fullName || ""}
                                            onChange={handleUserChange}
                                            required
                                            className="block w-full px-3 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-xs transition-all font-medium"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                                            Email Address (ID)
                                        </label>
                                        <input
                                            type="email"
                                            value={user.email || ""}
                                            disabled
                                            className="block w-full px-3 py-1.5 border border-slate-200 bg-slate-50 rounded-lg text-slate-500 text-xs cursor-not-allowed"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                                                User Role
                                            </label>
                                            <input
                                                type="text"
                                                value={user.role || ""}
                                                disabled
                                                className="block w-full px-3 py-1.5 border border-slate-200 bg-slate-50 rounded-lg text-slate-500 text-xs cursor-not-allowed uppercase"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                                                Created At
                                            </label>
                                            <input
                                                type="text"
                                                value={user.createdAt ? user.createdAt.substring(0, 10) : "N/A"}
                                                disabled
                                                className="block w-full px-3 py-1.5 border border-slate-200 bg-slate-50 rounded-lg text-slate-500 text-xs cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-slate-100 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={savingAccount}
                                        className="btn-primary py-1.5 px-3.5 text-xs"
                                    >
                                        <Save size={13} />
                                        <span>{savingAccount ? "Saving..." : "Save details"}</span>
                                    </button>
                                </div>
                            </form>
                        )}

                        {activeTab === "SECURITY" && (
                            <form onSubmit={handlePasswordSubmit} className="bg-white border border-slate-200 rounded-xl p-4 md:p-5 shadow-sm space-y-4">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2 mb-3">
                                    Change Credentials
                                </h3>

                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            name="currentPassword"
                                            required
                                            value={passwordData.currentPassword}
                                            onChange={handlePasswordChange}
                                            placeholder="••••••••"
                                            className="block w-full px-3 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-xs transition-all font-medium"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            required
                                            value={passwordData.newPassword}
                                            onChange={handlePasswordChange}
                                            placeholder="••••••••"
                                            className="block w-full px-3 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-xs transition-all font-medium"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            required
                                            value={passwordData.confirmPassword}
                                            onChange={handlePasswordChange}
                                            placeholder="••••••••"
                                            className="block w-full px-3 py-1.5 border border-slate-200 bg-slate-50/50 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-xs transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-slate-100 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={changingPassword}
                                        className="btn-primary py-1.5 px-3.5 text-xs"
                                    >
                                        <Check size={13} />
                                        <span>{changingPassword ? "Updating..." : "Update Password"}</span>
                                    </button>
                                </div>
                            </form>
                        )}

                        {activeTab === "HAZARD" && (
                            <div className="bg-red-50/20 border border-red-200 rounded-xl p-4 md:p-5 space-y-4">
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-red-800">
                                        Danger Zone Options
                                    </h3>
                                    <p className="text-[10px] text-red-600 mt-0.5 leading-normal">
                                        Actions that immediately destroy sessions or delete credentials.
                                    </p>
                                </div>

                                <div className="border-t border-red-150 pt-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-white border border-red-100 rounded-lg">
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-900">Sign Out of Account</h4>
                                            <p className="text-[10px] text-slate-550 mt-0.5">Logs you out from the student portal.</p>
                                        </div>
                                        <button
                                            onClick={logout}
                                            className="btn-danger py-1.5 px-3 text-xs"
                                        >
                                            <LogOut size={13} />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ConfirmModal
    open={showLogoutModal}
    title="Sign Out"
    message="Are you sure you want to sign out of your account?"
    confirmText="Sign Out"
    cancelText="Cancel"
    danger={true}
    onConfirm={confirmLogout}
    onCancel={() => setShowLogoutModal(false)}
/>
        </DashboardLayout>
    );
}

export default Settings;