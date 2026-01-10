import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // MirageJS namespace
});

export default axiosInstance;
