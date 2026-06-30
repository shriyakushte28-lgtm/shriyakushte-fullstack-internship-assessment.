import api from "./api";

export const getAllApplications = () =>
    api.get("/applications");

export const updateApplicationStatus = (id, status) =>
    api.put(`/applications/${id}/status?status=${status}`);