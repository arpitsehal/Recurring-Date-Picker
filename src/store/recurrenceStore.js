import create from "zustand";

export const useRecurrenceStore = create((set) => ({
  frequency: "daily",
  interval: 1,
  weekdays: [], // [0-6] for Sun-Sat
  pattern: "none", // none, first, second, etc.
  startDate: "",
  endDate: "",
  exclusionDates: [], // array of YYYY-MM-DD strings
  endAfterOccurrences: "", // number or empty string
  startTime: "", // HH:mm
  endTime: "", // HH:mm
  rules: [
    {
      frequency: "daily",
      interval: 1,
      weekdays: [],
      pattern: "none",
    },
  ],
  locale: "en-US",
  dateFormat: "yyyy-MM-dd",
  setFrequency: (frequency) => set({ frequency }),
  setInterval: (interval) => set({ interval }),
  setWeekdays: (weekdays) => set({ weekdays }),
  setPattern: (pattern) => set({ pattern }),
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
  setExclusionDates: (exclusionDates) => set({ exclusionDates }),
  setEndAfterOccurrences: (endAfterOccurrences) => set({ endAfterOccurrences }),
  setStartTime: (startTime) => set({ startTime }),
  setEndTime: (endTime) => set({ endTime }),
  addRule: (rule) => set((state) => ({ rules: [...state.rules, rule] })),
  updateRule: (idx, rule) => set((state) => ({ rules: state.rules.map((r, i) => (i === idx ? rule : r)) })),
  removeRule: (idx) => set((state) => ({ rules: state.rules.filter((_, i) => i !== idx) })),
  setLocale: (locale) => set({ locale }),
  setDateFormat: (dateFormat) => set({ dateFormat }),
})); 