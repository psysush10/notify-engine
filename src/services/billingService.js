import { PLAN_LIMITS }
from "../constants/plans.js";

import { PLAN_PRICING, OVERAGE_RATE }
from "../constants/pricing.js";

import {
  getTodayUsageDb,
  getMonthlyUsageDb
}
from "../repositories/usageRepository.js";

import {
  getTenantByIdDb
}
from "../repositories/tenantRepository.js";

import {
  getSubscriptionDb
}
from "../repositories/subscriptionRepository.js";

import {
  getBillingAccountDb
}
from "../repositories/billingRepository.js";

export const getUsageSummary = async (tenantId) => {

  const tenant =
    await getTenantByIdDb(
      tenantId
    );

  const usage =
    await getTodayUsageDb(
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
    await getTenantByIdDb(
      tenantId
    );

  const usage =
    await getMonthlyUsageDb(
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

export const getInvoicePreview = async (tenantId) => {

  const billingAccount =
    await getBillingAccountDb(
      tenantId
    );

  const subscription =
    await getSubscriptionDb(
      tenantId
    );

  const usage =
    await getMonthlyUsageDb(
      tenantId
    );

  const plan =
    subscription.plan;

  const pricing =
    PLAN_PRICING[plan];

  const basePrice =
    pricing.basePrice;

  const includedUsage =
    pricing.includedUsage;

  const totalUsage =
    Number(
      usage.total_usage
    );

  const excessUsage =
    Math.max(
      0,
      totalUsage - includedUsage
    );

  const overage =
    Number(
      (
        excessUsage *
        OVERAGE_RATE
      ).toFixed(2)
    );

  const total =
    Number(
      (
        basePrice +
        overage
      ).toFixed(2)
    );

  return {

    tenantId,

  companyName:
    billingAccount.company_name,

  billingEmail:
    billingAccount.billing_email,

  plan,

  month:
    new Date()
      .toISOString()
      .slice(0,7),

  usage:
    totalUsage,

  includedUsage,

  excessUsage,

  basePrice,

  overage,

  total

  };

};