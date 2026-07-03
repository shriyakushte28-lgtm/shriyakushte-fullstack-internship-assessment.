import { Bell, MailOpen } from "lucide-react";

function Notifications() {
    const notifications = [
        {
            title: "Welcome to InternSphere",
            description: "Your student dashboard account has been set up successfully.",
            time: "Today"
        },
        {
            title: "Complete your Profile",
            description: "Provide your education and skills details to find matching roles.",
            time: "Today"
        },
        {
            title: "System Parameters Ready",
            description: "Backend authentication protocols are fully operational.",
            time: "Yesterday"
        }
    ];

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3.5">
                <div>
                    <h2 className="text-sm font-bold text-slate-900">
                        Notifications Alert
                    </h2>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                        Stay updated on application cycles
                    </p>
                </div>
                <Bell size={16} className="text-slate-400" />
            </div>

            <div className="space-y-2.5">
                {notifications.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-2.5 p-2.5 border border-slate-100 bg-slate-50/20 rounded-lg hover:bg-slate-50/50 hover:border-slate-200 transition-all duration-150"
                    >
                        <div className="bg-white p-1 rounded-md border border-slate-150 text-slate-700 shadow-sm shrink-0">
                            <MailOpen size={12} className="text-slate-500" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-bold text-xs text-slate-900 leading-tight">
                                {item.title}
                            </h3>
                            <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">
                                {item.description}
                            </p>
                            <span className="text-[9px] text-slate-400 font-semibold mt-1 block">
                                {item.time}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notifications;