import { createSlice } from "@reduxjs/toolkit";
import { setAuthToken, removeAuthToken } from "./utils/auth.js";
import { jwtDecode } from "jwt-decode";

const initialState = {
  token: null,
  username: null,
  name: null,
  role: "user",
  id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const token = action.payload?.token || action.payload; // hem {token} hem direkt string desteklenir
      if (token) {
        const decoded = jwtDecode(token);

        state.token = token;
        state.username = decoded.username || state.username;
        state.name = decoded.name || state.name;
        state.role = decoded.role || state.role;
        state.id = decoded.id || state.id;

        setAuthToken(token); // axios header ayarı
      }
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.name = null;
      state.role = "user";
      state.id = null;

      removeAuthToken(); // axios header temizleme
    },
  },
});

export const { login, logout } = userSlice.actions;

// Kullanıcı bilgisini almak için selector
export const selectUser = (state) => ({
  id: state.user.id,
  username: state.user.username,
  name: state.user.name,
  role: state.user.role,
});

export default userSlice.reducer;
