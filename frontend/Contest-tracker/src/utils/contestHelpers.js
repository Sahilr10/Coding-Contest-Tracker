// src/utils/contestHelpers.js

// Platform-specific class
export const getPlatformClass = (platform) => {
  const platformClasses = {
    LeetCode: "border-l-orange-400",
    CodeChef: "border-l-red-400",
    GeeksforGeeks: "border-l-green-400",
    Codeforces: "border-l-blue-400",
    AtCoder: "border-l-purple-400",
  };

  return platformClasses[platform] || "border-l-blue-500";
};

// Platform dot color class for better visibility
export const getPlatformDotClass = (platform) => {
  const platformDotClasses = {
    LeetCode: "bg-orange-600",
    CodeChef: "bg-red-600",
    GeeksforGeeks: "bg-green-600",
    Codeforces: "bg-blue-600",
    AtCoder: "bg-purple-600",
  };

  return platformDotClasses[platform] || "bg-blue-600";
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