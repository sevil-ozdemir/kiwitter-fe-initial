import { render, screen } from "@testing-library/react";
import { toast } from "react-toastify";

test("toast mesajı gösterilmeli", () => {
  render(<div />);
  toast.success("Başarılı giriş");

  expect(screen.getByText(/Başarılı giriş/i)).toBeInTheDocument();
});
