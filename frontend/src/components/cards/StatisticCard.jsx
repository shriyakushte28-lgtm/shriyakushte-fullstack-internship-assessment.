function StatisticCard({ number, title }) {

    return (

        <div className="text-center">

            <h2 className="text-5xl font-bold text-white">

                {number}

            </h2>

            <p className="mt-3 text-blue-100 text-lg">

                {title}

            </p>

        </div>

    );

}

export default StatisticCard;