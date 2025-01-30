import { render, screen, fireEvent } from "@testing-library/react";
import WeatherForm from "./WeatherForm";
import "@testing-library/jest-dom";

describe("WeatherForm component", () => {
  const mockOnCityChange = jest.fn();

  it("renders with correct label value", () => {
    render(
      <WeatherForm
        city="Warsaw"
        labelValue="Search City"
        onCityChange={mockOnCityChange}
      />
    );

    // Sprawdź, czy etykieta jest renderowana poprawnie
    const label = screen.getByLabelText("Search City");
    expect(label).toBeInTheDocument();
  });

  it("updates input value on change", () => {
    render(
      <WeatherForm
        city="Warsaw"
        labelValue="Search City"
        onCityChange={mockOnCityChange}
      />
    );

    // Znajdź pole wejściowe
    const input = screen.getByPlaceholderText("Search city...");
    expect(input).toBeInTheDocument();

    // Symuluj wpisywanie tekstu
    fireEvent.change(input, { target: { value: "Berlin" } });
    expect(input).toHaveValue("Berlin");
  });

  it("calls onCityChange when Enter is pressed", () => {
    render(
      <WeatherForm
        city="Warsaw"
        labelValue="Search City"
        onCityChange={mockOnCityChange}
      />
    );

    // Znajdź pole wejściowe
    const input = screen.getByPlaceholderText("Search city...");

    // Wpisz tekst i naciśnij Enter
    fireEvent.change(input, { target: { value: "Berlin" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    // Sprawdź, czy funkcja onCityChange została wywołana z poprawnym argumentem
    expect(mockOnCityChange).toHaveBeenCalledWith("Berlin");

    // Sprawdź, czy pole wejściowe zostało wyczyszczone
    expect(input).toHaveValue("");
  });
});
