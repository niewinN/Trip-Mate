import { render, screen, fireEvent } from "@testing-library/react";
import HotelSearchPanel from "./HotelSearchPanel";
import "@testing-library/jest-dom";

describe("HotelSearchPanel component", () => {
  const mockSetQuery = jest.fn();
  const mockSetCheckInDate = jest.fn();
  const mockSetCheckOutDate = jest.fn();
  const mockSetGuests = jest.fn();
  const mockSetRooms = jest.fn();
  const mockOnSearch = jest.fn();

  it("renders all form fields with correct labels", () => {
    render(
      <HotelSearchPanel
        query=""
        checkInDate=""
        checkOutDate=""
        guests={1}
        rooms={1}
        setQuery={mockSetQuery}
        setCheckInDate={mockSetCheckInDate}
        setCheckOutDate={mockSetCheckOutDate}
        setGuests={mockSetGuests}
        setRooms={mockSetRooms}
        onSearch={mockOnSearch}
      />
    );

    // Sprawdź etykiety i pola
    expect(screen.getByLabelText("City")).toBeInTheDocument();
    expect(screen.getByLabelText("Check in")).toBeInTheDocument();
    expect(screen.getByLabelText("Check out")).toBeInTheDocument();
    expect(screen.getByLabelText("Guests")).toBeInTheDocument();
    expect(screen.getByLabelText("Rooms")).toBeInTheDocument();
  });

  it("updates values in form fields", () => {
    render(
      <HotelSearchPanel
        query=""
        checkInDate=""
        checkOutDate=""
        guests={1}
        rooms={1}
        setQuery={mockSetQuery}
        setCheckInDate={mockSetCheckInDate}
        setCheckOutDate={mockSetCheckOutDate}
        setGuests={mockSetGuests}
        setRooms={mockSetRooms}
        onSearch={mockOnSearch}
      />
    );

    // Aktualizacja miasta
    fireEvent.change(screen.getByLabelText("City"), { target: { value: "Berlin" } });
    expect(mockSetQuery).toHaveBeenCalledWith("Berlin");

    // Aktualizacja daty przyjazdu
    fireEvent.change(screen.getByLabelText("Check in"), { target: { value: "2023-12-01" } });
    expect(mockSetCheckInDate).toHaveBeenCalledWith("2023-12-01");

    // Aktualizacja daty wyjazdu
    fireEvent.change(screen.getByLabelText("Check out"), { target: { value: "2023-12-05" } });
    expect(mockSetCheckOutDate).toHaveBeenCalledWith("2023-12-05");

    // Aktualizacja liczby gości
    fireEvent.change(screen.getByLabelText("Guests"), { target: { value: 3 } });
    expect(mockSetGuests).toHaveBeenCalledWith(3);

    // Aktualizacja liczby pokoi
    fireEvent.change(screen.getByLabelText("Rooms"), { target: { value: 2 } });
    expect(mockSetRooms).toHaveBeenCalledWith(2);
  });

  it("calls onSearch when the search button is clicked", () => {
    render(
      <HotelSearchPanel
        query="Berlin"
        checkInDate="2023-12-01"
        checkOutDate="2023-12-05"
        guests={3}
        rooms={2}
        setQuery={mockSetQuery}
        setCheckInDate={mockSetCheckInDate}
        setCheckOutDate={mockSetCheckOutDate}
        setGuests={mockSetGuests}
        setRooms={mockSetRooms}
        onSearch={mockOnSearch}
      />
    );

    // Kliknij przycisk "Szukaj"
    fireEvent.click(screen.getByText("Szukaj"));

    // Sprawdź, czy funkcja onSearch została wywołana
    expect(mockOnSearch).toHaveBeenCalled();
  });
});
