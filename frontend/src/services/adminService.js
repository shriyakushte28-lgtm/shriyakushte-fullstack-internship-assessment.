import api from "./api";

export const getStatistics = () =>
    api.get("/admin/statistics");

export const getDashboardData = () =>
    api.get("/admin/dashboard");

export const getAnalytics = () =>
    api.get("/admin/analytics");