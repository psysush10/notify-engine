import { PostgresTenantRepository } from "../adapters/postgres/PostgresTenantRepository.js";
import { PostgresEventRepository } from "../adapters/postgres/PostgresEventRepository.js";
import { PostgresAuditRepository } from "../adapters/postgres/PostgresAuditRepository.js";
import { PostgresUsageRepository } from "../adapters/postgres/PostgresUsageRepository.js";
import { PostgresSubscriptionRepository } from "../adapters/postgres/PostgresSubscriptionRepository.js";
import { PostgresBillingRepository } from "../adapters/postgres/PostgresBillingRepository.js";
import { PostgresInvoiceRepository } from "../adapters/postgres/PostgresInvoiceRepository.js";
import {PostgresAdminAuditRepository } from "../adapters/postgres/PostgresAdminAuditRepository.js"

export const tenantRepository = new PostgresTenantRepository();
export const eventRepository = new PostgresEventRepository();
export const auditRepository = new PostgresAuditRepository();
export const adminAuditRepository = new PostgresAdminAuditRepository();
export const usageRepository = new PostgresUsageRepository();
export const subscriptionRepository = new PostgresSubscriptionRepository();
export const billingRepository = new PostgresBillingRepository();
export const invoiceRepository = new PostgresInvoiceRepository();
