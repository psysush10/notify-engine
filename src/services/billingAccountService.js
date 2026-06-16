import {
  getBillingAccountDb,
  upsertBillingAccountDb
}
from "../repositories/billingRepository.js";

export const getBillingAccount =
async (tenantId) => {

  return await getBillingAccountDb(
    tenantId
  );

};

export const updateBillingAccount =
async (
  tenantId,
  billingEmail,
  companyName
) => {

  return await upsertBillingAccountDb(
    tenantId,
    billingEmail,
    companyName
  );

};