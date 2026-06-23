import crypto
from "crypto";

import { apiKeyRepository } from "../factories/respositoryFactory.js";
import { hashApiKey } from "../utils/hash.js";
import { platformConfig } from "../config/platform.js";

export const getApiKey = async (
  tenantId
) => {

  return await apiKeyRepository.getApiKey(
    tenantId
  );

};

export const rotateApiKey = async (
  tenantId
) => {

  // TODO:
// Wrap delete + insert
// inside database transaction
// for safe key rotation

  await apiKeyRepository.deleteApiKey(
    tenantId
  );

  const apiKey =
    "ntf_" +
    crypto
      .randomBytes(8)
      .toString("hex");
  
  const apiKeyHash = hashApiKey(apiKey);

  const expiresAt = new Date();

  expiresAt.setDate(

    expiresAt.getDate() +
    platformConfig.apiKeyExpiryDays

  );

  await apiKeyRepository.createApiKey(
    apiKeyHash,
    tenantId,
    expiresAt
  );

  return apiKey;

};
