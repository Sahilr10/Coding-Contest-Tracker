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

const getWinRate = async (req, res) => {
  try {
    const { codeforces, leetcode } = req.query;

    let wins = 0;
    let total = 0;

    /* CODEFORCES */
    if (codeforces) {
      const cfRes = await axios.get(
        `https://codeforces.com/api/user.rating?handle=${codeforces}`
      );

      if (cfRes.data.status === "OK") {
        cfRes.data.result.forEach((contest) => {
          total++;
          if (contest.newRating > contest.oldRating) {
            wins++;
          }
        });
      }
    }

    /*  LEETCODE */
    if (leetcode) {
      const lcRes = await axios.get(
        `https://alfa-leetcode-api.onrender.com/${leetcode}/contest`
      );

      const contests = lcRes.data?.contestParticipation || [];

      contests.forEach((contest) => {
        total++;
        if (
          contest.contestTopPercentage !== undefined &&
          contest.contestTopPercentage <= 25
        ) {
          wins++;
        }
      });
    }

    const winRate =
      total === 0 ? 0 : Number(((wins / total) * 100).toFixed(1));

    return res.json({
      success: true,
      winRate,
      wins,
      totalContests: total,
    });
  } catch (error) {
    console.error("Win rate error:", error.message);
    res.status(500).json({ success: false });
  }
};

const getAvgRankChange = async (req, res) => {
  try {
    const { codeforces, leetcode } = req.query;

    let totalChange = 0;
    let count = 0;

    /* =======================
       CODEFORCES
    ======================= */
    if (codeforces) {
      const cfRes = await axios.get(
        `https://codeforces.com/api/user.rating?handle=${codeforces}`
      );

      if (cfRes.data.status === "OK") {
        const ratings = cfRes.data.result;

        for (let i = 1; i < ratings.length; i++) {
          const diff =
            ratings[i].newRating - ratings[i].oldRating;

          totalChange += diff;
          count++;
        }
      }
    }

    /* =======================
       LEETCODE
    ======================= */
    if (leetcode) {
      const lcRes = await axios.get(
        `https://alfa-leetcode-api.onrender.com/${leetcode}/contest`
      );

      const contests = lcRes.data?.contestParticipation || [];

      for (let i = 1; i < contests.length; i++) {
        const prev = contests[i - 1]?.ranking;
        const curr = contests[i]?.ranking;

        if (prev && curr) {
          totalChange += prev - curr;
          count++;
        }
      }
    }

    
    const avgRankChange =
      count === 0 ? 0 : Math.round(totalChange / count);

    return res.json({
      success: true,
      averageRankChange: avgRankChange,
    });
  } catch (error) {
    console.error("Avg rank change error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to calculate avg rank change",
    });
  }
};

const getBestPerformance = async (req, res) => {
  try {
    const { codeforces, leetcode } = req.query;

    let bestPercentile = null;

    // 🔵 Codeforces
    if (codeforces) {
      const ratingRes = await axios.get(
        `https://codeforces.com/api/user.rating?handle=${codeforces}`
      );

      if (ratingRes.data.status === "OK") {
        ratingRes.data.result.forEach(contest => {
          if (contest.rank && contest.totalParticipants) {
            const percentile =
              (contest.rank / contest.totalParticipants) * 100;

            if (
              bestPercentile === null ||
              percentile < bestPercentile
            ) {
              bestPercentile = percentile;
            }
          }
        });
      }
    }

    // 🟠 LeetCode
    if (leetcode) {
      const lcRes = await axios.get(
        `https://alfa-leetcode-api.onrender.com/${leetcode}/contest`
      );

      if (lcRes.data?.contestTopPercentage !== undefined) {
        const lcPercent = lcRes.data.contestTopPercentage * 100;

        if (
          bestPercentile === null ||
          lcPercent < bestPercentile
        ) {
          bestPercentile = lcPercent;
        }
      }
    }

    if (bestPercentile === null) {
      return res.json({
        success: true,
        bestPerformance: null,
      });
    }

    res.json({
      success: true,
      bestPerformance: Number(bestPercentile.toFixed(1)),
    });
  } catch (error) {
    console.error("Best performance error:", error.message);
    res.status(500).json({ success: false });
  }
};

const getPlatformWiseTable = async (req, res) => {
  try {
    const { codeforces, leetcode } = req.query;
    const table = [];

    /* =====================
       CODEFORCES
       ===================== */
    if (codeforces) {
      const cfRes = await axios.get(
        `https://codeforces.com/api/user.rating?handle=${codeforces}`
      );

      if (cfRes.data.status === "OK") {
        const contests = cfRes.data.result;

        table.push({
          platform: "Codeforces",
          contests: contests.length,
          avgRank: null,      //  not available
          bestRank: null      //  not available
        });
      }
    }

    /* =====================
       LEETCODE
       ===================== */
    if (leetcode) {
      const lcRes = await axios.get(
        `https://alfa-leetcode-api.onrender.com/${leetcode}/contest`
      );

      const contests = lcRes.data?.contestParticipation || [];

      let rankSum = 0;
      let rankCount = 0;
      let bestRank = Infinity;

      contests.forEach(c => {
        if (typeof c.ranking === "number") {
          rankSum += c.ranking;
          rankCount++;
          bestRank = Math.min(bestRank, c.ranking);
        }
      });

      table.push({
        platform: "LeetCode",
        contests: contests.length,
        avgRank: rankCount === 0 ? 0 : Math.round(rankSum / rankCount),
        bestRank: bestRank === Infinity ? 0 : bestRank
      });
    }

    return res.json({
      success: true,
      data: table
    });

  } catch (error) {
    console.error("Platform table error:", error.message);
    return res.status(500).json({ success: false });
  }
};

const getRatingProgress = async (req, res) => {
  try {
    const { codeforces, leetcode } = req.query;

    let points = [];

    /* =====================
       CODEFORCES
    ===================== */
    if (codeforces) {
      const cfRes = await axios.get(
        `https://codeforces.com/api/user.rating?handle=${codeforces}`
      );

      if (cfRes.data.status === "OK") {
        cfRes.data.result.forEach((c) => {
          points.push({
            timestamp: c.ratingUpdateTimeSeconds * 1000,
            rating: c.newRating,
            platform: "Codeforces"
          });
        });
      }
    }

    /* =====================
       LEETCODE
    ===================== */
    if (leetcode) {
      const lcRes = await axios.get(
        `https://alfa-leetcode-api.onrender.com/${leetcode}/contest`
      );

      const contests = lcRes.data?.contestParticipation || [];

      contests.forEach((c) => {
        if (c.rating && c.contest?.startTime) {
          points.push({
            timestamp: c.contest.startTime * 1000,
            rating: Math.round(c.rating),
            platform: "LeetCode"
          });
        }
      });
    }

    /* =====================
       SORT CHRONOLOGICALLY
    ===================== */
    points.sort((a, b) => a.timestamp - b.timestamp);

    /* =====================
       FORMAT FOR FRONTEND
    ===================== */
    const formatted = points.map((p) => ({
      label: new Date(p.timestamp).toLocaleString("default", {
        month: "short",
        year: "numeric"
      }),
      rating: p.rating
    }));

    return res.json({
      success: true,
      data: formatted
    });

  } catch (error) {
    console.error("Rating progress error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch rating progress"
    });
  }
};



export {
  connectAccount,
  getTotalContests,
  getAvgRating,
  getProblemsSolved,
  getBadgesEarned,
  getWinRate,
  getAvgRankChange,
  getBestPerformance,
  getPlatformWiseTable,
  getRatingProgress
}
