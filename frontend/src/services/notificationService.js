import api from "./api";

export const getNotifications = (userId) =>
    api.get(`/notifications/user/${userId}`);

export const getUnreadCount = (userId) =>
    api.get(`/notifications/count/${userId}`);

export const markAsRead = (id) =>
    api.put(`/notifications/${id}/read`);