import moment from "moment";
import { Clock } from "lucide-react";
import { getPlatformDotClass, getPlatformBorderClass } from "../utils/contestHelpers.js";

const WeeklySchedule = ({ contests = [] }) => {
  // Generate next 7 days (UTC-safe)
  const weekDays = Array.from({ length: 7 }, (_, i) =>
    moment.utc().add(i, "day")
  );

  // Group contests by date (YYYY-MM-DD)
  const contestsByDate = contests.reduce((acc, contest) => {
    const dateKey = moment.utc(contest.startTime).format("YYYY-MM-DD");

    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(contest);

    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {weekDays.map((day) => {
        const dateKey = day.format("YYYY-MM-DD");
        const dayContests = contestsByDate[dateKey];

        // Show ONLY days with contests
        if (!dayContests || dayContests.length === 0) return null;

        return (
          <div
            key={dateKey}
            className="rounded-2xl p-5
            bg-[#0b1220] border border-white/10
            shadow-lg flex flex-col gap-4"
          >
            {/* Day Header */}
            <div>
              <p className="text-white font-semibold">
                {day.format("dddd")}
              </p>
              <p className="text-white/60 text-sm">
                {day.format("MMM D")}
              </p>
            </div>

            {/* Contests */}
            <div className="flex flex-col gap-3">
              {dayContests.map((contest, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg p-3
                  bg-white/5 border-l-4
                   ${getPlatformBorderClass(contest.platform)}
                  hover:bg-white/10 transition`}
                >
                  <p className="text-white text-sm font-medium">
                    {contest.name}
                  </p>

                  <div className="flex items-center gap-2 text-white/60 text-xs mt-1">
                    <Clock size={14} />
                    {moment
                      .utc(contest.startTime)
                      .local()
                      .format("HH:mm")}{" "}
                    UTC
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeeklySchedule;
