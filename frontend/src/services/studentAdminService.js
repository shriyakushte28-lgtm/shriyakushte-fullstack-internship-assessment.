import api from "./api";

export const getStudents = () =>
    api.get("/admin/students");

export const getStudent = (id) =>
    api.get(`/admin/students/${id}`);