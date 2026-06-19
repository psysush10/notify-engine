import { auditRepository } from "../factories/respositoryFactory.js";

export const createAuditLog =
async (
  tenantId,
  action,
  details
) => {

  return await auditRepository.createLog(
    tenantId,
    action,
    details
  );

};

export const getAuditLogs =
async (
  tenantId
) => {

  return await auditRepository.getLogs(
    tenantId
  );

};