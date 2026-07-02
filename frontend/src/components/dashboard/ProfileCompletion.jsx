import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfileCompletion } from "../../services/profileService";

function ProfileCompletion() {

    const navigate = useNavigate();

    const userId = Number(localStorage.getItem("userId"));

    const [completion, setCompletion] = useState(0);

    useEffect(() => {

        loadCompletion();

    }, []);

    async function loadCompletion() {

        try {

            const response = await getProfileCompletion(userId);

            setCompletion(response.data.completion);

        }

        catch (error) {

            console.log(error);

        }

    }

    return (

        <div className="bg-white rounded-2xl shadow p-8 mt-8">

            <h2 className="text-2xl font-bold">

                Profile Completion

            </h2>

            <div className="w-full bg-gray-200 rounded-full h-4 mt-6">

                <div
                    className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                    style={{
                        width: `${completion}%`
                    }}
                ></div>

            </div>

            <p className="mt-4 text-gray-600">

                {completion}% Completed

            </p>

            <button
                onClick={() => navigate("/profile")}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
            >

                Edit Profile

            </button>

        </div>

    );

}

export default ProfileCompletion;