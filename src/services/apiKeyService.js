import crypto
from "crypto";

import {

  getApiKeyDb,
  createApiKeyDb,
  deleteApiKeyDb

}
from "../repositories/apiKeyRepository.js";
import { hashApiKey } from "../utils/hash.js";
import { platformConfig } from "../config/platform.js";

export const getApiKey = async (
  tenantId
) => {

  return await getApiKeyDb(
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

  await deleteApiKeyDb(
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

  await createApiKeyDb(
    apiKeyHash,
    tenantId,
    expiresAt
  );

  return apiKey;

};
