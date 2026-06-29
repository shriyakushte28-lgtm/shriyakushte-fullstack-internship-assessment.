function SearchSection() {

    return (

        <section className="relative -mt-10">

            <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-8">

                <h2 className="text-3xl font-bold text-center">

                    Find Your Dream Internship

                </h2>

                <div className="grid md:grid-cols-4 gap-4 mt-8">

                    <input
                        placeholder="Job Title"
                        className="border rounded-xl p-4 outline-none"
                    />

                    <input
                        placeholder="Location"
                        className="border rounded-xl p-4 outline-none"
                    />

                    <select className="border rounded-xl p-4">

                        <option>All Categories</option>

                        <option>Software Development</option>

                        <option>AI / ML</option>

                        <option>Cyber Security</option>

                        <option>Cloud</option>

                    </select>

                    <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">

                        Search

                    </button>

                </div>

            </div>

        </section>

    );

}

export default SearchSection;