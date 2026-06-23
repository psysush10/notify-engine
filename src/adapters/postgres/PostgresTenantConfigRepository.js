import {
  TenantConfigRepository
}
from "../../contracts/TenantConfigRepository.js";

import {

  createTenantConfigDb,
  getTenantConfigDb,
  updateTenantConfigDb

}
from "../../repositories/tenantConfigRepository.js";

export class PostgresTenantConfigRepository
extends TenantConfigRepository {

  async createConfig(
    tenantId
  ) {

    return await createTenantConfigDb(
      tenantId
    );

  }

  async getConfig(
    tenantId
  ) {

    return await getTenantConfigDb(
      tenantId
    );

  }

  async updateConfig(
    tenantId,
    config
  ) {

    return await updateTenantConfigDb(

      tenantId,
      config

    );

  }

}