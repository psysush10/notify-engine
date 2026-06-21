import {

  getBillingAccountDb,
  upsertBillingAccountDb

}
from "../../repositories/billingRepository.js";

export class PostgresBillingRepository {

  async getBillingAccount(
    tenantId
  ) {

    return await getBillingAccountDb(
      tenantId
    );

  }

  async updateBillingAccount(
    tenantId,
    billingEmail,
    companyName
  ) {

    return await upsertBillingAccountDb(
      tenantId,
      billingEmail,
      companyName
    );

  }

}