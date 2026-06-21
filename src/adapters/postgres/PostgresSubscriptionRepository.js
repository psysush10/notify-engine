import {

  getSubscriptionDb,
  expireActiveSubscriptionDb,
  createSubscriptionDb

}
from "../../repositories/subscriptionRepository.js";

export class PostgresSubscriptionRepository {

  async getSubscription(
    tenantId
  ) {
    return await getSubscriptionDb(
      tenantId
    );

  }

  async expireActiveSubscription(
    tenantId
  ) {

    return await expireActiveSubscriptionDb(
      tenantId
    );

  }

  async createSubscription(
    tenantId,
    plan
  ) {

    return await createSubscriptionDb(
      tenantId,
      plan
    );

  }

}