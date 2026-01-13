import axios from "axios";

const instance = axios.create({
  baseURL: "https://uppro-0825.workintech.com.tr/",
});

export const setToken = (token) => {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

export default instance;
