const { registerUser, validateUserCredentials } = require("../users/user.service");
const { signToken } = require("../../utils/token");

async function register(req, res) {
  const user = await registerUser(req.body);
  const token = signToken({ sub: user.id, email: user.email });
  res.status(201).json({ user, token, tokenType: "Bearer" });
}

async function login(req, res) {
  const user = await validateUserCredentials(req.body);
  const token = signToken({ sub: user.id, email: user.email });
  res.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    token,
    tokenType: "Bearer",
  });
}

module.exports = { register, login };
