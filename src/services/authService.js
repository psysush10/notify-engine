import { tenantUserRepository } from "../factories/respositoryFactory.js";

import {
  hashPassword,
  verifyPassword
}
from "../utils/password.js";

import { generateToken } from "../utils/jwt.js";

import { createAuditLog } from "./auditService.js";

export const setupPassword = async (
  tenantId,
  email,
  password
) => {

  const passwordHash =
    await hashPassword(
      password
    );

  const result = await tenantUserRepository
    .updatePassword(
      tenantId,
      email,
      passwordHash
    );
  
  await createAuditLog(
    tenantId,
    "PASSWORD UDPATED",
    {
      email
    }
  );

  return result;

};

export const login = async (
  tenantId,
  email,
  password
) => {

  const user =
    await tenantUserRepository
      .getByEmail(
        tenantId,
        email
      );

  if (!user) {

    await createAuditLog(
      tenantId,
      "LOGIN_FAILED",
      {email}
    );

    throw new Error(
      "User not found"
    );

  }

  const validPassword =
    await verifyPassword(
      password,
      user.password_hash
    );

  if (!validPassword) {

    await createAuditLog(
      tenantId,
      "LOGIN FAILED",
      {
        email
      }
    );

    throw new Error(
      "Invalid credentials"
    );

  }

  await tenantUserRepository.updateLastLogin(
    tenantId,
    email
  );

  await createAuditLog(
    tenantId,
    "LOGIN_SUCCESS",
    {
      email
    }
  );

  const token =
    generateToken({

      tenantId,

      email:
        user.email,

      role:
        user.role

    });

  return {

    token,

    tenantId,

    email:
      user.email,

    role:
      user.role

  };

};