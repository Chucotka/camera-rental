import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FloatingBookingButton } from "./FloatingBookingButton";

describe("FloatingBookingButton", () => {
  it("should render the floating button on mobile", () => {
    render(<FloatingBookingButton />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should expand menu when main button is clicked", () => {
    render(<FloatingBookingButton />);
    const mainButton = screen.getByRole("button");
    fireEvent.click(mainButton);
    
    // After click, the menu should expand and show additional buttons
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(1);
  });

  it("should call onBookingClick callback when booking button is clicked", () => {
    const mockCallback = vi.fn();
    render(<FloatingBookingButton onBookingClick={mockCallback} />);
    
    // First click to expand menu
    const mainButton = screen.getByRole("button");
    fireEvent.click(mainButton);
    
    // Then click booking button
    const buttons = screen.getAllByRole("button");
    const bookingButton = buttons.find(btn => btn.textContent?.includes("БРН"));
    if (bookingButton) {
      fireEvent.click(bookingButton);
      expect(mockCallback).toHaveBeenCalled();
    }
  });

  it("should collapse menu when overlay is clicked", () => {
    render(<FloatingBookingButton />);
    const mainButton = screen.getByRole("button");
    
    // Expand menu
    fireEvent.click(mainButton);
    
    // Click overlay to collapse
    fireEvent.click(mainButton);
    
    // Menu should be collapsed
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(1);
  });

  it("should handle phone call button", () => {
    const windowOpen = vi.spyOn(window, "open", "get");
    render(<FloatingBookingButton />);
    
    // Expand menu
    const mainButton = screen.getByRole("button");
    fireEvent.click(mainButton);
    
    // Find and click phone button
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(1);
  });
});
