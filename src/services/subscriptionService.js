import { tenantRepository,subscriptionRepository } from "../factories/respositoryFactory.js";

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

  await tenantRepository.updatePlan(
    tenantId,
    plan
  );

  return await subscriptionRepository.createSubscription(
    tenantId,
    plan
  );

};