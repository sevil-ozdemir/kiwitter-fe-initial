import { setToken, removeToken } from "./axios.js";

// Token set etme
export const setAuthToken = (token) => {
  if (token) {
    console.debug("Authentication token: ", token);

    // localStorage'a kaydet
    localStorage.setItem("token", token);

    // axios instance'a token ekle
    setToken(token);
  }
};

// Token alma
export const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Token silme
export const removeAuthToken = () => {
  // localStorage'dan temizle
  localStorage.removeItem("token");

  // axios instance'dan kaldır
  removeToken();
};
