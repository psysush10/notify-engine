import {
  getSubscriptionDb,
  expireActiveSubscriptionDb,
  createSubscriptionDb
}
from "../repositories/subscriptionRepository.js";

import { updateTenantPlanDb } from "../repositories/tenantRepository.js";

export const getSubscription = async (tenantId) => {

  return await getSubscriptionDb(
    tenantId
  );

};

export const upgradeSubscription = async (
  tenantId,
  plan
) => {

  await expireActiveSubscriptionDb(
    tenantId
  );

  await updateTenantPlanDb(
    tenantId,
    plan
  );

  return await createSubscriptionDb(
    tenantId,
    plan
  );

};