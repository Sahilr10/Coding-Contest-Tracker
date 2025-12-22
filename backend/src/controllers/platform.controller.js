import axios from "axios";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

 const connectAccount = async (req, res) => {
  const { platform, username } = req.body;
  const userId = req.user._id;

  if (!platform || !username) {
    return res.status(400).json({ message: "Platform and username required" });
  }

  const platformKey = platform.toLowerCase(); // codeforces / leetcode

  try {
    // 1️⃣ PLATFORM VALIDATION
    if (platformKey === "codeforces") {
      const cfRes = await axios.get(
        `https://codeforces.com/api/user.info?handles=${username}`
      );

      if (cfRes.data.status !== "OK") {
        return res
          .status(400)
          .json({ message: "Invalid Codeforces username" });
      }
    }

    if (platformKey === "leetcode") {
      const lcRes = await axios.get(
        `https://alfa-leetcode-api.onrender.com/${username}/contest`
      );

      // LeetCode API DOES NOT return status field
      if (!lcRes.data || !lcRes.data.contestAttend) {
        return res
          .status(400)
          .json({ message: "Invalid LeetCode username" });
      }
    }

    // 2️⃣ SAVE TO DATABASE
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.connectedAccounts[platformKey] = {
      username,
      connected: true,
      verified: true,
      lastSyncedAt: new Date(),
    };

    await user.save();

    // 3️⃣ RESPONSE
    return res.status(200).json(
      new ApiResponse(200, "Account connected successfully", {
        platform: platformKey,
        username,
      })
    );
  } catch (error) {
    console.error(error.message);

    return res.status(400).json({
      message: `Username not found on ${platform}`,
    });
  }
};

const getTotalContests = async (req, res) => {
  try {
    const { codeforces, leetcode } = req.query;

    let total = 0;

    // Codeforces
    if (codeforces) {
      const cfRes = await axios.get(
        `https://codeforces.com/api/user.rating?handle=${codeforces}`
      );
      total += cfRes.data.result.length;
    }

    // LeetCode
    if (leetcode) {
      const lcRes = await axios.get(
        `https://alfa-leetcode-api.onrender.com/${leetcode}/contest`
      );
      total += lcRes.data.contestAttend || 0;
    }

    res.json({
      success: true,
      total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};

const getAvgRating = async (req,res) =>{
  
  try {
    const { codeforces, leetcode } = req.query;

    let totalRating = 0;
    let totalContests = 0;

    // 🔵 Codeforces
    if (codeforces) {
      const cfRes = await axios.get(
        `https://codeforces.com/api/user.rating?handle=${codeforces}`
      );

      if (cfRes.data.status === "OK") {
        const ratings = cfRes.data.result;

        ratings.forEach(r => {
          totalRating += r.newRating;
          totalContests += 1;
        });
      }
    }

    // 🟠 LeetCode
    if (leetcode) {
      const lcRes = await axios.get(
        `https://alfa-leetcode-api.onrender.com/${leetcode}/contest`
      );

      const contests = lcRes.data?.contestParticipation || [];

      contests.forEach(c => {
        if (c.rating) {
          totalRating += c.rating;
          totalContests += 1;
        }
      });
    }

    if (totalContests === 0) {
      return res.json({
        success: true,
        averageRating: 0,
      });
    }

    const averageRating = Math.round(totalRating / totalContests);

    res.json({
      success: true,
      averageRating,
    });

  } catch (error) {
    console.error("Average rating error:", error.message);
    res.status(500).json({ success: false });
  }
}

const getProblemsSolved = async (req, res) => {

  //todo : addcodeforces
  try {
    const { leetcode } = req.query;

    if (!leetcode) {
      return res.json({
        success: true,
        totalSolved: 0,
      });
    }

    const lcRes = await axios.get(
      `https://alfa-leetcode-api.onrender.com/${leetcode}/solved`
    );

    res.json({
      success: true,
      totalSolved: lcRes.data.solvedProblem || 0,
      breakdown: {
        easy: lcRes.data.easySolved || 0,
        medium: lcRes.data.mediumSolved || 0,
        hard: lcRes.data.hardSolved || 0,
      },
    });
  } catch (error) {
    console.error("LeetCode solved fetch error:", error.message);
    res.status(500).json({ success: false });
  }
};

const getBadgesEarned = async (req, res) => {
  try {
    const { leetcodeUsername, codeforcesUsername } = req.query;

    let totalBadges = 0;
    let breakdown = {
      leetcode: 0,
      codeforces: 0,
    };

    // 🟠 LeetCode Badges
    if (leetcodeUsername) {
      const lcRes = await axios.get(
        `https://alfa-leetcode-api.onrender.com/${leetcodeUsername}/badges`
      );

      //  No data wrapper
      const data = lcRes.data;

      breakdown.leetcode = data.badgesCount || 0;
      totalBadges += breakdown.leetcode;
    }

    // 🔵 Codeforces "Badge" (Title-based)
    if (codeforcesUsername) {
      const cfRes = await axios.get(
        `https://codeforces.com/api/user.info?handles=${codeforcesUsername}`
      );

      if (cfRes.data.status === "OK") {
        const user = cfRes.data.result[0];

        // Treat title as 1 badge if exists
        if (user.rank && user.rank !== "unrated") {
          breakdown.codeforces = 1;
          totalBadges += 1;
        }
      }
    }

    return res.json({
      success: true,
      totalBadges,
      breakdown,
    });

  } catch (error) {
    console.error("Badges fetch error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch badges",
    });
  }
};

export {
  connectAccount,
  getTotalContests,
  getAvgRating,
  getProblemsSolved,
  getBadgesEarned
}
