// AK - 30/Mar/2026: Simple API key authentication - nothing fancy, just a basic check
export const authenticateAPIKey = (req, res, next) => {
  // AK - 30/Mar/2026: Look for API key in Authorization header or x-api-key header
  const apiKey = req.headers.authorization?.replace('Bearer ', '') || req.headers['x-api-key'];
  
  if (!apiKey) {
    return res.status(401).json({
      error: "API key required",
      message: "Include API key in Authorization header (Bearer token) or x-api-key header"
    });
  }

  // AK - 30/Mar/2026: Check against configured API key from environment
  const validAPIKey = process.env.API_KEY || 'notify-engine-secret-key';
  
  if (apiKey !== validAPIKey) {
    return res.status(403).json({
      error: "Invalid API key",
      message: "The provided API key is not valid"
    });
  }

  // AK - 30/Mar/2026: All good, proceed to next middleware
  next();
};