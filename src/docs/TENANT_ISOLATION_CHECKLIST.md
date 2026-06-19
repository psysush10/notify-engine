# Tenant Isolation Checklist

## Sprint 49 - Tenant Isolation Audit

### Authentication

* [x] All tenant-facing APIs protected by API Key authentication
* [x] Authentication middleware injects req.tenantId
* [x] Tenant context derived from API key, not request payload

---

## Event APIs

* [x] POST /event
* [x] GET /event
* [x] GET /event/:requestId
* [x] GET /event/:requestId/timeline
* [x] POST /event/:requestId/replay

Status: SAFE

---

## Metrics APIs

* [x] GET /metrics
* [x] GET /metrics/processing

Verified:

* Uses req.tenantId
* No tenantId accepted from request parameters

Status: SAFE

---

## History APIs

* [x] GET /history

Changes:

* Removed tenantId path parameter access pattern
* History now derived from authenticated tenant context
* Uses req.tenantId

Status: SAFE

---

## Dashboard APIs

* [x] GET /dashboard

Notes:

* Platform-wide operational dashboard
* Authentication added
* Candidate for future migration to /admin/dashboard

Status: PROTECTED

---

## Usage APIs

* [x] GET /tenant/usage
* [x] GET /tenant/usage/monthly

Status: SAFE

---

## Subscription APIs

* [x] GET /tenant/subscription
* [x] PUT /tenant/subscription

Status: SAFE

---

## Billing APIs

* [x] GET /tenant/billing
* [x] PUT /tenant/billing
* [x] GET /tenant/billing/invoice-preview

Status: SAFE

---

## Invoice APIs

* [x] POST /tenant/invoices/generate
* [x] GET /tenant/invoices
* [x] PATCH /tenant/invoices/:id/pay

Status: SAFE

---

## Customer APIs

* [x] GET /customer/dashboard

Changes:

* Authentication enforced

Status: SAFE

---

## Technical Debt Removed

* [x] Removed getTenantHistory()
* [x] Removed notificationStore.js
* [x] Removed notificationHistory imports
* [x] Postgres established as single source of truth

---

## Findings

No cross-tenant access paths identified after remediation.

Platform tenant isolation verified as of Sprint 49.
