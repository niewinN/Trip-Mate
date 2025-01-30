import { render, screen } from "@testing-library/react";
import HeaderIcon from "./HeaderIcon";
import "@testing-library/jest-dom";

describe("HeaderIcon component", () => {
  it("renders the icon and title", () => {
    render(<HeaderIcon icon={<span data-testid="test-icon">🔍</span>} title="Search" />);

    // Sprawdź, czy ikona jest renderowana
    const icon = screen.getByTestId("test-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveTextContent("🔍");

    // Sprawdź, czy tytuł jest renderowany
    const title = screen.getByText("Search");
    expect(title).toBeInTheDocument();
  });
});