import {
  ApiKeyRepository
}
from "../../contracts/ApiKeyRepository.js";

import {

  getApiKeyDb,
  createApiKeyDb,
  deleteApiKeyDb

}
from "../../repositories/apiKeyRepository.js";

export class PostgresApiKeyRepository
extends ApiKeyRepository {

  async getApiKey(
    tenantId
  ) {

    return await getApiKeyDb(
      tenantId
    );

  }

  async createApiKey(
    apiKeyHash,
    tenantId,
    expiresAt
  ) {

    return await createApiKeyDb(

      apiKeyHash,
      tenantId,
      expiresAt

    );

  }

  async deleteApiKey(
    tenantId
  ) {

    return await deleteApiKeyDb(
      tenantId
    );

  }

}