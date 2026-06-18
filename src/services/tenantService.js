import { tenantRepository } from "../factories/respositoryFactory.js";

export const getTenantById = async (tenantId )=> {
  return await tenantRepository.getById(tenantId);
}
  