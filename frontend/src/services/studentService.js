import api from "./api";

export const getAllStudents = () =>
    api.get("/profile/admin/students");

export const getStudentById = (id) =>
    api.get(`/profile/admin/students/${id}`);