import { useNavigate } from "react-router-dom";

function QuickActions() {

    const navigate = useNavigate();

    return (

        <div className="bg-white rounded-2xl shadow p-8 mt-8">

            <h2 className="text-2xl font-bold">

                Quick Actions

            </h2>

            <div className="flex gap-4 mt-6 flex-wrap">

                <button
                    onClick={() => navigate("/internships")}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
                >

                    Browse Internships

                </button>

                <button
                    onClick={() => navigate("/profile")}
                    className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
                >

                    Edit Profile

                </button>

                <button
                    onClick={() => navigate("/settings")}
                    className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700"
                >

                    Settings

                </button>

                <button
    onClick={() => navigate("/saved")}
    className="bg-pink-600 hover:bg-pink-700 text-white rounded-xl p-5"
>
    ❤️ Saved Internships
</button>

            </div>

        </div>

    );

}

export default QuickActions;