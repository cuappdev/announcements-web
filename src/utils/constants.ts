/**
 * A collection of constant values used throughout the application.
 */
export const Constants = {
  api: {
    baseUrl: process.env.BASE_URL || "http://localhost:8000",
  },
  pagePath: {
    default: "/",
    landing: "/landing",
    login: "/login",
    past: "/past",
  },
  queryKey: {
    fetchAnnouncements: "fetchAnnouncements",
    fetchUsers: "fetchUsers",
  },
  storage: {
    debugKey: "debugKey",
    userKey: "userKey",
  },
  text: {
    empty: "There's nothing to show here.",
  },
  timer: {
    loadingScreen: 1 * 1000,
  },
};
