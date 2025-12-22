import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken, getCurrentUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { connectAccount, getAvgRankChange, getAvgRating, getBadgesEarned, getBestPerformance, getPlatformWiseTable, getProblemsSolved, getRatingProgress, getTotalContests, getWinRate } from "../controllers/platform.controller.js";


const router = Router();

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/me").get(verifyJWT, getCurrentUser)
router.route("/connected-account").post(verifyJWT,connectAccount)
router.route("/total-contests").get(verifyJWT,getTotalContests)
router.route("/average-rating").get(verifyJWT,getAvgRating)
router.route("/problems-Solved").get(verifyJWT,getProblemsSolved)
router.route("/badges-earned").get(verifyJWT,getBadgesEarned)
router.route("/win-rate").get(verifyJWT,getWinRate)
router.route("/avg-rank-change").get(verifyJWT,getAvgRankChange)
router.route("/best-performance").get(verifyJWT,getBestPerformance)
router.route("/platform-wise-table").get(verifyJWT,getPlatformWiseTable)
router.route("/rating-progress").get(verifyJWT,getRatingProgress)
export default router;