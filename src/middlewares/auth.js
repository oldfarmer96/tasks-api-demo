import { verifyToken } from "../utils/token.js";
import { ApiError } from "../utils/apiError.js";

export function requireAuth(req, _res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(new ApiError(401, "Missing or invalid bearer token"));
  }

  try {
    const payload = verifyToken(token);
    req.auth = { userId: payload.sub, email: payload.email };
    return next();
  } catch (_error) {
    return next(new ApiError(401, "Invalid or expired token"));
  }
}
