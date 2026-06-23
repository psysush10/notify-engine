import { eventRepository } from "../factories/respositoryFactory.js";

export const getHistoryService =
async (
  tenantId
) => {

  return await eventRepository.getEvents(
    tenantId
  );

};