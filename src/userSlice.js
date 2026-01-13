import { createSlice } from "@reduxjs/toolkit";

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
      const payload = action.payload || {};
      state.token = payload.token || null;
      state.username = payload.username || state.username;
      state.name = payload.name || state.name;
      state.role = payload.role || state.role;
      state.id = payload.id || state.id;
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.name = null;
      state.role = "user";
      state.id = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
