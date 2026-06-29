function Hero() {

    return (

        <section className="bg-gradient-to-br from-blue-50 to-white py-24">

            <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 items-center gap-16">

                <div>

                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">

                        🚀 Find Your Dream Internship

                    </span>

                    <h1 className="text-6xl font-bold mt-8 leading-tight">

                        Launch Your Career

                        <span className="text-blue-600">

                            {" "}with the Right Internship

                        </span>

                    </h1>

                    <p className="text-gray-600 mt-8 text-lg leading-8">

                        Explore thousands of internship opportunities,
                        connect with top companies,
                        and kick-start your professional journey.

                    </p>

                    <div className="mt-10 flex gap-5">

                        <button className="bg-blue-600 text-white px-8 py-4 rounded-xl">

                            Browse Internships

                        </button>

                        <button className="border px-8 py-4 rounded-xl">

                            Learn More

                        </button>

                    </div>

                </div>

                <div>

                    <img

                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900"

                        className="rounded-3xl shadow-2xl"

                    />

                </div>

            </div>

        </section>

    );

}

export default Hero;