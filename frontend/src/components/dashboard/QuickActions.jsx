function QuickActions() {

    return (

        <div className="bg-white rounded-2xl shadow p-8 mt-8">

            <h2 className="text-2xl font-bold">

                Quick Actions

            </h2>

            <div className="flex gap-4 mt-6">

                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">

                    Browse Internships

                </button>

                <button className="bg-green-600 text-white px-6 py-3 rounded-xl">

                    Edit Profile

                </button>

                <button className="bg-purple-600 text-white px-6 py-3 rounded-xl">

                    Upload Resume

                </button>

            </div>

        </div>

    );

}

export default QuickActions;