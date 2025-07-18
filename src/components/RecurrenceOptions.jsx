import React from "react";
import { useRecurrenceStore } from "../store/recurrenceStore";

const frequencies = ["Daily", "Weekly", "Monthly", "Yearly"];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const patterns = ["none", "first", "second", "third", "fourth", "last"];

function RuleEditor({ rule, idx, updateRule, removeRule, canRemove }) {
  const handleChange = (field, value) => {
    updateRule(idx, { ...rule, [field]: value });
  };
  const handleWeekdayChange = (widx) => {
    if (rule.weekdays.includes(widx)) {
      handleChange("weekdays", rule.weekdays.filter((w) => w !== widx));
    } else {
      handleChange("weekdays", [...rule.weekdays, widx]);
    }
  };
  return (
    <div className="bg-blue-50/30 border border-blue-100 rounded-lg p-4 mb-4 shadow-sm relative">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-blue-700 font-medium">Repeat:</span>
        <select
          className="border rounded px-2 py-1 focus:ring focus:ring-blue-200"
          value={rule.frequency}
          onChange={(e) => handleChange("frequency", e.target.value)}
          title="How often should this rule repeat?"
        >
          {frequencies.map((freq) => (
            <option key={freq} value={freq.toLowerCase()}>{freq}</option>
          ))}
        </select>
        <span>every</span>
        <input
          type="number"
          min={1}
          value={rule.interval}
          onChange={(e) => handleChange("interval", Number(e.target.value))}
          className="w-16 border rounded px-2 py-1 focus:ring focus:ring-blue-200"
          title="Interval for this recurrence rule"
        />
        <span>time(s)</span>
        {canRemove && (
          <button
            type="button"
            className="ml-auto text-red-500 hover:text-red-700 text-xs border px-2 py-1 rounded flex items-center gap-1 transition"
            onClick={() => removeRule(idx)}
            title="Remove this rule"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            Remove
          </button>
        )}
      </div>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="mr-2 text-blue-700">On:</span>
        {weekdays.map((day, widx) => (
          <label key={day} className="inline-flex items-center mr-2 cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox accent-blue-500"
              checked={rule.weekdays.includes(widx)}
              onChange={() => handleWeekdayChange(widx)}
              title={`Include ${day}`}
            />
            <span className="ml-1 text-sm">{day}</span>
          </label>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="mr-2 text-blue-700">Pattern:</span>
        <select
          className="border rounded px-2 py-1 focus:ring focus:ring-blue-200"
          value={rule.pattern}
          onChange={(e) => handleChange("pattern", e.target.value)}
          title="Pattern for monthly recurrence"
        >
          {patterns.map((p) => (
            <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
          ))}
        </select>
        <span className="ml-2">weekday of the month</span>
      </div>
    </div>
  );
}

export default function RecurrenceOptions() {
  const { rules, addRule, updateRule, removeRule } = useRecurrenceStore();
  return (
    <div>
      {rules.map((rule, idx) => (
        <RuleEditor
          key={idx}
          rule={rule}
          idx={idx}
          updateRule={updateRule}
          removeRule={removeRule}
          canRemove={rules.length > 1}
        />
      ))}
      <button
        type="button"
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 flex items-center gap-2 mt-2 transition"
        onClick={() => addRule({ frequency: "daily", interval: 1, weekdays: [], pattern: "none" })}
        title="Add another recurrence rule"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        Add Another Rule
      </button>
    </div>
  );
} 