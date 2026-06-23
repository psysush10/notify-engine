import {
  AuditRepository
}
from "../../contracts/AuditRepository.js";

import {
  createAuditLogDb,
  getAuditLogsDb
}
from "../../repositories/auditRepository.js";

export class PostgresAuditRepository
extends AuditRepository {

  async createLog(
    tenantId,
    action,
    details
  ) {

    return await createAuditLogDb(
      tenantId,
      action,
      details
    );

  }

  async getLogs(
    tenantId
  ) {

    return await getAuditLogsDb(
      tenantId
    );

  }

}