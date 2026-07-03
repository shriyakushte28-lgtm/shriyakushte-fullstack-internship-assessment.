function FeatureCard({ icon, title, description }) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-slate-350 transition-all duration-150">
            <div className="text-2xl h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-150">
                {icon}
            </div>
            <h3 className="text-sm font-bold text-slate-900 mt-4">
                {title}
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {description}
            </p>
        </div>
    );
}

export default FeatureCard;