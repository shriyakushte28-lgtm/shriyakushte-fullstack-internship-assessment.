import api from "./api";

export const getApplicationSummary = (studentId) =>
    api.get(`/applications/student/${studentId}/summary`);