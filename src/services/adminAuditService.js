import {
  adminAuditRepository
}
from "../factories/respositoryFactory.js";

export const createAdminAuditLog =
async (
  tenantId,
  action,
  details
) => {

  return await adminAuditRepository.createLog(

    tenantId,
    action,
    details

  );

};

export const getAdminAuditLogs =
async (
  tenantId
) => {

  return await adminAuditRepository.getLogs(
    tenantId
  );

};