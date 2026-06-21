import {
  AdminAuditRepository
}
from "../../contracts/AdminAuditRepository.js";

import {

  createAdminAuditDb,
  getAdminAuditDb

}
from "../../repositories/adminAuditRepository.js";

export class PostgresAdminAuditRepository
extends AdminAuditRepository {

  async createLog(
    tenantId,
    action,
    details
  ) {

    return await createAdminAuditDb(

      tenantId,
      action,
      details

    );

  }

  async getLogs(
    tenantId
  ) {

    return await getAdminAuditDb(
      tenantId
    );

  }

}