import { PostgresTenantRepository } from "../adapters/postgres/PostgresTenantRepository.js";
import { PostgresEventRepository } from "../adapters/postgres/PostgresEventRepository.js";
export const tenantRepository = new PostgresTenantRepository();
export const eventRepository = new PostgresEventRepository();