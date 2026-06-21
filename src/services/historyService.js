import { getEventsByTenantDb } from "../repositories/eventRepository.js";

export const getHistoryService =
async (
  tenantId
) => {

  return await getEventsByTenantDb(
    tenantId
  );

};