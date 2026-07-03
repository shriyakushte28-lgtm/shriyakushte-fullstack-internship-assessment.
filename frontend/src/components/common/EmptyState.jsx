import { Search } from "lucide-react";

function EmptyState({
    icon: Icon = Search,
    title,
    description,
    buttonText,
    onButtonClick
}) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm py-14 px-6 text-center">

            <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center">
                    <Icon size={30} className="text-slate-400" />
                </div>
            </div>

            <h2 className="text-lg font-bold text-slate-900">
                {title}
            </h2>

            <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
                {description}
            </p>

            {buttonText && (
                <button
                    onClick={onButtonClick}
                    className="mt-6 btn-primary py-2 px-5 text-sm"
                >
                    {buttonText}
                </button>
            )}

        </div>
    );
}

export default EmptyState;