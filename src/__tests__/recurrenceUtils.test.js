import { getRecurringDates } from "../utils/recurrenceUtils";
import { format } from "date-fns";

describe("getRecurringDates", () => {
  it("returns daily recurring dates", () => {
    const dates = getRecurringDates({
      frequency: "daily",
      interval: 2,
      weekdays: [],
      pattern: "none",
      startDate: "2024-01-01",
      endDate: "2024-01-07",
    });
    expect(dates.map((d) => format(d, "yyyy-MM-dd"))).toEqual([
      "2024-01-01",
      "2024-01-03",
      "2024-01-05",
      "2024-01-07",
    ]);
  });

  it("returns weekly recurring dates on selected weekdays", () => {
    const dates = getRecurringDates({
      frequency: "weekly",
      interval: 1,
      weekdays: [1, 3], // Mon, Wed
      pattern: "none",
      startDate: "2024-01-01",
      endDate: "2024-01-14",
    });
    expect(dates.map((d) => format(d, "yyyy-MM-dd"))).toContain("2024-01-01"); // Tue
    expect(dates.map((d) => format(d, "yyyy-MM-dd"))).toContain("2024-01-03"); // Wed
  });

  it("returns monthly recurring dates", () => {
    const dates = getRecurringDates({
      frequency: "monthly",
      interval: 1,
      weekdays: [],
      pattern: "none",
      startDate: "2024-01-15",
      endDate: "2024-03-15",
    });
    expect(dates.map((d) => format(d, "yyyy-MM-dd"))).toEqual([
      "2024-01-15",
      "2024-02-15",
      "2024-03-15",
    ]);
  });

  it("returns yearly recurring dates", () => {
    const dates = getRecurringDates({
      frequency: "yearly",
      interval: 1,
      weekdays: [],
      pattern: "none",
      startDate: "2020-01-01",
      endDate: "2022-01-01",
    });
    expect(dates.map((d) => format(d, "yyyy-MM-dd"))).toEqual([
      "2020-01-01",
      "2021-01-01",
      "2022-01-01",
    ]);
  });

  it("returns empty if no startDate", () => {
    const dates = getRecurringDates({
      frequency: "daily",
      interval: 1,
      weekdays: [],
      pattern: "none",
      startDate: "",
      endDate: "2024-01-01",
    });
    expect(dates).toEqual([]);
  });
}); 