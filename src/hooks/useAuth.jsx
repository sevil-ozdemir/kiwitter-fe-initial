import { useState } from "react";
import { getAuthToken, removeAuthToken, setAuthToken } from "../utils/auth.js";

export default function useAuth() {

  const [isLoggedIn, setIsLoggedIn] = useState(!!getAuthToken());

  const login = (token) => {

    setIsLoggedIn(true);

    setAuthToken(token);
  };

  const logout = () => {

    setIsLoggedIn(false);

    removeAuthToken();
  };

  return { isLoggedIn, login, logout };
}