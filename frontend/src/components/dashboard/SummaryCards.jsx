function Card({ title, value }) {

    return (

        <div className="bg-white rounded-2xl shadow p-6">

            <h3 className="text-gray-500">

                {title}

            </h3>

            <h2 className="text-4xl font-bold mt-3">

                {value}

            </h2>

        </div>

    );

}

function SummaryCards() {

    return (

        <div className="grid grid-cols-4 gap-6 mt-8">

            <Card title="Applied" value="0" />

            <Card title="Saved" value="0" />

            <Card title="Interviews" value="0" />

            <Card title="Offers" value="0" />

        </div>

    );

}

export default SummaryCards;