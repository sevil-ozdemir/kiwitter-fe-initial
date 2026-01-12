import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  username: null,
  name: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      // action.payload token olabilir veya { token, username, name } objesi olabilir
      if (typeof action.payload === "string") {
        state.token = action.payload;
      } else {
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.name = action.payload.name;
      }
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.name = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
