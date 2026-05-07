const express = require("express");
const { asyncHandler } = require("../../middlewares/asyncHandler");
const { requireAuth } = require("../../middlewares/auth");
const { list, getOne, create, update, remove } = require("./task.controller");

const router = express.Router();

router.use(requireAuth);
router.get("/", asyncHandler(list));
router.get("/:taskId", asyncHandler(getOne));
router.post("/", asyncHandler(create));
router.put("/:taskId", asyncHandler(update));
router.delete("/:taskId", asyncHandler(remove));

module.exports = router;
