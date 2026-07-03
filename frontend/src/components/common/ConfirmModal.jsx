function ConfirmModal({
    open,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    danger = false
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 p-6">

                <h2 className="text-xl font-bold text-slate-900">
                    {title}
                </h2>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {message}
                </p>

                <div className="mt-6 flex justify-end gap-3">

                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition cursor-pointer"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 rounded-lg text-white transition cursor-pointer
                        ${
                            danger
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {confirmText}
                    </button>

                </div>

            </div>
        </div>
    );
}

export default ConfirmModal;