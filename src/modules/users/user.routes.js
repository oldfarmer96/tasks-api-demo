const express = require("express");
const { asyncHandler } = require("../../middlewares/asyncHandler");
const { requireAuth } = require("../../middlewares/auth");
const { getMe } = require("./user.controller");

const router = express.Router();

router.get("/me", requireAuth, asyncHandler(getMe));

module.exports = router;
