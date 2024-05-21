import express from "express";
import { signin, signout, signup } from "../controllers/auth";
import { checkSession } from "../middleware/session";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", checkSession, signout);

export default router;
