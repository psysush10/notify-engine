import { PostgresTenantRepository } from "../adapters/postgres/PostgresTenantRepository.js";
import { PostgresEventRepository } from "../adapters/postgres/PostgresEventRepository.js";
import { PostgresAuditRepository } from "../adapters/postgres/PostgresAuditRepository.js";
export const tenantRepository = new PostgresTenantRepository();
export const eventRepository = new PostgresEventRepository();
export const auditRepository = new PostgresAuditRepository();