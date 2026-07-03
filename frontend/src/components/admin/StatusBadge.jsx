function StatusBadge({ status }) {
    if (status === "OPEN" || status === "ACTIVE") {
        return (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 border border-emerald-100 text-emerald-700">
                Open
            </span>
        );
    }
    return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-100 border border-zinc-200 text-zinc-650">
            Closed
        </span>
    );
}

export default StatusBadge;