import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "../pages/Signup";
import { BrowserRouter } from "react-router-dom";

// axios'u mockla
jest.mock("../utils/axios.js", () => ({
  post: jest.fn(),
}));

describe("Signup Page", () => {
  test("zorunlu alanlar boş bırakıldığında hata mesajı gösterilmeli", async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole("button", { name: /kayıt ol/i });
    await userEvent.click(submitButton);

    expect(await screen.findByText(/Bu alan zorunlu/i)).toBeInTheDocument();
  });

  test("geçersiz email girildiğinde hata mesajı gösterilmeli", async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    await userEvent.type(screen.getByLabelText(/Email/i), "yanlisEmail");
    const submitButton = screen.getByRole("button", { name: /kayıt ol/i });
    await userEvent.click(submitButton);

    expect(await screen.findByText(/Geçerli bir email adresi girin/i)).toBeInTheDocument();
  });
});
