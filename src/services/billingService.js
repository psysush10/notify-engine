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