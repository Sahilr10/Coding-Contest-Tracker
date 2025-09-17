import Router from "express";
import { 
    getCodeforcesContests, 
    getLeetCodeContests,
    getCodeChefContests,
    getGFGContests,
    getAllContests
} from "../controllers/contest.controller.js";
import e from "express";

const router = Router();

router.route("/codeforces").get(getCodeforcesContests);
router.route("/leetcode").get(getLeetCodeContests);
router.route("/codechef").get(getCodeChefContests);
router.route("/gfg").get(getGFGContests);
router.route("/all").get(getAllContests);

export default router;