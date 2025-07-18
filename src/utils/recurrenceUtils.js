import { addDays, addWeeks, addMonths, addYears, isBefore, isAfter, isSameDay, parseISO, format } from "date-fns";

// Helper to get weekday index from string ("Sun" = 0, ...)
export function getWeekdayIndex(day) {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(day);
}

// Main recurrence calculation
export function getRecurringDates({ frequency, interval, weekdays, pattern, startDate, endDate, exclusionDates = [], endAfterOccurrences }) {
  if (!startDate) return [];
  const start = parseISO(startDate);
  const end = endDate ? parseISO(endDate) : addYears(start, 1); // default 1 year
  let dates = [];
  let current = start;
  let count = 0;
  const maxCount = endAfterOccurrences ? parseInt(endAfterOccurrences, 10) : null;

  while ((!isAfter(current, end) && (!maxCount || count < maxCount))) {
    let add = false;
    if (frequency === "daily") {
      add = true;
    } else if (frequency === "weekly") {
      if (weekdays && weekdays.length > 0) {
        for (let i = 0; i < 7; i++) {
          const d = addDays(current, i);
          if (weekdays.includes(d.getDay()) && !isAfter(d, end)) {
            if ((isAfter(d, start) || isSameDay(d, start)) && (!exclusionDates.includes(format(d, "yyyy-MM-dd")))) {
              dates.push(d);
              count++;
              if (maxCount && count >= maxCount) return dates;
            }
          }
        }
        add = false;
      } else {
        add = true;
      }
    } else if (frequency === "monthly") {
      if (pattern && pattern !== "none") {
        const [nth, weekday] = pattern.split("-");
        const nthNum = ["first", "second", "third", "fourth", "last"].indexOf(nth);
        let month = current.getMonth();
        let year = current.getFullYear();
        let day = getNthWeekdayOfMonth(year, month, getWeekdayIndex(weekday), nthNum);
        if (day && !isAfter(day, end) && (isAfter(day, start) || isSameDay(day, start))) {
          if (!exclusionDates.includes(format(day, "yyyy-MM-dd"))) {
            dates.push(day);
            count++;
            if (maxCount && count >= maxCount) return dates;
          }
        }
        add = false;
      } else {
        add = true;
      }
    } else if (frequency === "yearly") {
      add = true;
    }
    if (add) {
      if (!exclusionDates.includes(format(current, "yyyy-MM-dd"))) {
        dates.push(current);
        count++;
        if (maxCount && count >= maxCount) return dates;
      }
    }
    if (frequency === "daily") current = addDays(current, interval);
    else if (frequency === "weekly") current = addWeeks(current, interval);
    else if (frequency === "monthly") current = addMonths(current, interval);
    else if (frequency === "yearly") current = addYears(current, interval);
  }
  return dates;
}

// Helper: Get the nth weekday of a month (e.g., 2nd Tuesday)
function getNthWeekdayOfMonth(year, month, weekday, nth) {
  let date = new Date(year, month, 1);
  let count = 0;
  let lastMatch = null;
  while (date.getMonth() === month) {
    if (date.getDay() === weekday) {
      count++;
      lastMatch = new Date(date);
      if (nth < 4 && count === nth + 1) return new Date(date);
    }
    date.setDate(date.getDate() + 1);
  }
  if (nth === 4) return lastMatch; // 'last'
  return null;
} 