import { render, screen, fireEvent, act } from "@testing-library/react";
import Toast from "./Toast";
import "@testing-library/jest-dom";

describe("Toast component", () => {
  jest.useFakeTimers(); // Używamy fake timers do testowania setTimeout

  const mockOnClose = jest.fn();

  it("renders with the given message and optional image", () => {
    render(<Toast message="Test message" imageSrc="test-image.png" onClose={mockOnClose} />);

    // Sprawdź, czy wyświetlany jest komunikat
    expect(screen.getByText("Test message")).toBeInTheDocument();

    // Sprawdź, czy obraz jest wyświetlany
    const image = screen.getByAltText("Error Icon");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-image.png");
  });

  it("calls onClose when close button is clicked", () => {
    render(<Toast message="Test message" onClose={mockOnClose} />);

    // Kliknij przycisk zamykania
    const closeButton = screen.getByText("×");
    fireEvent.click(closeButton);

    // Sprawdź, czy funkcja onClose została wywołana
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onClose automatically after 10 seconds", () => {
    render(<Toast message="Test message" onClose={mockOnClose} />);

    // Przyspiesz zegary o 10 sekund
    act(() => {
      jest.advanceTimersByTime(10000);
    });

    // Sprawdź, czy funkcja onClose została wywołana
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onClose when clicking outside the toast", () => {
    render(<Toast message="Test message" onClose={mockOnClose} />);

    // Kliknięcie poza obszarem toastu
    fireEvent.mouseDown(document);

    // Sprawdź, czy funkcja onClose została wywołana
    expect(mockOnClose).toHaveBeenCalled();
  });
});
