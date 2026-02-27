import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Spinner from "./Spinner.jsx";

describe("Spinner", () => {
  it("renders with default label", () => {
    render(<Spinner />);
    expect(
      screen.getByRole("status", { name: "Yükleniyor" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Yükleniyor")).toBeInTheDocument();
  });

  it("renders with custom label", () => {
    render(<Spinner label="Ürünler yükleniyor" />);
    expect(
      screen.getByRole("status", { name: "Ürünler yükleniyor" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Ürünler yükleniyor")).toBeInTheDocument();
  });

  it("has accessible live region", () => {
    const { container } = render(<Spinner label="Yükleniyor" />);
    const status = container.querySelector('[aria-live="polite"]');
    expect(status).toBeInTheDocument();
  });
});
