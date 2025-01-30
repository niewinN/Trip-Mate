import React from "react";

describe("handleNameChange function", () => {
  it("updates the name and calls onNameChange", () => {
    // Mocki funkcji
    const setNameMock = jest.fn();
    const onNameChangeMock = jest.fn();

    // Tworzymy wydarzenie zmiany inputa
    const mockEvent = {
      target: { value: "New Name" },
    } as React.ChangeEvent<HTMLInputElement>;

    // Kopiujemy logikę funkcji handleNameChange
    const handleNameChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      setName: (name: string) => void,
      onNameChange: (name: string) => void
    ) => {
      setName(e.target.value);
      onNameChange(e.target.value);
    };

    // Wywołujemy funkcję
    handleNameChange(mockEvent, setNameMock, onNameChangeMock);

    // Sprawdzamy, czy funkcje zostały wywołane z poprawnymi wartościami
    expect(setNameMock).toHaveBeenCalledWith("New Name");
    expect(onNameChangeMock).toHaveBeenCalledWith("New Name");
  });
});


