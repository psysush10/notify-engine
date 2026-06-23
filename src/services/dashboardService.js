import { eventRepository } from "../factories/respositoryFactory.js";

export const getDashboardService =
async () => {

  return await eventRepository.getDashboard();

};