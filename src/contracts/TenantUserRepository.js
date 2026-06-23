export class TenantUserRepository {

  async create(
    tenantId,
    email,
    role
  ) {

    throw new Error(
      "Not implemented"
    );

  }

  async getByEmail(
    tenantId,
    email
  ) {

    throw new Error(
      "Not implemented"
    );

  }

  async getAll(
    tenantId
  ) {

    throw new Error(
      "Not implemented"
    );

  }

  async updateRole(
    tenantId,
    email,
    role
  ) {

    throw new Error(
      "Not implemented"
    );

  }

  async updateStatus(
    tenantId,
    email,
    status
  ) {

    throw new Error(
      "Not implemented"
    );

  }

  async updatePassword(
  tenantId,
  email,
  passwordHash
) {

  throw new Error(
    "Not implemented"
  );

}

async updateLastLogin(
  tenantId,
  email
) {

  throw new Error(
    "Not implemented"
  );

}



}