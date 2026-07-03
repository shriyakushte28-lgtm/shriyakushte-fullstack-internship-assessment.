function SkeletonDashboard() {

    return (

        <div className="space-y-5 animate-pulse">

            <div className="grid md:grid-cols-4 gap-4">

                {[...Array(4)].map((_, i) => (

                    <div
                        key={i}
                        className="h-28 bg-slate-200 rounded-xl"
                    />

                ))}

            </div>

            <div className="h-72 bg-slate-200 rounded-xl"></div>

            <div className="h-72 bg-slate-200 rounded-xl"></div>

        </div>

    );

}

export default SkeletonDashboard;