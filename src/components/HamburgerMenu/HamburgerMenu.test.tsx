import { render, screen, fireEvent } from "@testing-library/react";
import HamburgerMenu from "./HamburgerMenu";
import "@testing-library/jest-dom";

describe("HamburgerMenu component", () => {
  it("renders the hamburger button", () => {
    render(<HamburgerMenu />);

    // Sprawdź, czy przycisk hamburgera jest renderowany
    const hamburgerButton = screen.getByRole("button");
    expect(hamburgerButton).toBeInTheDocument();
  });

  it("toggles the menu state when the hamburger button is clicked", () => {
    render(<HamburgerMenu />);

    const hamburgerButton = screen.getByRole("button");

    // Kliknij przycisk, aby otworzyć menu
    fireEvent.click(hamburgerButton);
    const overlay = screen.getByRole("navigation").parentElement;
    expect(overlay).toHaveClass("open");

    // Kliknij przycisk ponownie, aby zamknąć menu
    fireEvent.click(hamburgerButton);
    expect(overlay).not.toHaveClass("open");
  });

  it("disables and enables scrolling when the menu is toggled", () => {
    render(<HamburgerMenu />);

    const hamburgerButton = screen.getByRole("button");

    // Kliknij przycisk, aby otworzyć menu
    fireEvent.click(hamburgerButton);
    expect(document.documentElement.style.overflow).toBe("hidden");
    expect(document.body.style.overflow).toBe("hidden");

    // Kliknij przycisk ponownie, aby zamknąć menu
    fireEvent.click(hamburgerButton);
    expect(document.documentElement.style.overflow).toBe("auto");
    expect(document.body.style.overflow).toBe("auto");
  });
});