import express from "express";
import { userInfo } from "../controllers/user";
import { checkSession } from "../middleware/session";

const router = express.Router();

router.get("/", checkSession, userInfo);

export default router;
