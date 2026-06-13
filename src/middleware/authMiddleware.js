import { apiKeys } from "../store/apiKeyStore.js";
import {getTenantByApiKeyDb} from "../repositories/apiKeyRepository.js"

export const authenticate = async (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Authorization header missing"
    });
  }

  const apiKey = authHeader.replace("Bearer ", "");

  const tenant = await getTenantByApiKeyDb(apiKey);

  if (!tenant) {
    return res.status(401).json({
      error: "Invalid API key"
    });
  }

  req.tenantId = tenant.tenant_id;

  next();
};