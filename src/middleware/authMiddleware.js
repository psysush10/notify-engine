import { apiKeys } from "../config/apiKeys.js";

export const authenticate = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Authorization header missing"
    });
  }

  const apiKey = authHeader.replace("Bearer ", "");

  const tenantId = apiKeys[apiKey];

  if (!tenantId) {
    return res.status(401).json({
      error: "Invalid API key"
    });
  }

  req.tenantId = tenantId;

  next();
};