import {
  tenantUserRepository
}
from "../factories/respositoryFactory.js";

export const getUsers =
async (
  tenantId
) => {

  return await tenantUserRepository
    .getAll(
      tenantId
    );

};

export const createUser =
async (
  tenantId,
  email,
  role
) => {

  return await tenantUserRepository
    .create(
      tenantId,
      email,
      role
    );

};

export const updateUserRole =
async (
  tenantId,
  email,
  role
) => {

  return await tenantUserRepository
    .updateRole(
      tenantId,
      email,
      role
    );

};

export const updateUserStatus =
async (
  tenantId,
  email,
  status
) => {

  return await tenantUserRepository
    .updateStatus(
      tenantId,
      email,
      status
    );

};