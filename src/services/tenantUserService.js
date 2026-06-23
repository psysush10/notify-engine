import {
  tenantUserRepository
}
from "../factories/respositoryFactory.js";

export const createTenantUser =
async (
  tenantId,
  email,
  role
) => {

  return await tenantUserRepository.create(
    tenantId,
    email,
    role
  );

};

export const getTenantUsers =
async (
  tenantId
) => {

  return await tenantUserRepository.getAll(
    tenantId
  );

};

export const updateTenantUserRole =
async (
  tenantId,
  email,
  role
) => {

  return await tenantUserRepository.updateRole(
    tenantId,
    email,
    role
  );

};