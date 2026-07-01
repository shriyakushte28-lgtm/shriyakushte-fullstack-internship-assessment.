import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../services/profileService";

function ProfileCompletion() {

    const navigate = useNavigate();

    const userId = Number(localStorage.getItem("userId"));

    const [percentage, setPercentage] = useState(0);

    useEffect(() => {

        loadProfile();

    }, []);

    async function loadProfile() {

        try {

            const response = await getProfile(userId);

            const profile = response.data;

            const fields = [

                profile.fullName,
                profile.phone,
                profile.college,
                profile.degree,
                profile.graduationYear,
                profile.skills,
                profile.resumeUrl,
                profile.bio

            ];

            const completed = fields.filter(field => field).length;

            setPercentage(Math.round((completed / fields.length) * 100));

        }

        catch (error) {

            setPercentage(0);

        }

    }

    return (

        <div className="bg-white rounded-2xl shadow p-8 mt-8">

            <h2 className="text-2xl font-bold">

                Profile Completion

            </h2>

            <div className="w-full bg-gray-200 rounded-full h-4 mt-6">

                <div
                    className="bg-blue-600 h-4 rounded-full"
                    style={{ width: `${percentage}%` }}
                />

            </div>

            <p className="mt-4 text-gray-500">

                {percentage}% Completed

            </p>

            <button
                onClick={() => navigate("/profile")}
                className="mt-6 bg-blue-600 text-white px-5 py-3 rounded-xl"
            >

                Edit Profile

            </button>

        </div>

    );

}

export default ProfileCompletion;