import api from "./api";

export const applyInternship = (data) =>
    api.post("/applications", data);

export const getStudentApplications = (studentId) =>
    api.get(`/applications/student/${studentId}`);