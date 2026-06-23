import { eventRepository } from "../factories/respositoryFactory.js";

export const getMetricsService =
async (
  tenantId
) => {

  return await eventRepository.getMetrics(
    tenantId
  );

};

export const getProcessingMetricsService =
async (
  tenantId
) => {

  return await eventRepository.getProcessingMetrics(
    tenantId
  );

};