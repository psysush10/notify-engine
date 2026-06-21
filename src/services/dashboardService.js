import { getDashboardDb } from "../repositories/eventRepository.js";

export const getDashboardService =
async () => {

  return await getDashboardDb();

};