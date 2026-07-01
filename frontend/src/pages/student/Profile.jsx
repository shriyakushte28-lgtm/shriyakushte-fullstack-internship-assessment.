import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
    getProfile,
    createProfile,
    updateProfile
} from "../../services/profileService";

function Profile() {

    const userId = Number(localStorage.getItem("userId"));

    const [isNewProfile, setIsNewProfile] = useState(true);

    const [formData, setFormData] = useState({

        fullName: "",
        phone: "",
        college: "",
        degree: "",
        graduationYear: "",
        skills: "",
        resumeUrl: "",
        bio: ""

    });

    useEffect(() => {

        loadProfile();

    }, []);

    async function loadProfile() {

        try {

            const response = await getProfile(userId);

            setFormData(response.data);

            setIsNewProfile(false);

        }

        catch (error) {

    console.log("GET Profile Error");
    console.log(error.response?.status);
    console.log(error.response?.data);

    setIsNewProfile(true);

}

    }

    function handleChange(e) {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        console.log("isNewProfile:", isNewProfile);

        try {

            if (isNewProfile) {

                await createProfile(userId, formData);

                alert("Profile Created!");

            }

            else {

                await updateProfile(userId, formData);

                alert("Profile Updated!");

            }

            loadProfile();

        }

        catch (error) {

            console.log(error);

        }

    }

    return (

        <DashboardLayout>

            <h1 className="text-4xl font-bold mb-8">

                My Profile

            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow space-y-5"
            >

                <input
                    name="fullName"
                    value={formData.fullName || ""}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="border p-3 rounded-lg w-full"
                />

                <input
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="border p-3 rounded-lg w-full"
                />

                <input
                    name="college"
                    value={formData.college || ""}
                    onChange={handleChange}
                    placeholder="College"
                    className="border p-3 rounded-lg w-full"
                />

                <input
                    name="degree"
                    value={formData.degree || ""}
                    onChange={handleChange}
                    placeholder="Degree"
                    className="border p-3 rounded-lg w-full"
                />

                <input
                    name="graduationYear"
                    value={formData.graduationYear || ""}
                    onChange={handleChange}
                    placeholder="Graduation Year"
                    className="border p-3 rounded-lg w-full"
                />

                <input
                    name="skills"
                    value={formData.skills || ""}
                    onChange={handleChange}
                    placeholder="Skills"
                    className="border p-3 rounded-lg w-full"
                />

                <input
                    name="resumeUrl"
                    value={formData.resumeUrl || ""}
                    onChange={handleChange}
                    placeholder="Resume URL"
                    className="border p-3 rounded-lg w-full"
                />

                <textarea
                    name="bio"
                    value={formData.bio || ""}
                    onChange={handleChange}
                    placeholder="Bio"
                    rows="4"
                    className="border p-3 rounded-lg w-full"
                />

                <button
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl"
                >

                    Save Profile

                </button>

            </form>

        </DashboardLayout>

    );

}

export default Profile;