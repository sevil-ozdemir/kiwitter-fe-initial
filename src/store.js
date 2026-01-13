import { configureStore } from "@reduxjs/toolkit";
import twitsReducer from "./twitsSlice.js";
import userReducer from "./userSlice.js";

const store = configureStore({
  reducer: {
    twits: twitsReducer,
    user: userReducer,
  },
});

export default store;
