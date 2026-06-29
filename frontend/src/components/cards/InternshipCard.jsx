function InternshipCard({ internship }) {

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 hover:shadow-2xl transition">

            <div className="flex justify-between">

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

                    {internship.status}

                </span>

                <span className="text-green-600 font-semibold">

                    ₹ {internship.stipend}

                </span>

            </div>

            <h2 className="text-2xl font-bold mt-5">

                {internship.title}

            </h2>

            <p className="mt-2 text-gray-600">

                {internship.companyName}

            </p>

            <p className="mt-2 text-gray-500">

                📍 {internship.location}

            </p>

            <p className="mt-4 text-gray-500">

                {internship.skillsRequired}

            </p>

            <button
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
            >
                View Details
            </button>

        </div>

    );

}

export default InternshipCard;