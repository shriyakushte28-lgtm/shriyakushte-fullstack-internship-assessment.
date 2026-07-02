import api from "./api";

export const getUser = (userId) =>
    api.get(`/users/${userId}`);

export const changePassword = (userId, data) =>
    api.put(`/users/${userId}/password`, data);

export const updateUser = (userId, data) =>
    api.put(`/users/${userId}`, data);