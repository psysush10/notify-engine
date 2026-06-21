import { PLAN_LIMITS }
from "../constants/plans.js";

import {
  usageRepository,
  tenantRepository,
}
from "../factories/respositoryFactory.js";

import {
  getTenantByIdDb
}
from "../repositories/tenantRepository.js";

export const canTenantProcessEvent = async (tenantId) => {

  const tenant =
    await tenantRepository.getById(
      tenantId
    );

  const usage =
    await usageRepository.getTodayUsage(
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

  return await usageRepository.getMonthlyUsage(
    tenantId
  );

};

export const getUsageSummary = async (tenantId) => {

  const tenant =
    await tenantRepository.getById(
      tenantId
    );

  const usage =
    await usageRepository.getTodayUsage(
      tenantId
    );

  const todayUsage =
    usage?.events_processed || 0;

  const limit =
    PLAN_LIMITS[
      tenant.plan
    ];

  return {

    tenantId,

    plan:
      tenant.plan,

    todayUsage,

    limit,

    remaining:
      Math.max(
        0,
        limit - todayUsage
      ),

    usagePercentage:
      Math.min(
        100,
        Math.round(
          (todayUsage / limit) * 100
        )
      )

  };

};

export const getMonthlyUsageSummary = async (tenantId) => {

  const tenant =
    await tenantRepository.getById(
      tenantId
    );

  const usage =
    await usageRepository.getMonthlyUsage(
      tenantId
    );

  return {

    tenantId,

    plan:
      tenant.plan,

    month:
      new Date()
        .toISOString()
        .slice(0,7),

    totalUsage:
      Number(
        usage.total_usage
      )

  };

};