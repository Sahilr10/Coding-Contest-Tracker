import React, { useState, useMemo, useEffect } from "react";
import moment from "moment";
import { getPlatformDotClass } from "../utils/contestHelpers";

const Calendar = ({ contests }) => {
  const [monthOffset, setMonthOffset] = useState(0);
  const currentMonth = moment.utc().add(monthOffset, "month");

  const weekDays = useMemo(() => moment.weekdaysShort(), []);
  const numberOfDays = currentMonth.daysInMonth();

  

  // Build calendar grid
  const days = useMemo(() => {
    const firstDay = currentMonth.clone().startOf("month").day();
    const arr = [];

    for (let i = 0; i < firstDay; i++) arr.push(null);
    for (let i = 1; i <= numberOfDays; i++) arr.push(i);

    return arr;
  }, [currentMonth, numberOfDays]);

  // Helper: YYYY-MM-DD
  const getDateKey = (date) =>
    moment.utc(date).format("YYYY-MM-DD");

  return (
    <div className="rounded-2xl bg-[#121826] p-5 text-white border border-white/10 shadow-xl w-full max-w-[80%]">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setMonthOffset((m) => m - 1)}
          className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition"
        >
          ‹
        </button>

        <h2 className="text-lg font-semibold">
          {currentMonth.format("MMMM YYYY")}
        </h2>

        <button
          onClick={() => setMonthOffset((m) => m + 1)}
          className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition"
        >
          ›
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-center text-sm text-white/60 mb-2">
        {weekDays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {days.map((day, idx) => {
          if (!day) {
            return <div key={idx} className="h-12 opacity-0" />;
          }

          const calendarDateKey = getDateKey(
            currentMonth.clone().date(day)
          );

          const dayContests = contests.filter(
            (c) => getDateKey(c.startTime) === calendarDateKey
          );

          const isToday =
            calendarDateKey === getDateKey(new Date());

          return (
            <div
              key={idx}
              className={`h-12 flex flex-col items-center justify-center rounded-lg text-sm
                ${
                  isToday
                    ? "bg-purple-600 text-white font-semibold"
                    : "hover:bg-white/10 transition cursor-pointer"
                }`}
            >
              <span>{day}</span>
              

              {dayContests.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {dayContests.slice(0, 3).map((contest, i) => (
                    <div key={i} className="relative group">
                      {/* Dot */}
                      <span
                        className={`w-2 h-2 rounded-full block ${getPlatformDotClass(contest.platform)}`}
                      />

                      {/* Tooltip */}
                      <div
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                        hidden group-hover:block
                        bg-[#1f2937] text-white text-xs
                        px-2 py-1 rounded-md shadow-lg
                        whitespace-nowrap z-50"
                      >
                        <div className="font-medium">{contest.name}</div>
                        <div className="text-white/60">{contest.platform}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}


              {dayContests.length > 3 && (
                <span className="text-[10px] text-white/60">
                  +{dayContests.length - 3}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
