


import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../pages/Login";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import axios from "../utils/axios.js";

jest.mock("../utils/axios.js");

describe("Login Page", () => {
  test("nickname ve password boş bırakıldığında hata mesajı gösterilmeli", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const submitButton = screen.getByRole("button", { name: /giriş/i });
    await userEvent.click(submitButton);

    expect(await screen.findByText(/Bu alan zorunlu/i)).toBeInTheDocument();
  });

  test("başarılı login sonrası Redux store güncellenmeli", async () => {
    axios.post.mockResolvedValueOnce({ data: { token: "fakeToken" } });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    await userEvent.type(screen.getByLabelText(/Kullanıcı adı/i), "testuser");
    await userEvent.type(screen.getByLabelText(/Şifre/i), "password123");

    const submitButton = screen.getByRole("button", { name: /giriş/i });
    await userEvent.click(submitButton);

    expect(axios.post).toHaveBeenCalledWith("/login", {
      nickname: "testuser",
      password: "password123",
    });
  });
});
