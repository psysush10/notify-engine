import {getTenantByApiKeyDb} from "../repositories/apiKeyRepository.js"
import { hashApiKey } from "../utils/hash.js";
import { logger } from "../platform/logger/logger.js";

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

  if(tenant?.expires_at && new Date(tenant.expires_at) < new Date()){
    return res.status(401).json({
      error: "API key expired"
    });
  }

  if (!tenant) {

    logger.audit("Invalid API key", {
      apiKey: apiKey.substring(0,10)
    });
    
    return res.status(401).json({
      error: "Invalid API key"
    });
  }

  req.tenantId = tenant.tenant_id;
  req.role = "TENANT";
  req.plan = tenant.plan;

  next();
};