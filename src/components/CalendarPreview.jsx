import React from "react";
import { useRecurrenceStore } from "../store/recurrenceStore";
import { getRecurringDates } from "../utils/recurrenceUtils";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns";
import { enUS, fr, de, es, zhCN } from "date-fns/locale";

const localeMap = {
  "en-US": enUS,
  fr,
  de,
  es,
  "zh-CN": zhCN,
};
const dateFormats = ["yyyy-MM-dd", "dd/MM/yyyy", "MM/dd/yyyy", "d MMM yyyy"];
const locales = ["en-US", "fr", "de", "es", "zh-CN"];
const ruleColors = ["bg-blue-400", "bg-purple-400", "bg-pink-400", "bg-green-400", "bg-yellow-400", "bg-red-400"];

function mergeUniqueDatesWithRule(arrays) {
  const map = new Map();
  arrays.forEach((arr, ruleIdx) => {
    arr.forEach((d) => {
      const key = d.toISOString();
      if (!map.has(key)) map.set(key, { date: d, rules: [ruleIdx] });
      else map.get(key).rules.push(ruleIdx);
    });
  });
  return Array.from(map.values()).sort((a, b) => a.date - b.date);
}

function generateICS(dates, { startTime, endTime }) {
  const pad = (n) => n.toString().padStart(2, "0");
  const dt = (d, t) => {
    if (t) return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${t.replace(":", "")}00Z`;
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  };
  let ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//RecurringDatePicker//EN",
  ];
  dates.forEach((d, i) => {
    ics.push("BEGIN:VEVENT");
    if (startTime) {
      ics.push(`DTSTART:${dt(d, startTime)}`);
      ics.push(`DTEND:${dt(d, endTime || startTime)}`);
    } else {
      ics.push(`DTSTART;VALUE=DATE:${dt(d)}`);
      ics.push(`DTEND;VALUE=DATE:${dt(new Date(d.getTime() + 86400000))}`); // next day
    }
    ics.push(`SUMMARY:Recurring Event ${i + 1}`);
    ics.push("END:VEVENT");
  });
  ics.push("END:VCALENDAR");
  return ics.join("\r\n");
}

export default function CalendarPreview() {
  const {
    rules,
    startDate,
    endDate,
    exclusionDates,
    endAfterOccurrences,
    locale,
    dateFormat,
    setLocale,
    setDateFormat,
    startTime,
    endTime,
  } = useRecurrenceStore();

  // Combine all rules, track which rule(s) each date belongs to
  const allDatesWithRule = mergeUniqueDatesWithRule(
    rules.map((rule) =>
      getRecurringDates({
        ...rule,
        startDate,
        endDate,
        exclusionDates,
        endAfterOccurrences,
      })
    )
  );
  const allDates = allDatesWithRule.map((d) => d.date);

  // Validation
  const errors = [];
  if (!rules || rules.length === 0) errors.push("At least one recurrence rule is required.");
  if (!startDate) errors.push("Start date is required.");
  if (allDates.length === 0 && rules.length > 0 && startDate) errors.push("No dates match the current recurrence settings.");

  // Show calendar for the month of startDate or today
  const baseDate = startDate ? new Date(startDate) : new Date();
  const monthStart = startOfMonth(baseDate);
  const monthEnd = endOfMonth(baseDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleExportICS = () => {
    const ics = generateICS(allDates, { startTime, endTime });
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recurring-dates.ics";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  const handleCopy = () => {
    const text = allDates.map((d) => format(d, dateFormat, { locale: localeMap[locale] })).join("\n");
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col gap-6">
      {errors.length > 0 && (
        <div className="mb-2 p-2 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded text-sm">
          {errors.map((err, i) => (
            <div key={i}>{err}</div>
          ))}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-4 mb-2">
        <div>
          <label className="text-xs mr-1">Locale</label>
          <select
            className="border rounded px-2 py-1 text-xs focus:ring focus:ring-blue-200"
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
          >
            {locales.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs mr-1">Date Format</label>
          <select
            className="border rounded px-2 py-1 text-xs focus:ring focus:ring-blue-200"
            value={dateFormat}
            onChange={(e) => setDateFormat(e.target.value)}
          >
            {dateFormats.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-blue-50 via-white to-purple-50 shadow p-4">
        <h2 className="font-semibold mb-3 flex items-center gap-2 text-blue-700">
          <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          Calendar Preview
        </h2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border-collapse text-center select-none">
            <thead>
              <tr>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <th key={d} className="p-1 text-xs font-medium text-gray-500">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {getCalendarRows(days, allDatesWithRule)}
            </tbody>
          </table>
        </div>
      </div>
      <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-purple-50 via-white to-blue-50 shadow p-4">
        <h3 className="font-semibold mb-2 flex items-center gap-2 text-purple-700">
          <svg className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 4a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Upcoming Dates
        </h3>
        <div className="flex flex-wrap gap-2 mb-2">
          <button
            type="button"
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm flex items-center gap-1 shadow"
            onClick={handleExportICS}
            disabled={allDates.length === 0}
            title="Export as .ics file"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Export .ics
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm flex items-center gap-1 shadow"
            onClick={handleCopy}
            disabled={allDates.length === 0}
            title="Copy dates to clipboard"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8M8 12h8m-7 8h6a2 2 0 002-2V6a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Copy List
          </button>
        </div>
        <ul className="max-h-40 overflow-y-auto border rounded bg-white/80 p-2 text-sm">
          {allDatesWithRule.slice(0, 20).map(({ date, rules }) => (
            <li key={date.toISOString()} className="py-0.5 px-1 flex items-center gap-2">
              <span className="inline-flex gap-1">
                {rules.map((ruleIdx) => (
                  <span key={ruleIdx} className={`inline-block w-2 h-2 rounded-full ${ruleColors[ruleIdx % ruleColors.length]}`}></span>
                ))}
              </span>
              {format(date, dateFormat, { locale: localeMap[locale] })}
              {isToday(date) && <span className="ml-2 px-2 py-0.5 rounded-full bg-yellow-200 text-yellow-800 text-xs font-semibold">Today</span>}
            </li>
          ))}
          {allDatesWithRule.length === 0 && <li className="text-gray-400">No dates</li>}
        </ul>
      </div>
    </div>
  );
}

function getCalendarRows(days, allDatesWithRule) {
  const rows = [];
  let week = [];
  let dayIdx = days[0].getDay();
  // Fill initial empty cells
  for (let i = 0; i < dayIdx; i++) week.push(<td key={"empty-" + i}></td>);
  days.forEach((day, i) => {
    const match = allDatesWithRule.find((d) => isSameDay(d.date, day));
    const isRec = !!match;
    const isTdy = isToday(day);
    week.push(
      <td
        key={day.toISOString()}
        className={
          `p-1 transition cursor-pointer select-none relative ` +
          (isRec
            ? "bg-blue-500/80 text-white font-bold shadow-inner hover:bg-blue-600 focus:bg-blue-700 "
            : "text-gray-700 hover:bg-gray-100 focus:bg-gray-200 ") +
          (isTdy ? " ring-2 ring-yellow-400" : "")
        }
        tabIndex={0}
        title={isRec ? `Recurring date${match.rules.length > 1 ? ' (multiple rules)' : ''}` : ''}
      >
        <span className="relative z-10">{format(day, "d")}</span>
        {isRec && (
          <span className="absolute bottom-1 left-1 flex gap-0.5">
            {match.rules.map((ruleIdx) => (
              <span key={ruleIdx} className={`inline-block w-2 h-2 rounded-full ${ruleColors[ruleIdx % ruleColors.length]}`}></span>
            ))}
          </span>
        )}
        {isTdy && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-yellow-400"></span>}
      </td>
    );
    if (week.length === 7 || i === days.length - 1) {
      rows.push(<tr key={day.toISOString()}>{week}</tr>);
      week = [];
    }
  });
  return rows;
} 