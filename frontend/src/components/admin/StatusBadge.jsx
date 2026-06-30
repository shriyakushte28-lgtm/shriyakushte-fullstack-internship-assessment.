function StatusBadge({ status }) {

    if (status === "OPEN") {

        return (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                Open
            </span>
        );

    }

    return (
        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
            Closed
        </span>
    );

}

export default StatusBadge;