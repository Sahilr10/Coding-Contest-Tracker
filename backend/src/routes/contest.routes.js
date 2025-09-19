import Router from "express";
import { 
    getCodeforcesContests, 
    getLeetCodeContests,
    getCodeChefContests,
    getGFGContests,
    getAllContests
} from "../controllers/contest.controller.js";
import e from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getUserPreferences, updateUserPreferences } from "../controllers/prefrence.controller.js";

const router = Router();

router.route("/codeforces").get(getCodeforcesContests);
router.route("/leetcode").get(getLeetCodeContests);
router.route("/codechef").get(getCodeChefContests);
router.route("/gfg").get(getGFGContests);
router.route("/all").get(getAllContests);

//protected routes
router.route("/prefrences")
    .get( verifyJWT, getUserPreferences)
    .put(verifyJWT, updateUserPreferences);



export default router;