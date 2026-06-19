# Repository Audit

## Completed

- [x] TenantRepository
- [x] EventRepository
- [x] AuditRepository

## Pending

- [ ] UsageRepository
- [ ] SubscriptionRepository
- [ ] BillingRepository
- [ ] InvoiceRepository


Notes:
Controllers should not directly import repository DB functions.
Controllers should consume repository abstractions.