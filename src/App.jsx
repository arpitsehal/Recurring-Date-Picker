import React from "react";
import RecurringDatePicker from "./components/RecurringDatePicker";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-xl sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200 rounded-t-lg shadow-md py-4 px-6 mb-4">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Recurring Date Picker Demo</h1>
        <p className="text-gray-500 mt-1 text-sm">A modern, flexible, and feature-rich recurring date picker component</p>
      </header>
      <main className="w-full max-w-xl bg-white rounded-lg shadow-xl p-6 flex flex-col gap-8">
        <RecurringDatePicker />
      </main>
      <footer className="mt-8 text-xs text-gray-400">&copy; {new Date().getFullYear()} Recurring Date Picker Demo</footer>
    </div>
  );
} 