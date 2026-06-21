import { subscriptionRepository } from "../factories/respositoryFactory.js";

import { updateTenantPlanDb } from "../repositories/tenantRepository.js";

export const getSubscription = async (tenantId) => {

  return await subscriptionRepository.getSubscription(
    tenantId
  );

};

export const upgradeSubscription = async (
  tenantId,
  plan
) => {

  await subscriptionRepository.expireActiveSubscription(
    tenantId
  );

  await updateTenantPlanDb(
    tenantId,
    plan
  );

  return await subscriptionRepository.createSubscription(
    tenantId,
    plan
  );

};