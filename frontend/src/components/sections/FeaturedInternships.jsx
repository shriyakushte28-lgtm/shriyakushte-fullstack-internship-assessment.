import { useEffect, useState } from "react";
import InternshipCard from "../cards/InternshipCard";
import { getLatestInternships } from "../../services/internshipService";

function FeaturedInternships() {

    const [internships, setInternships] = useState([]);

    useEffect(() => {

        loadInternships();

    }, []);

    const loadInternships = async () => {

        try {

            const response = await getLatestInternships();

            setInternships(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <section className="py-24">

            <div className="max-w-7xl mx-auto px-8">

                <h2 className="text-4xl font-bold text-center">

                    Latest Internships

                </h2>

                <p className="text-center text-gray-500 mt-4">

                    Fresh opportunities from our database.

                </p>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-16">

                    {

                        internships.map((internship) => (

                            <InternshipCard

                                key={internship.id}

                                internship={internship}

                            />

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default FeaturedInternships;