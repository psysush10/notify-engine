import {
  AuditRepository
}
from "../../contracts/AuditRepository.js";

import {
  createAuditLogDb,
  getAuditTimelineDb
}
from "../../repositories/eventAuditRepository.js";

export class PostgresAuditRepository
extends AuditRepository {

  async createLog(
    auditLog
  ) {

    return await createAuditLogDb(
      auditLog
    );

  }

  async getLogs(
    tenantId
  ) {

    return await getAuditTimelineDb(
      tenantId
    );

  }

}