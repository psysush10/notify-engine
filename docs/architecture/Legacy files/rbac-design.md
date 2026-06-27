# Notify Engine - RBAC Design

**Version:** 1.0
**Created:** 22-Jun-2026
**Sprint:** Sprint 84 - RBAC Design

---

# Purpose

Role-Based Access Control (RBAC) provides authorization for authenticated users within Notify Engine.

RBAC determines:

* Who can access a resource
* What actions they can perform
* Which platform areas are restricted

RBAC operates after authentication and tenant resolution.

---

# Design Principles

1. Simple over complex
2. Tenant isolation by default
3. Platform administration separated from tenant administration
4. Read-only access supported
5. Extensible for future user management

---

# Roles

## SUPER_ADMIN

Platform-level administrator.

### Permissions

* Manage all tenants
* Access all tenant data
* Manage billing
* Manage subscriptions
* Manage products
* View all audit logs
* Access admin dashboards
* Access platform metrics

### Restrictions

None.

---

## TENANT_ADMIN

Administrative owner of a tenant.

### Permissions

* View events
* Replay events
* View metrics
* View history
* View dashboards
* Manage tenant configuration
* Manage products
* Manage billing
* Manage subscriptions
* View tenant audit logs

### Restrictions

* Cannot access platform administration
* Cannot access other tenants

---

## TENANT_OPERATOR

Operational user.

### Permissions

* View events
* Replay events
* View metrics
* View history
* View dashboards

### Restrictions

* Cannot manage billing
* Cannot manage subscriptions
* Cannot manage products
* Cannot modify tenant configuration
* Cannot access platform administration

---

## VIEWER

Read-only user.

### Permissions

* View events
* View history
* View metrics
* View dashboards

### Restrictions

* Cannot replay events
* Cannot modify configuration
* Cannot manage products
* Cannot manage billing
* Cannot manage subscriptions
* Cannot access platform administration

---

# Resources

The following resources participate in RBAC authorization.

```text
events
history
metrics
dashboard
tenant_config
billing
subscription
products
audit
admin
```

---

# Actions

RBAC supports three actions.

## READ

Allows viewing data.

Examples:

* View events
* View metrics
* View dashboard

---

## WRITE

Allows creating or updating data.

Examples:

* Update configuration
* Enable products
* Update billing information

---

## MANAGE

Full access to a resource.

Includes:

* Read
* Write
* Administrative operations

---

# Permission Matrix

| Resource      | SUPER_ADMIN | TENANT_ADMIN | TENANT_OPERATOR | VIEWER |
| ------------- | ----------- | ------------ | --------------- | ------ |
| events        | manage      | manage       | read            | read   |
| history       | manage      | read         | read            | read   |
| metrics       | manage      | read         | read            | read   |
| dashboard     | manage      | read         | read            | read   |
| tenant_config | manage      | manage       | none            | none   |
| billing       | manage      | manage       | none            | none   |
| subscription  | manage      | manage       | none            | none   |
| products      | manage      | manage       | none            | none   |
| audit         | manage      | read         | none            | none   |
| admin         | manage      | none         | none            | none   |

---

# Event Replay Policy

Replay is considered an operational activity.

| Role            | Replay Events |
| --------------- | ------------- |
| SUPER_ADMIN     | Yes           |
| TENANT_ADMIN    | Yes           |
| TENANT_OPERATOR | Yes           |
| VIEWER          | No            |

---

# Route Authorization Mapping

## Platform Administration

```text
/admin/dashboard
/admin/tenant/*
/admin/audit/*
```

Required role:

```text
SUPER_ADMIN
```

---

## Tenant Configuration

```text
/tenant/config/*
```

Required role:

```text
TENANT_ADMIN
```

---

## Product Management

```text
/tenant/products/*
```

Required role:

```text
TENANT_ADMIN
```

---

## Billing

```text
/tenant/billing/*
```

Required role:

```text
TENANT_ADMIN
```

---

## Subscription

```text
/tenant/subscription/*
```

Required role:

```text
TENANT_ADMIN
```

---

## Events

```text
/events/*
```

Required role:

```text
VIEWER+
```

---

## Metrics

```text
/metrics/*
```

Required role:

```text
VIEWER+
```

---

## History

```text
/history/*
```

Required role:

```text
VIEWER+
```

---

# Future User Model

RBAC will eventually be attached to tenant users.

Proposed table:

```sql
CREATE TABLE tenant_users (
  id SERIAL PRIMARY KEY,
  tenant_id VARCHAR(255),
  email VARCHAR(255),
  role VARCHAR(50)
);
```

Current Sprint:

* Design only
* No implementation

---

# Middleware Contract

Future middleware:

```javascript
authorize(resource, action)
```

Example:

```javascript
router.put(
  "/tenant/config",
  authorize(
    "tenant_config",
    "manage"
  ),
  updateTenantConfig
);
```

---

# Implementation Plan

## Sprint 84

* Define RBAC model
* Define roles
* Define resources
* Define actions
* Define route mappings

Status: COMPLETE

---

## Sprint 85

* Create permission matrix module
* Create authorization middleware
* Create role resolver
* Protect selected routes

Status: PENDING

---

# Notes

* Authentication and authorization remain separate concerns.
* Tenant isolation continues to be enforced independently of RBAC.
* RBAC applies after tenant identification and authentication.
* Future user onboarding will assign one of the defined roles.
* Design intentionally favors simplicity and operational clarity over fine-grained permissions.
