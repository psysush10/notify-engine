import {
  createTenantDb,
  getAllTenantsDb
}
from "../repositories/tenantRepository.js";

const tenant =
  await createTenantDb(
    "org_demo",
    "Demo Tenant"
  );

console.log(
  "Created:",
  tenant
);

const tenants =
  await getAllTenantsDb();

console.log(
  "All Tenants:",
  tenants
);

process.exit();