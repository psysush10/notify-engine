import {

  getTodayUsageDb,
  getMonthlyUsageDb,
  incrementUsageDb

}
from "../../repositories/usageRepository.js";

export class PostgresUsageRepository {

  async getTodayUsage(
    tenantId
  ) {

    return await getTodayUsageDb(
      tenantId
    );

  }

  async getMonthlyUsage(
    tenantId
  ) {

    return await getMonthlyUsageDb(
      tenantId
    );

  }

  async incrementUsage(
    tenantId
  ) {

    return await incrementUsageDb(
      tenantId
    );

  }

}