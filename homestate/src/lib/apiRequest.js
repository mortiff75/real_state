import axios from "axios";

export const apiRequest = axios.create({
  baseURL: "http://localhost:4000/api/",
  withCredentials: true,
});
