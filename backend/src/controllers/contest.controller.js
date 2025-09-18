import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

import {
  fetchCodeforces,
  generateLeetCode,
  generateCodeChef,
  generateGFG,
} from "../services/contest.service.js";

const getCodeforcesContests = asyncHandler(async (req, res) => {
  const contests = await fetchCodeforces();
  return res
    .status(200)
    .json(new ApiResponse(200, { count: contests.length, contests }, "Codeforces contests"));
});

const getLeetCodeContests = asyncHandler(async (req, res) => {
  const contests = generateLeetCode();
  return res
    .status(200)
    .json(new ApiResponse(200, { count: contests.length, contests }, "LeetCode contests"));
});

const getCodeChefContests = asyncHandler(async (req, res) => {
  const contests = generateCodeChef();
  return res
    .status(200)
    .json(new ApiResponse(200, { count: contests.length, contests }, "CodeChef contests"));
});

const getGFGContests = asyncHandler(async (req, res) => {
  const contests = generateGFG();
  return res
    .status(200)
    .json(new ApiResponse(200, { count: contests.length, contests }, "GFG contests"));
});

const getAllContests = asyncHandler(async (req, res) => {
  let allContests = [
    ...(await fetchCodeforces()),
    ...generateLeetCode(),
    ...generateCodeChef(),
    ...generateGFG(),
  ];

  // Personalized filter
  if (req.query.personalized === "true" && req.user) {
    const user = await User.findById(req.user._id).select("favoritePlatforms");
    allContests = allContests.filter(c => user.favoritePlatforms.includes(c.platform));
  }

  // Sort
  allContests.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  return res
    .status(200)
    .json(new ApiResponse(200, { count: allContests.length, contests: allContests }, "All contests fetched successfully"));
});

export {
  getCodeforcesContests,
  getLeetCodeContests,
  getCodeChefContests,
  getGFGContests,
  getAllContests,
};
