import { getUserProfile } from "./user.service.js";

export async function getMe(req, res) {
  const profile = await getUserProfile(req.auth.userId);
  res.status(200).json(profile);
}
