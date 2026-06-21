export class AdminAuditRepository {

  async createLog(
    tenantId,
    action,
    details
  ) {

    throw new Error(
      "createLog not implemented"
    );

  }

  async getLogs(
    tenantId
  ) {

    throw new Error(
      "getLogs not implemented"
    );

  }

}