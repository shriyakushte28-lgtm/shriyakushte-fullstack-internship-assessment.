function SkeletonTable({ rows = 6 }) {

    return (

        <div className="bg-white border rounded-xl overflow-hidden">

            {[...Array(rows)].map((_, index) => (

                <div
                    key={index}
                    className="flex gap-4 px-6 py-4 border-b animate-pulse"
                >

                    <div className="h-4 w-32 bg-slate-200 rounded"></div>

                    <div className="h-4 w-40 bg-slate-200 rounded"></div>

                    <div className="h-4 w-20 bg-slate-200 rounded"></div>

                    <div className="h-4 w-28 bg-slate-200 rounded"></div>

                    <div className="ml-auto h-8 w-24 bg-slate-200 rounded"></div>

                </div>

            ))}

        </div>

    );

}

export default SkeletonTable;