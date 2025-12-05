import React, { useState, useMemo } from "react";

/**
 * Capitalize first letter of a string
 * @param {string} string String to capitalize
 * @returns {string} Capitalized string
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Format date for display
 * @param {Date} date Date to format
 * @returns {string} Formatted date
 */
function formatDate(date) {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

/**
 * Format time for display
 * @param {Date} date Date object to extract time from
 * @returns {string} Formatted time
 */
function formatTime(date) {
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Get contests occurring on a specific date
 * @param {Date} date Date to check
 * @param {Array} contests Array of contest objects
 * @returns {Array} Array of contests occurring on the date
 */
function getContestsForDate(date, contests) {
  return contests.filter((contest) => {
    const contestDate = new Date(contest.startTime);
    return (
      contestDate.getDate() === date.getDate() &&
      contestDate.getMonth() === date.getMonth() &&
      contestDate.getFullYear() === date.getFullYear()
    );
  });
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Calendar component
 * @param {{contests: Array}} props
 */
const Calendar = ({ contests = [] }) => {
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      let month = prevMonth - 1;
      let year = currentYear;
      if (month < 0) {
        month = 11;
        year = currentYear - 1;
        setCurrentYear(year);
      }
      return month;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      let month = prevMonth + 1;
      let year = currentYear;
      if (month > 11) {
        month = 0;
        year = currentYear + 1;
        setCurrentYear(year);
      }
      return month;
    });
  };

  // Build calendar days (same logic as your generateCalendar)
  const calendarDays = useMemo(() => {
    const days = [];

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday

    // Previous month days
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();

    for (let i = 0; i < startingDayOfWeek; i++) {
      const day = daysInPrevMonth - startingDayOfWeek + i + 1;
      const date = new Date(prevMonthYear, prevMonth, day);
      const events = getContestsForDate(date, contests);
      const isToday =
        day === today.getDate() &&
        prevMonth === today.getMonth() &&
        prevMonthYear === today.getFullYear();

      days.push({
        key: `prev-${day}`,
        day,
        date,
        events,
        otherMonth: true,
        isToday,
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const events = getContestsForDate(date, contests);
      const isToday =
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();

      days.push({
        key: `current-${day}`,
        day,
        date,
        events,
        otherMonth: false,
        isToday,
      });
    }

    // Next month days
    const daysToAdd = 42 - (startingDayOfWeek + daysInMonth); // always 6 weeks
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    for (let day = 1; day <= daysToAdd; day++) {
      const date = new Date(nextMonthYear, nextMonth, day);
      const events = getContestsForDate(date, contests);
      const isToday =
        day === today.getDate() &&
        nextMonth === today.getMonth() &&
        nextMonthYear === today.getFullYear();

      days.push({
        key: `next-${day}`,
        day,
        date,
        events,
        otherMonth: true,
        isToday,
      });
    }

    return days;
  }, [currentMonth, currentYear, contests, today]);

  return (
   
  <section className="my-6">
    {/* Controls */}
    <div className="flex justify-between items-center mb-3">
      <button
        onClick={handlePrevMonth}
        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-700 dark:hover:bg-gray-800 transition"
      >
        {"<"}
      </button>

      <div className="text-lg font-medium text-center">
        {monthNames[currentMonth]} {currentYear}
      </div>

      <button
        onClick={handleNextMonth}
        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-700 dark:hover:bg-gray-800 transition"
      >
        {">"}
      </button>
    </div>

    {/* Calendar */}
    <div className="bg-gray-800 dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
      <div className="grid grid-cols-7 bg-blue-600 text-white font-medium text-center">
        {dayNames.map((d) => (
          <div key={d} className="py-2 text-sm">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {calendarDays.map(({ key, day, date, events, otherMonth, isToday }) => (
          <div
            key={key}
            className={`relative aspect-square flex flex-col items-center justify-start 
              p-2 border border-gray-700 cursor-pointer transition
              ${otherMonth ? "opacity-50 text-gray-400" : ""}
              ${isToday ? "bg-blue-500/20 font-bold" : "hover:bg-black/5 dark:hover:bg-white/5"}
            `}
          >
            {/* Day number */}
            <div className="text-xs mb-1">{day}</div>

            {/* Event dots */}
            <div className="flex gap-[2px] flex-wrap justify-center">
              {Array.from(new Set(events.map((e) => e.platform))).map((platform) => (
                <div
                  key={platform}
                  className={`w-[6px] h-[6px] rounded-full my-[1px] ${
                    platform === "leetcode"
                      ? "bg-yellow-400"
                      : platform === "codechef"
                      ? "bg-brown-600"
                      : platform === "gfg"
                      ? "bg-green-500"
                      : platform === "codeforces"
                      ? "bg-blue-400"
                      : "bg-gray-400"
                  }`}
                />
              ))}
            </div>

            {/* Popover */}
            {events.length > 0 && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 
                bg-gray-900 dark:bg-gray-800 rounded-lg shadow-lg p-3 min-w-[200px]
                hidden group-hover:block z-20"
              >
                <div className="font-medium mb-2 pb-1 border-b text-sm">
                  {formatDate(date)}
                </div>

                <div className="max-h-[200px] overflow-y-auto space-y-2">
                  {events.map((event, i) => (
                    <div key={i} className="border-b pb-1 last:border-none text-sm">
                      <div className="text-xs font-medium capitalize mb-[2px]">
                        {event.platform}
                      </div>
                      <div className="mb-[1px]">{event.name}</div>
                      <div className="text-xs text-gray-400">
                        {formatTime(new Date(event.startTime))} –{" "}
                        {formatTime(new Date(event.endTime))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

};

export default Calendar;
