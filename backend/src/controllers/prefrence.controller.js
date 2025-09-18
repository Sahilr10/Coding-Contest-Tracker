import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Get user preferences
const getUserPreferences = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("favoritePlatforms reminderTimes");
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        favoritePlatforms: user.favoritePlatforms,
        reminderTimes: user.reminderTimes
      },
      "User preferences fetched"
    )
  );
});

// Update user preferences
const updateUserPreferences = asyncHandler(async (req, res) => {
  const { favoritePlatforms, reminderTimes } = req.body;

  // Validate favoritePlatforms
  if (!Array.isArray(favoritePlatforms) || favoritePlatforms.length === 0) {
    return res.status(400).json(new ApiResponse(400, null, "Invalid favorite platforms"));
  }

  // Validate reminderTimes
  if (!Array.isArray(reminderTimes) || reminderTimes.length === 0) {
    return res.status(400).json(new ApiResponse(400, null, "Invalid reminder times"));
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { favoritePlatforms, reminderTimes },
    { new: true }
  ).select("favoritePlatforms reminderTimes");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        favoritePlatforms: user.favoritePlatforms,
        reminderTimes: user.reminderTimes
      },
      "User preferences updated"
    )
  );
});



export { getUserPreferences, updateUserPreferences };
