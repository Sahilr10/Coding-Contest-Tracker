import axios from "axios";

// Codeforces
export const fetchCodeforces = async () => {
  const response = await axios.get("https://codeforces.com/api/contest.list");
  return response.data.result
    .filter(c => c.phase === "BEFORE")
    .map(c => ({
      name: c.name,
      platform: "Codeforces",
      startTime: new Date(c.startTimeSeconds * 1000),
      endTime: new Date((c.startTimeSeconds + c.durationSeconds) * 1000),
      duration: Math.floor(c.durationSeconds / 60),
      url: `https://codeforces.com/contest/${c.id}`,
    }));
};

// LeetCode
export const generateLeetCode = () => {
  const contests = [];
  const now = new Date();
  const currentDay = now.getDay();

  // Weekly
  let daysUntilSunday = (7 - currentDay) % 7;
  let nextSunday = new Date(now);
  nextSunday.setDate(now.getDate() + daysUntilSunday);
  nextSunday.setUTCHours(8, 0, 0, 0);

  for (let i = 0; i < 6; i++) {
    const contestDate = new Date(nextSunday);
    contestDate.setDate(contestDate.getDate() + i * 7);
    contests.push({
      name: `LeetCode Weekly Contest ${400 + i}`,
      platform: "LeetCode",
      startTime: contestDate,
      endTime: new Date(contestDate.getTime() + 90 * 60000),
      duration: 90,
      url: "https://leetcode.com/contest/",
    });
  }

  return contests;
};

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
      url: "https://practice.geeksforgeeks.org/contest/gfg-weekly-coding-contest",
    });
  }

  return contests;
};
