function SkeletonCard() {
    return (
        <div className="bg-white border border-slate-200 rounded-xl p-4 animate-pulse">

            <div className="h-4 w-20 bg-slate-200 rounded"></div>

            <div className="mt-4 h-6 w-3/4 bg-slate-200 rounded"></div>

            <div className="mt-2 h-4 w-1/2 bg-slate-200 rounded"></div>

            <div className="mt-6 space-y-2">
                <div className="h-3 bg-slate-200 rounded"></div>
                <div className="h-3 w-5/6 bg-slate-200 rounded"></div>
            </div>

            <div className="mt-6 h-9 bg-slate-200 rounded-lg"></div>

        </div>
    );
}

export default SkeletonCard;