import axios from "axios";
import {Contest} from "../models/contest.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getCodeforcesContests = asyncHandler( async (req, res) => {
    const response = await axios.get("https://codeforces.com/api/contest.list");

    const contests = response.data.result
        .filter(c => c.phase === "BEFORE")
        .map(c => ({
            name: c.name,
            platform: "Codeforces",
            startTime: new Date(c.startTimeSeconds * 1000),
            endTime: new Date((c.startTimeSeconds + c.durationSeconds) * 1000),
            duration: Math.floor(c.durationSeconds / 60), // convert to minutes
            url: `https://codeforces.com/contests/${c.id}`
        })
    )

    return res
        .status(200)
        .json(
            new ApiResponse(
                200, 
                {
                    count: contests.length,
                    contests
                }, 
                'Codeforces contests fetched successfully'
            )
        )
})

const getLeetCodeContests = asyncHandler(async (req, res) => {
  const contests = [];
  const now = new Date();
  const currentDay = now.getDay();

  // Next Sunday 8:00 AM UTC → Weekly contest
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

  // Biweekly contests (every 2nd Saturday 20:00 UTC)
  const knownBiweeklyDate = new Date(2023, 0, 7);
  const daysSinceKnown = Math.floor((now - knownBiweeklyDate) / (1000 * 60 * 60 * 24));
  const daysUntilBiweekly = 14 - (daysSinceKnown % 14);

  let nextBiweekly = new Date(now);
  nextBiweekly.setDate(now.getDate() + daysUntilBiweekly);
  nextBiweekly.setUTCHours(20, 0, 0, 0);

  for (let i = 0; i < 3; i++) {
    const contestDate = new Date(nextBiweekly);
    contestDate.setDate(contestDate.getDate() + i * 14);

    contests.push({
      name: `LeetCode Biweekly Contest ${100 + i}`,
      platform: "LeetCode",
      startTime: contestDate,
      endTime: new Date(contestDate.getTime() + 90 * 60000),
      duration: 90,
      url: "https://leetcode.com/contest/",
    });
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      { count: contests.length, contests },
      "LeetCode contests generated successfully"
    )
  );
});

const getCodeChefContests = asyncHandler(async (req, res) => {
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

  return res.status(200).json(
    new ApiResponse(
      200,
      { count: contests.length, contests },
      "CodeChef contests generated successfully"
    )
  );
});

const getGFGContests = asyncHandler(async (req, res) => {
  const contests = [];
  const now = new Date();
  const currentDay = now.getDay();

  let daysUntilSunday = (0 + 7 - currentDay) % 7;
  if (daysUntilSunday === 0 && now.getHours() >= 19) {
    daysUntilSunday = 7;
  }

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

  return res.status(200).json(
    new ApiResponse(
      200,
      { count: contests.length, contests },
      "GFG contests generated successfully"
    )
  );
});

const getAllContests = asyncHandler(async (req, res) => {
  // Codeforces
  let codeforces = [];
  try {
    const response = await axios.get("https://codeforces.com/api/contest.list");
    codeforces = response.data.result
      .filter(c => c.phase === "BEFORE")
      .map(c => ({
        name: c.name,
        platform: "Codeforces",
        startTime: new Date(c.startTimeSeconds * 1000),
        endTime: new Date((c.startTimeSeconds + c.durationSeconds) * 1000),
        duration: Math.floor(c.durationSeconds / 60),
        url: `https://codeforces.com/contest/${c.id}`
      }));
  } catch (err) {
    console.error("Error fetching Codeforces:", err.message);
  }

  // LeetCode (copy logic from getLeetCodeContests)
  const leetcode = []; 
  const now = new Date();
  const currentDay = now.getDay();
  let daysUntilSunday = (7 - currentDay) % 7;
  let nextSunday = new Date(now);
  nextSunday.setDate(now.getDate() + daysUntilSunday);
  nextSunday.setUTCHours(8, 0, 0, 0);
  for (let i = 0; i < 6; i++) {
    const contestDate = new Date(nextSunday);
    contestDate.setDate(contestDate.getDate() + i * 7);
    leetcode.push({
      name: `LeetCode Weekly Contest ${400 + i}`,
      platform: "LeetCode",
      startTime: contestDate,
      endTime: new Date(contestDate.getTime() + 90 * 60000),
      duration: 90,
      url: "https://leetcode.com/contest/"
    });
  }

  // CodeChef (copy logic from getCodeChefContests)
  const codechef = [];
  let daysUntilWednesday = (3 + 7 - currentDay) % 7;
  if (daysUntilWednesday === 0) daysUntilWednesday = 7;
  let nextWednesday = new Date(now);
  nextWednesday.setDate(now.getDate() + daysUntilWednesday);
  nextWednesday.setUTCHours(15, 0, 0, 0);
  for (let i = 0; i < 6; i++) {
    const contestDate = new Date(nextWednesday);
    contestDate.setDate(contestDate.getDate() + i * 7);
    codechef.push({
      name: `CodeChef Starters ${115 + i}`,
      platform: "CodeChef",
      startTime: contestDate,
      endTime: new Date(contestDate.getTime() + 180 * 60000),
      duration: 180,
      url: "https://www.codechef.com/contests"
    });
  }

  // GFG (copy logic from getGFGContests)
  const gfg = [];
  let daysUntilNextSunday = (0 + 7 - currentDay) % 7;
  if (daysUntilNextSunday === 0 && now.getHours() >= 19) {
    daysUntilNextSunday = 7;
  }
  let nextGFGSunday = new Date(now);
  nextGFGSunday.setDate(now.getDate() + daysUntilNextSunday);
  nextGFGSunday.setHours(19, 0, 0, 0);
  for (let i = 0; i < 6; i++) {
    const contestDate = new Date(nextGFGSunday);
    contestDate.setDate(contestDate.getDate() + i * 7);
    gfg.push({
      name: `GFG Weekly Coding Contest ${115 + i}`,
      platform: "GeeksforGeeks",
      startTime: contestDate,
      endTime: new Date(contestDate.getTime() + 150 * 60000),
      duration: 150,
      url: "https://practice.geeksforgeeks.org/contest/gfg-weekly-coding-contest"
    });
  }

  // Combine & sort
  const allContests = [...codeforces, ...leetcode, ...codechef, ...gfg]
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  return res.status(200).json(
    new ApiResponse(200, { count: allContests.length, contests: allContests }, "All contests fetched successfully")
  );
});


export { 
    getCodeforcesContests,
    getLeetCodeContests,
    getCodeChefContests,
    getGFGContests,
    getAllContests
 };