import express from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { requireAuth } from "../../middlewares/auth.js";
import { getMe } from "./user.controller.js";

const router = express.Router();
router.get("/me", requireAuth, asyncHandler(getMe));

export default router;
