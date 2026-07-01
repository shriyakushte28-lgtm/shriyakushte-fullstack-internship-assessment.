import { useNavigate } from "react-router-dom";

function WelcomeBanner() {

    const navigate = useNavigate();

    const fullName = localStorage.getItem("fullName") || "Student";

    return (

        <div className="bg-blue-600 rounded-3xl text-white p-10">

            <h1 className="text-4xl font-bold">

                Welcome back, {fullName} 👋

            </h1>

            <p className="mt-4 text-blue-100">

                Ready to find your next internship?

            </p>

            <button
                onClick={() => navigate("/internships")}
                className="mt-8 bg-white text-blue-600 px-6 py-3 rounded-xl hover:bg-gray-100"
            >

                Browse Internships

            </button>

        </div>

    );

}

export default WelcomeBanner;