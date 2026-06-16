import {getTenantByApiKeyDb} from "../repositories/apiKeyRepository.js"
import { hashApiKey } from "../utils/hash.js";
export const authenticate = async (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Authorization header missing"
    });
  }

  const apiKey = authHeader.replace("Bearer ", "");
  const apiKeyHash = hashApiKey(apiKey);

  const tenant = await getTenantByApiKeyDb(apiKeyHash);

  if (!tenant) {
    return res.status(401).json({
      error: "Invalid API key"
    });
  }

  req.tenantId = tenant.tenant_id;
  req.plan = tenant.plan;

  next();
};