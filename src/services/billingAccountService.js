import { billingRepository } from "../factories/respositoryFactory.js";

export const getBillingAccount =
async (tenantId) => {

  return await billingRepository.getBillingAccount(
    tenantId
  );

};

export const updateBillingAccount =
async (
  tenantId,
  billingEmail,
  companyName
) => {

  return await billingRepository.updateBillingAccount(
    tenantId,
    billingEmail,
    companyName
  );

};