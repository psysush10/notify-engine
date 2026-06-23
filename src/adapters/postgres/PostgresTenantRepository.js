import {
  TenantRepository
}
from "../../contracts/TenantRepository.js";

import {

  getTenantByIdDb,
  createTenantDb,
  getAllTenantsDb,
  updateTenantPlanDb

}
from "../../repositories/tenantRepository.js";

export class PostgresTenantRepository
extends TenantRepository {

  async getById(
    tenantId
  ) {

    return await getTenantByIdDb(
      tenantId
    );

  }

  async create(
    tenantId,
    tenantName
  ) {

    return await createTenantDb(

      tenantId,
      tenantName

    );

  }

  async getAll() {

    return await getAllTenantsDb();

  }

  async updatePlan(
    tenantId,
    plan
  ) {

    return await updateTenantPlanDb(

      tenantId,
      plan

    );

  }

}