import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL || "https://webhook.site";
const API = axios.create({ baseURL });

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
