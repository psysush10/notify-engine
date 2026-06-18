import {
  EventRepository
}
from "../../contracts/EventRepository.js";

import {

  createEventDb,
  getEventByRequestIdDb,
  getEventByRequestIdAndTenantDb,
  updateEventStatusDb,
  getEventsByTenantDb,

}
from "../../repositories/eventRepository.js";

export class PostgresEventRepository
extends EventRepository {

  async create(event) {

    return await createEventDb(
      event
    );

  }

  async getByRequestId(requestId) {

    return await getEventByRequestIdDb(
      requestId
    );

  }

  async updateStatus(requestId,status,failureReason) {

    return await updateEventStatusDb(

      requestId,
      status,
      failureReason

    );

  }

async getByRequestIdAndTenant(requestId, tenantId) {

  return await
    getEventByRequestIdAndTenantDb(
      requestId,
      tenantId
    );

}

async getEvents(tenantId, status, page, limit) {

  return await
    getEventsByTenantDb(

      tenantId,
      status,
      page,
      limit

    );

}

}