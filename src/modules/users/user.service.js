import bcrypt from "bcryptjs";
import { ApiError } from "../../utils/apiError.js";
import { get, run } from "../../db/database.js";

function sanitizeUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.created_at,
  };
}

export async function registerUser({ name, email, password }) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const trimmedName = String(name || "").trim();

  if (!trimmedName || !normalizedEmail || !password) {
    throw new ApiError(400, "name, email and password are required");
  }
  if (password.length < 8) {
    throw new ApiError(400, "password must be at least 8 characters");
  }

  const exists = await get("SELECT id FROM users WHERE email = ?", [normalizedEmail]);
  if (exists) throw new ApiError(409, "email already in use");

  const passwordHash = await bcrypt.hash(password, 12);
  const now = new Date().toISOString();
  const result = await run(
    "INSERT INTO users (name, email, password_hash, created_at) VALUES (?, ?, ?, ?)",
    [trimmedName, normalizedEmail, passwordHash, now]
  );

  const user = await get("SELECT id, name, email, created_at FROM users WHERE id = ?", [result.lastID]);
  return sanitizeUser(user);
}

export async function validateUserCredentials({ email, password }) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const user = await get("SELECT * FROM users WHERE email = ?", [normalizedEmail]);
  if (!user) throw new ApiError(401, "invalid credentials");

  const validPassword = await bcrypt.compare(password || "", user.password_hash);
  if (!validPassword) throw new ApiError(401, "invalid credentials");

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.created_at,
  };
}

export async function getUserProfile(userId) {
  const user = await get("SELECT id, name, email, created_at FROM users WHERE id = ?", [userId]);
  if (!user) throw new ApiError(404, "user not found");
  return sanitizeUser(user);
}
