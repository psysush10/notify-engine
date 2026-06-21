import { getEventByRequestIdDb }
from "../repositories/eventRepository.js";

export const getEventStatusService =
async (
  requestId
) => {

  return await getEventByRequestIdDb(
    requestId
  );

};