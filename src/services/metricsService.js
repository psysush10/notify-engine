import {

  getMetricsDb,
  getProcessingMetricsDb

}
from "../repositories/eventRepository.js";

export const getMetricsService =
async (
  tenantId
) => {

  return await getMetricsDb(
    tenantId
  );

};

export const getProcessingMetricsService =
async (
  tenantId
) => {

  return await getProcessingMetricsDb(
    tenantId
  );

};