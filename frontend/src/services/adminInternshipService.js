import api from "./api";

export const getAllInternships = () =>
    api.get("/internships");

export const createInternship = (data) =>
    api.post("/internships", data);

export const updateInternship = (id, data) =>
    api.put(`/internships/${id}`, data);

export const deleteInternship = (id) =>
    api.delete(`/internships/${id}`);

export const filterInternships = (filters) =>
    api.get("/internships/filter", {

        params: filters

    });