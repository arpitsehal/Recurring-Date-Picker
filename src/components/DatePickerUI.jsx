import React, { useState } from "react";
import { useRecurrenceStore } from "../store/recurrenceStore";

export default function DatePickerUI() {
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    exclusionDates,
    setExclusionDates,
    endAfterOccurrences,
    setEndAfterOccurrences,
    startTime,
    endTime,
    setStartTime,
    setEndTime,
  } = useRecurrenceStore();
  const [excludeInput, setExcludeInput] = useState("");
  const [endType, setEndType] = useState(endDate ? "date" : endAfterOccurrences ? "occurrences" : "date");

  const addExclusionDate = () => {
    if (excludeInput && !exclusionDates.includes(excludeInput)) {
      setExclusionDates([...exclusionDates, excludeInput]);
      setExcludeInput("");
    }
  };

  const removeExclusionDate = (date) => {
    setExclusionDates(exclusionDates.filter((d) => d !== date));
  };

  const handleEndTypeChange = (type) => {
    setEndType(type);
    if (type === "date") {
      setEndAfterOccurrences("");
    } else {
      setEndDate("");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-6 items-end">
        <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
          <label className="block text-sm font-medium text-blue-700 mb-1 flex items-center gap-1">
            <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Start Date
          </label>
          <input
            type="date"
            className="border rounded px-2 py-1 focus:ring focus:ring-blue-200"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            title="Pick the start date for recurrence"
          />
        </div>
        <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
          <label className="block text-sm font-medium text-purple-700 mb-1 flex items-center gap-1">
            <svg className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            End Condition
          </label>
          <div className="flex items-center gap-2 mb-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="endType"
                value="date"
                checked={endType === "date"}
                onChange={() => handleEndTypeChange("date")}
                title="End by date"
              />
              <span className="ml-1 text-sm">End by date</span>
            </label>
            <input
              type="date"
              className="border rounded px-2 py-1 ml-2 focus:ring focus:ring-purple-200"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={endType !== "date"}
              title="Pick the end date"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="endType"
                value="occurrences"
                checked={endType === "occurrences"}
                onChange={() => handleEndTypeChange("occurrences")}
                title="End after N occurrences"
              />
              <span className="ml-1 text-sm">End after</span>
            </label>
            <input
              type="number"
              min={1}
              className="border rounded px-2 py-1 w-20 ml-2 focus:ring focus:ring-purple-200"
              value={endAfterOccurrences}
              onChange={(e) => setEndAfterOccurrences(e.target.value.replace(/[^0-9]/g, ""))}
              disabled={endType !== "occurrences"}
              title="Number of occurrences"
            />
            <span className="text-sm">occurrences</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-6 items-end">
        <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
          <label className="block text-sm font-medium text-blue-700 mb-1 flex items-center gap-1">
            <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 4a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Start Time
          </label>
          <input
            type="time"
            className="border rounded px-2 py-1 focus:ring focus:ring-blue-200"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            title="Pick the start time"
          />
        </div>
        <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
          <label className="block text-sm font-medium text-purple-700 mb-1 flex items-center gap-1">
            <svg className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 4a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            End Time
          </label>
          <input
            type="time"
            className="border rounded px-2 py-1 focus:ring focus:ring-purple-200"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            title="Pick the end time"
          />
        </div>
      </div>
      <div className="mb-2 mt-4">
        <label className="block text-sm font-medium mb-1 text-pink-700 flex items-center gap-1">
          <svg className="h-4 w-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 4a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Exclusion Dates
        </label>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="date"
            className="border rounded px-2 py-1 focus:ring focus:ring-pink-200"
            value={excludeInput}
            onChange={(e) => setExcludeInput(e.target.value)}
            title="Add a date to exclude"
          />
          <button
            type="button"
            className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 shadow transition"
            onClick={addExclusionDate}
            disabled={!excludeInput || exclusionDates.includes(excludeInput)}
            title="Add exclusion date"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {exclusionDates.map((date) => (
            <span key={date} className="inline-flex items-center bg-pink-100 border border-pink-200 rounded px-2 py-1 text-xs text-pink-700 font-medium shadow-sm mb-1">
              {date}
              <button
                type="button"
                className="ml-1 text-pink-600 hover:text-pink-800"
                onClick={() => removeExclusionDate(date)}
                aria-label={`Remove ${date}`}
                title="Remove exclusion date"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 