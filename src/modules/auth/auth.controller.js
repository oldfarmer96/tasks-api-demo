import { registerUser, validateUserCredentials } from "../users/user.service.js";
import { signToken } from "../../utils/token.js";

export async function register(req, res) {
  const user = await registerUser(req.body);
  const token = signToken({ sub: user.id, email: user.email });
  res.status(201).json({ user, token, tokenType: "Bearer" });
}

export async function login(req, res) {
  const user = await validateUserCredentials(req.body);
  const token = signToken({ sub: user.id, email: user.email });
  res.status(200).json({ user, token, tokenType: "Bearer" });
}
