import { useEffect, useRef, useState } from "react";
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

            function handleClickOutside(event) {

        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {

            setOpen(false);

        }

    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {

        document.removeEventListener(
            "mousedown",
            handleClickOutside
        );

    };

        loadNotifications();

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

    async function handleNotificationClick(id) {

    try {

        await markAsRead(id);

        loadNotifications();

    }

    catch (error) {

        console.log(error);

    }

}

function getRelativeTime(date) {

    const now = new Date();

    const notificationDate = new Date(date);

    const seconds =
        Math.floor((now - notificationDate) / 1000);

    if (seconds < 60)
        return "Just now";

    if (seconds < 3600)
        return Math.floor(seconds / 60) + " min ago";

    if (seconds < 86400)
        return Math.floor(seconds / 3600) + " hrs ago";

    return Math.floor(seconds / 86400) + " days ago";

}

function getIcon(notification) {

    if (notification.title.includes("Accepted"))
        return "🎉";

    if (notification.title.includes("Shortlisted"))
        return "💼";

    if (notification.title.includes("Rejected"))
        return "❌";

    return "🔔";

}

    return (

        <div 
            ref={dropdownRef}
            className="relative"
        >

            <button
                onClick={() => setOpen(!open)}
                className="relative text-3xl"
            >

                🔔

                {

                    count > 0 && (

                        <span
                            className="absolute
                            -top-2
                            -right-2
                            bg-red-600
                            text-white
                            rounded-full
                            w-6
                            h-6
                            flex
                            items-center
                            justify-center
                            text-xs"
                        >

                            {count}

                        </span>

                    )

                }

            </button>

            {

                open && (

                    <div
                        className="absolute
                        right-0
                        mt-3
                        w-96
                        max-h-[500px]
                        overflow-y-auto
                        bg-white
                        rounded-xl
                        shadow-xl
                        border
                        z-50"
                    >

                        <div className="p-4 border-b">

                            <h2 className="font-bold text-xl">

                                Notifications

                            </h2>

                        </div>

                        {

                            notifications.length === 0 ?

                                (

                                    <div className="p-8 text-center text-gray-500">

                                        <div className="text-5xl mb-3">

                                            🔔

                                        </div>

                                        <p>No notifications yet.</p>

                                    </div>

                                )

                                :

                                notifications.map(notification => (

                                    <div
                                        key={notification.id}
                                        onClick={() => handleNotificationClick(notification.id)}
                                        className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                                            !notification.read
                                                ? "bg-blue-50"
                                                : ""
                                        }`}
                                    >

                                        <h3 className="font-semibold flex items-center gap-2">

                                            <span>{getIcon(notification)}</span>

                                            {notification.title}

                                        </h3>

                                        <p className="text-sm text-gray-600 mt-1">

                                            {notification.message}

                                        </p>

                                        <p className="text-xs text-gray-400 mt-2">

                                            {getRelativeTime(notification.createdAt)}

                                        </p>

                                    </div>

                                ))

                        }

                    </div>

                )

            }

        </div>

    );

}

export default NotificationBell;