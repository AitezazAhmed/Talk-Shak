import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "https://talk-shak-7.onrender.com",
  withCredentials: true,
});
  
