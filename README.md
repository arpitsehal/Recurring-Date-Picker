# Recurring Date Picker

A modern, feature-rich, and fully customizable React component for selecting and visualizing recurring dates—perfect for productivity, calendar, and scheduling apps.

---

## ✨ Features
- **Flexible Recurrence Rules:** Daily, weekly, monthly, yearly, custom intervals, specific weekdays, and advanced patterns (e.g., "Second Tuesday of the month").
- **Multiple Rules:** Combine multiple recurrence rules for complex schedules.
- **Date Range & End Conditions:** Set start date, end date, or end after N occurrences.
- **Time Selection:** Pick start and end times for each event.
- **Exclusion Dates:** Skip specific dates (e.g., holidays, exceptions).
- **Mini Calendar Preview:** Visual calendar with color-coded rules, today’s highlight, and interactive UI.
- **Upcoming Dates List:** Scrollable, color-coded list of all upcoming recurring dates.
- **Localization & Date Format:** Choose language and date format (supports en, fr, de, es, zh-CN).
- **Export & Copy:** Export all dates as a .ics file (for Google/Outlook/Apple Calendar) or copy the list to clipboard.
- **Validation & Warnings:** User-friendly error messages for invalid or empty rules.
- **Responsive & Accessible:** Mobile-friendly, keyboard-accessible, and visually appealing.

---

## 🛠 Tech Stack
- **Framework:** React (Next.js compatible)
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Date Utilities:** date-fns
- **Testing:** Jest & React Testing Library

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the dev server:**
   ```bash
   npm start
   ```
3. **Run tests:**
   ```bash
   npm test
   ```

---

## 🧩 Usage

Import and use the main component in your app:

```jsx
import RecurringDatePicker from './components/RecurringDatePicker';

function MyApp() {
  return <RecurringDatePicker />;
}
```

All state and logic are managed internally with Zustand. You can customize or extend the store and UI as needed.

---

## 🎨 Customization
- **Styling:** Easily adjust Tailwind classes for your brand or theme.
- **Dark Mode:** Add Tailwind dark classes for dark theme support.
- **Localization:** Add more locales in `CalendarPreview.jsx` as needed.
- **Integration:** Use the exported dates for scheduling, reminders, or calendar sync in your app.

---

## 🖼 Screenshots

> _Add screenshots or GIFs here to showcase the UI_

---

## 📂 Project Structure
- `src/components/` – UI components (RecurringDatePicker, RecurrenceOptions, DatePickerUI, CalendarPreview)
- `src/store/` – Zustand store for global state
- `src/utils/` – Recurrence logic and helpers
- `src/__tests__/` – Unit and integration tests

---

## 📄 License
MIT 