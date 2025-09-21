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
    .json(new ApiResponse(200, "Codeforces contests", { count: contests.length, contests }));
});

const getLeetCodeContests = asyncHandler(async (req, res) => {
  const contests = generateLeetCode();
  return res
    .status(200)
    .json(new ApiResponse(200, "LeetCode contests",{ count: contests.length, contests }));
});

const getCodeChefContests = asyncHandler(async (req, res) => {
  const contests = generateCodeChef();
  return res
    .status(200)
    .json(new ApiResponse(200, "CodeChef contests",{ count: contests.length, contests }));
});

const getGFGContests = asyncHandler(async (req, res) => {
  const contests = generateGFG();
  return res
    .status(200)
    .json(new ApiResponse(200, "GFG contests",{ count: contests.length, contests }));
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
    .json(new ApiResponse(200, "All contests fetched successfully", { count: allContests.length, contests: allContests }));
});

export {
  getCodeforcesContests,
  getLeetCodeContests,
  getCodeChefContests,
  getGFGContests,
  getAllContests,
};
