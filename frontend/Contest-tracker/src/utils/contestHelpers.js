// src/utils/contestHelpers.js

// Platform-specific class
export const getPlatformGradient = (platform) => {
  const gradients = {
    LeetCode: "from-orange-600/20 via-orange-500/10 to-transparent",
    CodeChef: "from-red-600/20 via-red-500/10 to-transparent",
    GeeksforGeeks: "from-green-600/20 via-green-500/10 to-transparent",
    Codeforces: "from-blue-600/20 via-blue-500/10 to-transparent",
    AtCoder: "from-purple-600/20 via-purple-500/10 to-transparent",
  };

  return gradients[platform] || "from-blue-600/20 via-blue-500/10 to-transparent";
};

export const getPlatformBorderClass = (platform) => {
  const borderClasses = {
    LeetCode: "border-orange-500/40",
    CodeChef: "border-red-500/40",
    GeeksforGeeks: "border-green-500/40",
    Codeforces: "border-blue-500/40",
    AtCoder: "border-purple-500/40",
  };

  return borderClasses[platform] || "border-blue-500/40";
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

export const formatDate = (startTime) => {
  if (!startTime) return "";

  const date = new Date(startTime);
  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};


export const formatClockTime = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date)) return "";

  return date.toLocaleTimeString("en-US", {
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