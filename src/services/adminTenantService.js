import {
  getAllTenantsDb
}
from "../repositories/tenantRepository.js";

export const getAllTenantsService =
async () => {

  return await getAllTenantsDb();

};