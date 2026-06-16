import {
  getTenantProductsDb,
  enableTenantProductDb
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