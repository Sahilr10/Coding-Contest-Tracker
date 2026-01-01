import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

import {
  fetchCodeforces,
  fetchLeetCode,
  generateCodeChef,
  generateGFG,
} from "../services/contest.service.js";

const getCodeforcesContests = asyncHandler(async (req, res) => {
  try {
    const contests = await fetchCodeforces();
    return res
      .status(200)
      .json(new ApiResponse(200, "Codeforces contests", { count: contests.length, contests }));
  } catch (error) {
    console.error("Error fetching Codeforces contests:", error.message);
    return res
      .status(500)
      .json(new ApiResponse(500, "Error fetching Codeforces contests", { error: error.message }));
  }
});

const getLeetCodeContests = asyncHandler(async (req, res) => {
  try {
    const contests = await fetchLeetCode();
    return res
      .status(200)
      .json(new ApiResponse(200, "LeetCode contests", { count: contests.length, contests }));
  } catch (error) {
    console.error("Error fetching LeetCode contests:", error.message);
    return res
      .status(500)
      .json(new ApiResponse(500, "Error fetching LeetCode contests", { error: error.message }));
  }
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
  try {
    // Fetch external APIs sequentially with delays to avoid rate limiting
    const codeforcesContests = await fetchCodeforces();
    
    // Add delay between API calls
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const leetcodeContests = await fetchLeetCode();

    let allContests = [
      ...codeforcesContests,
      ...leetcodeContests,
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
  } catch (error) {
    // Return cached or partial data if APIs fail
    console.error("Error fetching all contests:", error.message);
    return res
      .status(500)
      .json(new ApiResponse(500, "Error fetching contests", { error: error.message }));
  }
});

export {
  getCodeforcesContests,
  getLeetCodeContests,
  getCodeChefContests,
  getGFGContests,
  getAllContests,
};
