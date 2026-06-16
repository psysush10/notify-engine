import {
  getTenantByIdDb
}
from "../repositories/tenantRepository.js";

export const getTenantById =
async tenantId =>
  await getTenantByIdDb(
    tenantId
  );