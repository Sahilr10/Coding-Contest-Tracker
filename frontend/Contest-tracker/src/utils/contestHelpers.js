// src/utils/contestHelpers.js

// Platform-specific class
export const getPlatformClass = (platform) => {
  const platformClasses = {
    leetcode: "border-l-orange-500",
    codechef: "border-l-red-500",
    gfg: "border-l-green-500",
    codeforces: "border-l-blue-500",
    atcoder: "border-l-purple-500",
  };

  const platformKey = platform?.toLowerCase();
  return platformClasses[platformKey] || "border-l-blue-500";
};

// Countdown with details
export const getTimeUntilDetailed = (startTime) => {
  const now = new Date();
  const start = new Date(startTime);
  const diff = start - now;

  if (diff <= 0) return "Started";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `Starts in ${days}d ${hours}h`;
  if (hours > 0) return `Starts in ${hours}h ${minutes}m`;
  return `Starts in ${minutes}m`;
};

// Format contest start time
export const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getTimeUntil = (dateString) => {
    const now = new Date();
    const contestDate = new Date(dateString);
    const diff = contestDate - now;

    if (diff <= 0) return "Started";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `in ${days}d ${hours}h`;
    if (hours > 0) return `in ${hours}h ${minutes}m`;
    return `in ${minutes}m`;
  };