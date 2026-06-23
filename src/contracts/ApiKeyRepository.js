export class ApiKeyRepository {

  async getApiKey(
    tenantId
  ) {
    throw new Error("Not implemented");
  }

  async createApiKey(
    apiKeyHash,
    tenantId,
    expiresAt
  ) {
    throw new Error("Not implemented");
  }

  async deleteApiKey(
    tenantId
  ) {
    throw new Error("Not implemented");
  }

}