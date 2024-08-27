import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders search label", () => {
  render(<App />);
  const labelElement = screen.getByText(/Search/i);
  expect(labelElement).toBeInTheDocument();
});
