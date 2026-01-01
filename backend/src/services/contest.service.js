import axios from "axios";

// Cache for contest data
const cache = {
  codeforces: { data: null, timestamp: 0 },
  leetcode: { data: null, timestamp: 0 },
};

// Cache expiry time in milliseconds (5 minutes)
const CACHE_EXPIRY = 5 * 60 * 1000;

// Retry configuration
const RETRY_CONFIG = {
  maxRetries: 3,
  initialDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
};

// Helper function for exponential backoff retry
const retryWithBackoff = async (fn, retries = RETRY_CONFIG.maxRetries, delay = RETRY_CONFIG.initialDelay) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0 || error.response?.status !== 429) {
      throw error;
    }

    // Wait before retrying with exponential backoff
    await new Promise(resolve => setTimeout(resolve, delay));

    // Recursively retry with doubled delay
    const nextDelay = Math.min(delay * 2, RETRY_CONFIG.maxDelay);
    return retryWithBackoff(fn, retries - 1, nextDelay);
  }
};

// Helper function to check if cache is still valid
const isCacheValid = (cacheKey) => {
  return cache[cacheKey].data && (Date.now() - cache[cacheKey].timestamp < CACHE_EXPIRY);
};

// Codeforces
export const fetchCodeforces = async () => {
  // Return cached data if valid
  if (isCacheValid('codeforces')) {
    return cache.codeforces.data;
  }

  const response = await retryWithBackoff(async () => {
    return await axios.get("https://codeforces.com/api/contest.list", {
      timeout: 10000,
      headers: {
        'User-Agent': 'ContestTracker/1.0'
      }
    });
  });

  const contests = response.data.result
    .filter(c => c.phase === "BEFORE")
    .map(c => ({
      name: c.name,
      platform: "Codeforces",
      startTime: new Date(c.startTimeSeconds * 1000),
      endTime: new Date((c.startTimeSeconds + c.durationSeconds) * 1000),
      duration: Math.floor(c.durationSeconds / 60),
      url: `https://codeforces.com/contest/${c.id}`,
    }));

  // Cache the results
  cache.codeforces = { data: contests, timestamp: Date.now() };
  return contests;
};

//LeetCode
export const fetchLeetCode = async () => {
  // Return cached data if valid
  if (isCacheValid('leetcode')) {
    return cache.leetcode.data;
  }

  const response = await retryWithBackoff(async () => {
    return await axios.get(
      "https://alfa-leetcode-api.onrender.com/contests",
      {
        timeout: 10000,
        headers: {
          'User-Agent': 'ContestTracker/1.0'
        }
      }
    );
  });

  const contests = response.data.allContests
    .filter(c => c.originStartTime * 1000 > Date.now())
    .map(c => ({
      name: c.title,
      platform: "LeetCode",
      startTime: new Date(c.startTime * 1000),
      endTime: new Date((c.startTime + c.duration) * 1000),
      duration: Math.floor(c.duration / 60),
      url: `https://leetcode.com/contest/${c.titleSlug}`,
    }));

  // Cache the results
  cache.leetcode = { data: contests, timestamp: Date.now() };
  return contests;
};

// LeetCode
// export const generateLeetCode = () => {
//   const contests = [];
//   const now = new Date();
//   const currentDay = now.getDay();

//   // Weekly
//   let daysUntilSunday = (7 - currentDay) % 7;
//   let nextSunday = new Date(now);
//   nextSunday.setDate(now.getDate() + daysUntilSunday);
//   nextSunday.setUTCHours(8, 0, 0, 0);

//   for (let i = 0; i < 6; i++) {
//     const contestDate = new Date(nextSunday);
//     contestDate.setDate(contestDate.getDate() + i * 7);
//     contests.push({
//       name: `LeetCode Weekly Contest ${400 + i}`,
//       platform: "LeetCode",
//       startTime: contestDate,
//       endTime: new Date(contestDate.getTime() + 90 * 60000),
//       duration: 90,
//       url: "https://leetcode.com/contest/",
//     });
//   }

//   return contests;
// };

// CodeChef
export const generateCodeChef = () => {
  const contests = [];
  const now = new Date();
  const currentDay = now.getDay();

  let daysUntilWednesday = (3 + 7 - currentDay) % 7;
  if (daysUntilWednesday === 0) daysUntilWednesday = 7;

  let nextWednesday = new Date(now);
  nextWednesday.setDate(now.getDate() + daysUntilWednesday);
  nextWednesday.setUTCHours(15, 0, 0, 0);

  for (let i = 0; i < 6; i++) {
    const contestDate = new Date(nextWednesday);
    contestDate.setDate(contestDate.getDate() + i * 7);
    contests.push({
      name: `CodeChef Starters ${115 + i}`,
      platform: "CodeChef",
      startTime: contestDate,
      endTime: new Date(contestDate.getTime() + 180 * 60000),
      duration: 180,
      url: "https://www.codechef.com/contests",
    });
  }

  return contests;
};

// GFG
export const generateGFG = () => {
  const contests = [];
  const now = new Date();
  const currentDay = now.getDay();

  let daysUntilSunday = (0 + 7 - currentDay) % 7;
  if (daysUntilSunday === 0 && now.getHours() >= 19) daysUntilSunday = 7;

  let nextSunday = new Date(now);
  nextSunday.setDate(now.getDate() + daysUntilSunday);
  nextSunday.setHours(19, 0, 0, 0);

  for (let i = 0; i < 6; i++) {
    const contestDate = new Date(nextSunday);
    contestDate.setDate(contestDate.getDate() + i * 7);
    contests.push({
      name: `GFG Weekly Coding Contest ${115 + i}`,
      platform: "GeeksforGeeks",
      startTime: contestDate,
      endTime: new Date(contestDate.getTime() + 150 * 60000),
      duration: 150,
      url: "https://www.geeksforgeeks.org/events/rec/gfg-weekly-coding-contest",
    });
  }

  return contests;
};
