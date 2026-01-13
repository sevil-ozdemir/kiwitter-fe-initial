import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import twitsReducer from "./twitsSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    twits: twitsReducer,
  },
});

export default store;
