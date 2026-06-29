import { useEffect, useState } from "react";
import { getInternshipCount } from "../../services/internshipService";

function Statistics() {

    const [count, setCount] = useState(0);

    useEffect(() => {

        loadCount();

    }, []);

    const loadCount = async () => {

        const response = await getInternshipCount();

        setCount(response.data);

    };

    return (

        <section className="bg-blue-600 py-20">

            <div className="max-w-7xl mx-auto px-8">

                <div className="grid grid-cols-4 text-center">

                    <div>

                        <h2 className="text-white text-5xl font-bold">

                            {count}

                        </h2>

                        <p className="text-blue-100">

                            Open Internships

                        </p>

                    </div>

                    <div>

                        <h2 className="text-white text-5xl font-bold">

                            --

                        </h2>

                        <p className="text-blue-100">

                            Students

                        </p>

                    </div>

                    <div>

                        <h2 className="text-white text-5xl font-bold">

                            --

                        </h2>

                        <p className="text-blue-100">

                            Applications

                        </p>

                    </div>

                    <div>

                        <h2 className="text-white text-5xl font-bold">

                            Live

                        </h2>

                        <p className="text-blue-100">

                            Portal

                        </p>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default Statistics;