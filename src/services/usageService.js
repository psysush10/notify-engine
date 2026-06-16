import { PLAN_LIMITS }
from "../constants/plans.js";

import {
  getTodayUsageDb,
  getMonthlyUsageDb
}
from "../repositories/usageRepository.js";

import {
  getTenantByIdDb
}
from "../repositories/tenantRepository.js";

export const canTenantProcessEvent = async (tenantId) => {

  const tenant =
    await getTenantByIdDb(
      tenantId
    );

  const usage =
    await getTodayUsageDb(
      tenantId
    );

  const currentUsage =
    usage?.events_processed || 0;

  const limit =
    PLAN_LIMITS[
      tenant.plan
    ];

  return {

    allowed:
      currentUsage < limit,

    currentUsage,

    limit,

    plan:
      tenant.plan

  };

};

export const getMonthlyUsage = async (tenantId) => {

  return await getMonthlyUsageDb(
    tenantId
  );

};