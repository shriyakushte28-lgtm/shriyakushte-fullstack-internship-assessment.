import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
    getUser,
    updateUser,
    changePassword
} from "../../services/userService";

function Settings() {

    const navigate = useNavigate();

    const userId = Number(localStorage.getItem("userId"));

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

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {

        try {

            const response = await getUser(userId);

            setUser(response.data);

        }

        catch (error) {

            console.log(error);

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

        try {

            await updateUser(userId, user);

            localStorage.setItem("fullName", user.fullName);

            alert("Account updated successfully.");

        }

        catch (error) {

            console.log(error);

            alert("Failed to update account.");

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

            alert("Passwords do not match.");

            return;

        }

        try {

            await changePassword(userId, {

                currentPassword: passwordData.currentPassword,

                newPassword: passwordData.newPassword

            });

            alert("Password changed successfully.");

            setPasswordData({

                currentPassword: "",

                newPassword: "",

                confirmPassword: ""

            });

        }

        catch (error) {

            console.log(error);

            alert("Current password is incorrect.");

        }

    }

    function logout() {

        if (window.confirm("Are you sure you want to logout?")) {

            localStorage.clear();

            navigate("/login");

        }

    }

    return (

        <DashboardLayout>

            <h1 className="text-4xl font-bold mb-8">

                Settings

            </h1>

            {/* Account Information */}

            <div className="bg-white rounded-2xl shadow p-8 mb-8">

                <h2 className="text-2xl font-bold mb-6">

                    Account Information

                </h2>

                <form
                    onSubmit={handleAccountUpdate}
                    className="space-y-5"
                >

                    <div>

                        <label className="font-semibold">

                            Full Name

                        </label>

                        <input
                            type="text"
                            name="fullName"
                            value={user.fullName}
                            onChange={handleUserChange}
                            className="border rounded-lg p-3 w-full mt-2"
                        />

                    </div>

                    <div>

                        <label className="font-semibold">

                            Email

                        </label>

                        <input
                            type="email"
                            value={user.email}
                            disabled
                            className="border rounded-lg p-3 w-full mt-2 bg-gray-100"
                        />

                    </div>

                    <div>

                        <label className="font-semibold">

                            Role

                        </label>

                        <input
                            type="text"
                            value={user.role}
                            disabled
                            className="border rounded-lg p-3 w-full mt-2 bg-gray-100"
                        />

                    </div>

                    <div>

                        <label className="font-semibold">

                            Member Since

                        </label>

                        <input
                            type="text"
                            value={
                                user.createdAt
                                    ? user.createdAt.substring(0, 10)
                                    : ""
                            }
                            disabled
                            className="border rounded-lg p-3 w-full mt-2 bg-gray-100"
                        />

                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                    >

                        Save Changes

                    </button>

                </form>

            </div>

            {/* Change Password */}

            <div className="bg-white rounded-2xl shadow p-8 mb-8">

                <h2 className="text-2xl font-bold mb-6">

                    Change Password

                </h2>

                <form
                    onSubmit={handlePasswordSubmit}
                    className="space-y-5"
                >

                    <input
                        type="password"
                        name="currentPassword"
                        placeholder="Current Password"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="border rounded-lg p-3 w-full"
                    />

                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="border rounded-lg p-3 w-full"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="border rounded-lg p-3 w-full"
                    />

                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
                    >

                        Change Password

                    </button>

                </form>

            </div>

            {/* Logout */}

            <div className="bg-white rounded-2xl shadow p-8">

                <h2 className="text-2xl font-bold">

                    Account

                </h2>

                <button
                    onClick={logout}
                    className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
                >

                    Logout

                </button>

            </div>

        </DashboardLayout>

    );

}

export default Settings;