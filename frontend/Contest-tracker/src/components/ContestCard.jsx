import { Calendar, Clock, Bell, ExternalLink } from "lucide-react";
import {
  getPlatformGradient,
  getPlatformBorderClass,
  getTimeUntil,
  getTimeUntilDetailed,
  formatClockTime,
  formatDate,
  formatTime
} from "../utils/contestHelpers.js";

const ContestCard = ({contest}) => {
  const gradientClass = getPlatformGradient(contest.platform);
  const borderClass = getPlatformBorderClass(contest.platform);

  return (
    <div  className={`rounded-2xl p-6
    border ${borderClass}
    bg-[#121826]
    bg-gradient-to-br ${gradientClass}
    shadow-xl transition-all hover:-translate-y-1`}
    >
      {/* Platform */}
      <p className="text-sm font-medium text-blue-200">
        {contest.platform}
      </p>

      {/* Title */}
      <h3 className="text-white text-lg font-semibold mt-1">
        {contest.name}
      </h3>

      {/* Info */}
      <div className="mt-6 space-y-2 text-white/80 text-sm">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          {formatDate(contest.startTime)}
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} />
          {formatClockTime(contest.startTime)}
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} />
          {Math.floor(contest.duration / 60)} hrs {contest.duration % 60} mins
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center gap-3">
        <button className="flex-1 flex items-center justify-center gap-2
          rounded-lg py-2
          bg-white/10 hover:bg-white/20
          text-white transition"
          onClick={() => window.open(contest.url, "_blank")}
          >
          <ExternalLink size={16} />
          Register
        </button>

        <button className="p-2 rounded-lg
          bg-white/10 hover:bg-white/20 transition text-white">
          <Bell size={16} />
        </button>
      </div>
    </div>
  );
};

export default ContestCard;
