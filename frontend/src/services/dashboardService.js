import api from "./api";

export const getApplicationSummary = (userId) =>
    api.get(`/applications/user/${userId}/summary`);