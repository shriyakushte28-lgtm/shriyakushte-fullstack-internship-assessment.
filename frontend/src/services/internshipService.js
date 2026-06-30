import api from "./api";

export const getAllInternships = () =>
    api.get("/internships");

export const getLatestInternships = () =>
    api.get("/internships/latest");

export const getInternshipCount = () =>
    api.get("/internships/count");

export const getInternshipById = (id) =>
    api.get(`/internships/${id}`);