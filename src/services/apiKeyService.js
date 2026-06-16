import crypto
from "crypto";

import {

  getApiKeyDb,
  createApiKeyDb,
  deleteApiKeyDb

}
from "../repositories/apiKeyRepository.js";
import { hashApiKey } from "../utils/hash.js";

export const getApiKey =
async (
  tenantId
) => {

  return await getApiKeyDb(
    tenantId
  );

};

export const rotateApiKey =
async (
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

  await createApiKeyDb(
    apiKeyHash,
    tenantId
  );

  return apiKey;

};