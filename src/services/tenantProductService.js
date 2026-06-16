import {
  getTenantProductsDb,
  enableTenantProductDb,
  updateTenantProductStatusDb
}
from "../repositories/tenantProductRepository.js";

export const getTenantProducts = async (tenantId) => {

  return await getTenantProductsDb(
    tenantId
  );

};

export const enableTenantProduct = async (
  tenantId,
  productCode
) => {

  return await enableTenantProductDb(
    tenantId,
    productCode
  );

};

export const updateTenantProductStatus = async (
  tenantId,
  productCode,
  enabled
) => {

  return await updateTenantProductStatusDb(
    tenantId,
    productCode,
    enabled
  );

};