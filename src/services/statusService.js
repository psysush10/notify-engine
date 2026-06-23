import { eventRepository } from "../factories/respositoryFactory.js";

export const getEventStatusService =
async (
  requestId
) => {

  return await eventRepository.getByRequestId(
    requestId
  );

};