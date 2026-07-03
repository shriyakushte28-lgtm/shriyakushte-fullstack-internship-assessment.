import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import {
    getNotifications,
    getUnreadCount,
    markAsRead
} from "../../services/notificationService";

function NotificationBell() {

    const userId = Number(localStorage.getItem("userId"));

    const [notifications, setNotifications] = useState([]);
    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {

        loadNotifications();

    }, []);

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }

        }

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

    }, []);

    async function loadNotifications() {

        try {

            const notificationResponse =
                await getNotifications(userId);

            setNotifications(notificationResponse.data);

            const countResponse =
                await getUnreadCount(userId);

            setCount(countResponse.data);

        }

        catch (error) {

            console.log(error);

        }

    }

    async function handleNotification(notification) {

        if (!notification.isRead) {

            await markAsRead(notification.id);

            loadNotifications();

        }

    }

    function formatDate(date) {

        return new Date(date).toLocaleDateString();

    }

    return (

        <div
            className="relative"
            ref={dropdownRef}
        >

            <button

                onClick={() => setOpen(!open)}

                className="relative p-2 rounded-lg hover:bg-slate-100 transition"

            >

                <Bell size={18} />

                {

                    count > 0 &&

                    <span
                        className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full"
                    >

                        {count}

                    </span>

                }

            </button>

            {

                open &&

                <div
                    className="absolute right-0 mt-3 w-96 bg-white rounded-xl border border-slate-200 shadow-xl z-50"
                >

                    <div className="p-4 border-b">

                        <h2 className="font-bold text-lg">

                            Notifications

                        </h2>

                    </div>

                    <div className="max-h-96 overflow-y-auto">

                        {

                            notifications.length === 0 ?

                                <div className="p-6 text-center text-slate-500">

                                    No notifications

                                </div>

                                :

                                notifications.map(notification => (

                                    <div

                                        key={notification.id}

                                        onClick={() =>
                                            handleNotification(notification)
                                        }

                                        className={`p-4 border-b cursor-pointer hover:bg-slate-50 transition
                                        ${notification.isRead
                                                ? "bg-white"
                                                : "bg-blue-50"
                                            }`}

                                    >

                                        <h3 className="font-semibold">

                                            {notification.title}

                                        </h3>

                                        <p className="text-sm text-slate-600 mt-1">

                                            {notification.message}

                                        </p>

                                        <p className="text-xs text-slate-400 mt-2">

                                            {formatDate(notification.createdAt)}

                                        </p>

                                    </div>

                                ))

                        }

                    </div>

                </div>

            }

        </div>

    );

}

export default NotificationBell;