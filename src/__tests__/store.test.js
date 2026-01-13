import { configureStore } from "@reduxjs/toolkit";
import userReducer, { login } from "../userSlice.js";
import axios, { setToken } from "../utils/axios.js";

describe("Redux Store and userSlice tests", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer,
      },
    });
  });

  test("login action should update the store with token", () => {
    const fakeToken = "testToken123";
    store.dispatch(login(fakeToken));

    const state = store.getState();
    expect(state.user.token).toBe(fakeToken);
  });

  test("setToken should set Authorization header when token exists", () => {
    const fakeToken = "headerToken456";
    setToken(fakeToken);

    expect(axios.defaults.headers.common["Authorization"]).toBe(
      `Bearer ${fakeToken}`
    );
  });

  test("setToken should remove Authorization header when token is null", () => {
    setToken(null);

    expect(axios.defaults.headers.common["Authorization"]).toBeUndefined();
  });
});
