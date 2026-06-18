import {
  TenantRepository
}
from "../../contracts/TenantRepository.js";

import {
  getTenantByIdDb
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

}