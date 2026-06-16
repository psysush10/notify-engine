import {

  createAuditLogDb,
  getAuditLogsDb

}
from "../repositories/auditRepository.js";

export const createAuditLog =
async (
  tenantId,
  action,
  details
) => {

  return await createAuditLogDb(
    tenantId,
    action,
    details
  );

};

export const getAuditLogs =
async (
  tenantId
) => {

  return await getAuditLogsDb(
    tenantId
  );

};