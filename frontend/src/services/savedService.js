import api from "./api";

export const saveInternship = (data) =>
    api.post("/saved", data);

export const getSavedInternships = (userId) =>
    api.get(`/saved/user/${userId}`);

export const removeSavedInternship = (userId, internshipId) =>
    api.delete(`/saved/${userId}/${internshipId}`);

export const checkSavedInternship = (userId, internshipId) =>
    api.get(`/saved/check/${userId}/${internshipId}`);