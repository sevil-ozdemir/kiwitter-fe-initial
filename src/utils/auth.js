import axios from "./axios.js";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export const removeAuthToken = () => {
  delete axios.defaults.headers.common["Authorization"];
};
