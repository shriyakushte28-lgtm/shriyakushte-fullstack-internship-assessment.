import api from "./api";

export const getProfile = (userId) =>
    api.get(`/profile/${userId}`);

export const createProfile = (userId, data) =>
    api.post(`/profile/${userId}`, data);

export const updateProfile = (userId, data) =>
    api.put(`/profile/${userId}`, data);

export const getProfileCompletion = (userId) =>
    api.get(`/profile/${userId}/completion`);