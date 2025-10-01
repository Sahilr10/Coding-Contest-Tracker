import React from "react";
import {
  getPlatformClass,
  getPlatformDotClass,
  getTimeUntilDetailed,
  formatTime,
  getTimeUntil
} from "../../utils/contestHelpers";


// Example contest card creator as React component
const ContestCard = ({ contest }) => {
  if (!contest) return null;
  const platformClass = getPlatformClass(contest.platform)

  return (
    <div
      key={contest.id}
      className={`contest-card ${platformClass} bg-[#121826] dark:bg-gray-800 rounded-lg p-6 shadow-md transition-all duration-300 border-l-4 flex flex-col h-full`}
    >
      <div className="flex-grow">
        {/* Contest Header */}
        <div className="contest-header flex justify-between items-start mb-4">
          <div className="contest-platform flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${getPlatformDotClass(contest.platform)}`}
            ></span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              {contest.platform}
            </span>
          </div>
          <span className="contest-date text-sm text-gray-500 dark:text-gray-400">
            {getTimeUntil(contest.startTime)}
          </span>
        </div>

        {/* Contest Title */}
        <h3 className="contest-title text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {contest.name}
        </h3>

        {/* Contest Details */}
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{formatTime(contest.startTime)}</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{contest.duration} minutes</span>
          </div>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="contest-countdown bg-gray-100 dark:bg-gray-700/50 p-2 rounded text-center mb-4">
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {getTimeUntilDetailed(contest.startTime)}
        </span>
      </div>

      {/* Register Button */}
      <button
        className="register-btn w-full bg-transparent border border-current text-current py-2 px-4 rounded-md hover:bg-[#60a5fa] hover:text-white transition-colors duration-200"
        onClick={() => window.open(contest.url, '_blank')}
      >
        Register Now
      </button>
    </div>
  );
};

const NextContestSection = ({ upcomingContests }) => {
  const nextContest =
    upcomingContests && upcomingContests.length > 0
      ? upcomingContests[0]
      : null;

  return (
    <section className="next-contest-section mb-8">
      <div
        className="next-contest rounded-xl p-6 shadow-lg text-white"
        style={{
          background: "linear-gradient(135deg, #1f2937 0%, #60a5fa 100%)", // Tailwind gray-500 to blue-500 gradient
        }}
      >
        {nextContest ? (
          <ContestCard contest={nextContest} />
        ) : (
          <div className="no-contests text-center text-white text-lg font-semibold">
            No upcoming contests found
          </div>
        )}
      </div>
    </section>
  );
};

export default NextContestSection;
