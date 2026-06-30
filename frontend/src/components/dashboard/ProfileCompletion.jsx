function ProfileCompletion() {

    return (

        <div className="bg-white rounded-2xl shadow p-8 mt-8">

            <h2 className="text-2xl font-bold">

                Profile Completion

            </h2>

            <div className="w-full bg-gray-200 rounded-full h-4 mt-6">

                <div
                    className="bg-blue-600 h-4 rounded-full"
                    style={{ width: "60%" }}
                ></div>

            </div>

            <p className="mt-4 text-gray-500">

                60% Completed

            </p>

            <button
                className="mt-6 bg-blue-600 text-white px-5 py-3 rounded-xl"
            >
                Complete Profile
            </button>

        </div>

    );

}

export default ProfileCompletion;