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
  name: "user", // ✅ reducer adı doğru
  initialState,
  reducers: {
    login: (state, action) => {
      const token = action.payload?.token || action.payload;
      if (token) {
        try {
          const decoded = jwtDecode(token);

          state.token = token;
          state.username = decoded.username || null;
          state.name = decoded.name || null;
          state.role = decoded.role || "user";
          state.id = decoded.id || null;

          setAuthToken(token); // axios header ayarı
        } catch (err) {
          console.error("JWT decode failed", err);
        }
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

// ✅ Selector düzeltildi
export const selectUser = (state) => state.user;

export default userSlice.reducer;
