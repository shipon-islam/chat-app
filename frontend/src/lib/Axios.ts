import axios from "axios";
export const baseURL =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000";
const localSession = localStorage.getItem("session");
const session = localSession ? JSON.parse(localSession) : {};

export const Axios = axios.create({
  baseURL: baseURL,
  headers: { Authorization: "Bearer " + session.token },
});
