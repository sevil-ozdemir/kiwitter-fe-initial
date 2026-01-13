import axios from "axios";

// Axios instance oluşturuluyor
const axiosInstance = axios.create({
  baseURL: "https://uppro-0825.workintech.com.tr/",
});

// Token ekleme
export const setToken = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Token silme
export const removeToken = () => {
  delete axiosInstance.defaults.headers.common["Authorization"];
};

export default axiosInstance;
