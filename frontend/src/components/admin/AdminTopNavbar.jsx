function AdminTopNavbar() {

    return (

        <header className="bg-white shadow px-8 py-5 flex justify-between items-center">

            <h2 className="text-2xl font-bold">

                Admin Dashboard

            </h2>

            <div className="flex items-center gap-5">

                🔔

                <div
                    className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center"
                >
                    A
                </div>

            </div>

        </header>

    );

}

export default AdminTopNavbar;