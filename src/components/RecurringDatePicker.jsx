import React from "react";
import RecurrenceOptions from "./RecurrenceOptions";
import DatePickerUI from "./DatePickerUI";
import CalendarPreview from "./CalendarPreview";

export default function RecurringDatePicker() {
  return (
    <div className="flex flex-col gap-8">
      <section className="bg-white rounded-lg shadow border border-gray-100 p-5">
        <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-blue-400 rounded-full"></span>
          Recurrence Rules
        </h2>
        <RecurrenceOptions />
      </section>
      <section className="bg-white rounded-lg shadow border border-gray-100 p-5">
        <h2 className="text-xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-purple-400 rounded-full"></span>
          Date & Time
        </h2>
        <DatePickerUI />
      </section>
      <section className="bg-white rounded-lg shadow border border-gray-100 p-5">
        <CalendarPreview />
      </section>
    </div>
  );
} 