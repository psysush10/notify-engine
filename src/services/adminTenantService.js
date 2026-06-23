import { tenantRepository } from "../factories/respositoryFactory.js";

export const getAllTenantsService =
async () => {

  return await tenantRepository.getAll();

};