import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RecurringDatePicker from "../components/RecurringDatePicker";
import { useRecurrenceStore } from "../store/recurrenceStore";

// Reset Zustand store before each test
beforeEach(() => {
  const { setFrequency, setInterval, setStartDate, setEndDate, setWeekdays, setPattern } = useRecurrenceStore.getState();
  setFrequency("daily");
  setInterval(1);
  setStartDate("");
  setEndDate("");
  setWeekdays([]);
  setPattern("none");
});

describe("RecurringDatePicker integration", () => {
  it("renders and updates calendar preview for daily recurrence", () => {
    render(<RecurringDatePicker />);
    // Set start date
    const startInput = screen.getByLabelText(/start date/i);
    fireEvent.change(startInput, { target: { value: "2024-01-01" } });
    // Set end date
    const endInput = screen.getByLabelText(/end date/i);
    fireEvent.change(endInput, { target: { value: "2024-01-05" } });
    // Set interval to 2
    const intervalInput = screen.getByRole("spinbutton");
    fireEvent.change(intervalInput, { target: { value: 2 } });
    // Calendar should show 1, 3, 5 highlighted
    expect(screen.getByText("1").className).toMatch(/bg-blue-500/);
    expect(screen.getByText("3").className).toMatch(/bg-blue-500/);
    expect(screen.getByText("5").className).toMatch(/bg-blue-500/);
  });
}); 