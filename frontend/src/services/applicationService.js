import api from "./api";

export const applyInternship = (data) =>
    api.post("/applications", data);

export const getStudentApplications = (userId) =>
    api.get(`/applications/user/${userId}`);

export const getSummary = (userId) =>
    api.get(`/applications/user/${userId}/summary`);

export const getAllApplications = () =>
    api.get("/applications");