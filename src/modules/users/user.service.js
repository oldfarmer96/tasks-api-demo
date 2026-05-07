const bcrypt = require("bcryptjs");
const { ApiError } = require("../../utils/apiError");
const { createUser, findUserByEmail, findUserById, sanitizeUser } = require("./user.store");

async function registerUser({ name, email, password }) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const trimmedName = String(name || "").trim();

  if (!trimmedName || !normalizedEmail || !password) {
    throw new ApiError(400, "name, email and password are required");
  }

  if (password.length < 8) {
    throw new ApiError(400, "password must be at least 8 characters");
  }

  if (findUserByEmail(normalizedEmail)) {
    throw new ApiError(409, "email already in use");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = createUser({
    name: trimmedName,
    email: normalizedEmail,
    passwordHash,
  });
  return sanitizeUser(user);
}

async function validateUserCredentials({ email, password }) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const user = findUserByEmail(normalizedEmail);

  if (!user) {
    throw new ApiError(401, "invalid credentials");
  }

  const validPassword = await bcrypt.compare(password || "", user.passwordHash);
  if (!validPassword) {
    throw new ApiError(401, "invalid credentials");
  }

  return user;
}

function getUserProfile(userId) {
  const user = findUserById(userId);
  if (!user) {
    throw new ApiError(404, "user not found");
  }
  return sanitizeUser(user);
}

module.exports = {
  registerUser,
  validateUserCredentials,
  getUserProfile,
};
