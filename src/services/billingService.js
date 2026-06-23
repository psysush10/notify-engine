import { PLAN_LIMITS }
from "../constants/plans.js";

import { PLAN_PRICING, OVERAGE_RATE }
from "../constants/pricing.js";

import { usageRepository, tenantRepository, subscriptionRepository, billingRepository } from "../factories/respositoryFactory.js"



export const getInvoicePreview = async (tenantId) => {

  const billingAccount =
    await billingRepository.getBillingAccount(
      tenantId
    );

  if (!billingAccount) {
  throw new Error(
    `Billing account not configured for tenant ${tenantId}`
  );
}

  const subscription =
    await subscriptionRepository.getSubscription(
      tenantId
    );

  const usage =
    await usageRepository.getMonthlyUsage(
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