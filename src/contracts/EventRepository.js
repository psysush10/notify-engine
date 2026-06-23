export class EventRepository {

  async create(event) {

    throw new Error(
      "Not implemented"
    );

  }

  async getByRequestId(requestId) {

    throw new Error(
      "Not implemented"
    );

  }

  async updateStatus(requestId,status,failureReason) {

    throw new Error(
      "Not implemented"
    );

  }

  async getByRequestIdAndTenant(requestId,tenantId) {

  throw new Error(
    "Not implemented"
  );

}

async getEvents(tenantId,status,page,limit) {

  throw new Error(
    "Not implemented"
  );

}

async getDashboard() {
  throw new Error("Not implemented");
}

async getMetrics(tenantId) {
  throw new Error("Not implemented");
}

async getProcessingMetrics(tenantId) {
  throw new Error("Not implemented");
}

}