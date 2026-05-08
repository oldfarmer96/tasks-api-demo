import express from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { requireAuth } from "../../middlewares/auth.js";
import { list, getOne, create, update, remove } from "./task.controller.js";

const router = express.Router();
router.use(requireAuth);
router.get("/", asyncHandler(list));
router.get("/:taskId", asyncHandler(getOne));
router.post("/", asyncHandler(create));
router.put("/:taskId", asyncHandler(update));
router.delete("/:taskId", asyncHandler(remove));

export default router;
