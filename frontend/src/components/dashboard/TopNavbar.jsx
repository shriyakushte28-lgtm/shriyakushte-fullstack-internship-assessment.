function TopNavbar() {

    return (

        <header className="bg-white shadow px-8 py-5 flex justify-between items-center">

            <input

                type="text"

                placeholder="Search internships..."

                className="border rounded-xl px-5 py-3 w-96"

            />

            <div className="flex items-center gap-6">

                🔔

                <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center">

                    S

                </div>

            </div>

        </header>

    );

}

export default TopNavbar;