import React from "react";
import {
  Trophy,
  Calendar,
  Clock,
  Bell,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { getTimeUntilDetailed } from "../utils/contestHelpers.js";
import { Link } from "react-router-dom";

const NextContestSection = ({contests}) => {


  const [reminder, setReminder] = useState(false);

  const contest = contests[0];

  return (
    <div className="w-full min-h-[280px] mx-auto rounded-2xl p-5
      bg-gradient-to-br from-[#3a0f57] via-[#2a0d3d] to-[#260d3b]
      border border-white/10 shadow-xl">

      {/* Header */}
      <div className="flex items-start justify-between">
        {/* Left */}
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-xl bg-purple-600/30
            flex items-center justify-center">
            <Trophy size={40} className="text-purple-300" />
          </div>

          <div>
            <h2 className="text-white text-2xl">
              {contest.name}
            </h2>
            <p className="text-white/60 ">
              {contest.platform}
            </p>
          </div>
        </div>

        {/* Status */}
        <span className="px-4 py-1.5 rounded-full
          bg-purple-500/30 text-purple-200 text-sm">
          {getTimeUntilDetailed(contest.startTime)}
        </span>
      </div>

      {/* Info Row */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Date */}
        <div className="flex items-center gap-3">
          <Calendar className="text-purple-400" />
          <div>
            <p className="text-white/60 text-sm">Date</p>
            <p className="text-white font-medium">
              {new Date(contest.startTime).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-center gap-3">
          <Clock className="text-purple-400" />
          <div>
            <p className="text-white/60 text-sm">Time</p>
            <p className="text-white font-medium">
              {new Date(contest.startTime).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",})} UTC
            </p>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-3">
          <Clock className="text-purple-400" />
          <div>
            <p className="text-white/60 text-sm">Duration</p>
            <p className="text-white font-medium">
              {Math.floor(contest.duration / 60)} hrs {contest.duration % 60} mins
            </p>
          </div>
        </div>

      </div>

      {/* Actions */}
      <div className="mt-12 flex gap-4">
        <button className="flex items-center gap-2
          px-5 py-2.5 rounded-lg
          bg-purple-600 hover:bg-purple-700
          text-white font-medium transition"
          onClick={() => window.open(contest.url, "_blank")}
          >
          <ExternalLink size={18} />
          Register Now
        </button>

        <button
           onClick={() => setReminder(prev => !prev)}
  
           className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition"
          >
            <Bell size={18} />
            {reminder ? "Set Reminder" : "Reminder Set"}
          </button>
        </div>
      </div>
     );
  };

export default NextContestSection;

