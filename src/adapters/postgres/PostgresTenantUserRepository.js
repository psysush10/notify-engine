import {
  TenantUserRepository
}
from "../../contracts/TenantUserRepository.js";

import {
  createTenantUserDb,
  getTenantUserByEmailDb,
  getTenantUsersDb,
  updateTenantUserRoleDb,
  updateTenantUserPasswordDb,
  updateLastLoginDb,
  updateTenantUserStatusDb
}
from "../../repositories/tenantUserRepository.js";

export class PostgresTenantUserRepository
extends TenantUserRepository {

  async create(
    tenantId,
    email,
    role
  ) {

    return await createTenantUserDb(
      tenantId,
      email,
      role
    );

  }

  async getByEmail(
    tenantId,
    email
  ) {

    return await getTenantUserByEmailDb(
      tenantId,
      email
    );

  }

  async getAll(
    tenantId
  ) {

    return await getTenantUsersDb(
      tenantId
    );

  }

  async updateRole(
    tenantId,
    email,
    role
  ) {

    return await updateTenantUserRoleDb(
      tenantId,
      email,
      role
    );

  }

  async updatePassword(
  tenantId,
  email,
  passwordHash
) {

  return await updateTenantUserPasswordDb(
    tenantId,
    email,
    passwordHash
  );

}

async updateLastLogin(
  tenantId,
  email
) {

  return await updateLastLoginDb(
    tenantId,
    email
  );

}

async updateStatus(
  tenantId,
  email,
  status
) {

  return await updateTenantUserStatusDb(
    tenantId,
    email,
    status
  );

}

}