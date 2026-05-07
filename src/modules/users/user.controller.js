const { getUserProfile } = require("./user.service");

function getMe(req, res) {
  const profile = getUserProfile(req.auth.userId);
  res.status(200).json(profile);
}

module.exports = { getMe };
