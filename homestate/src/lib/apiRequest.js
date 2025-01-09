import axios from "axios";

export const apiRequest = axios.create({
  baseURL: "https://real-state-mw35.vercel.app/api/",
  withCredentials: true,
});
