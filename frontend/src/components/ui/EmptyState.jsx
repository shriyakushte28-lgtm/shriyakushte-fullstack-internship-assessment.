function EmptyState({

    title,

    subtitle

}) {

    return (

        <div className="text-center py-20">

            <h2 className="text-2xl font-semibold text-slate-700">

                {title}

            </h2>

            <p className="text-slate-500 mt-3">

                {subtitle}

            </p>

        </div>

    );

}

export default EmptyState;