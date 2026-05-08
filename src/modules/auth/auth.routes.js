import express from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { register, login } from "./auth.controller.js";

const router = express.Router();
router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));

export default router;
