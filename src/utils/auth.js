import { setToken, removeToken } from "./axios.js";

export const setAuthToken = (token) => {

  console.debug("Authentication token: ", token);

  localStorage.setItem("token", token);

  setToken(token);
}

export const getAuthToken = () => {

  return localStorage.getItem("token");
}

export const removeAuthToken = () => {
  localStorage.removeItem("token");

  removeToken();
}