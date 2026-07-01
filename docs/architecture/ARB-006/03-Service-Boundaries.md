# Service Boundaries

## Objective

Define clear service boundaries for Notify Engine V3 to ensure that each platform capability has a well-defined responsibility, ownership, and dependency model. The architecture should promote high cohesion, loose coupling, independent evolution, and long-term maintainability while aligning with the repository strategy established in ARB-006-D01 and the repository structure defined in ARB-006-D02.

---

## Decision 3 – Service Boundaries

### Problem Statement

Notify Engine V3 is designed as a cloud-native, multi-tenant SaaS platform comprising multiple business capabilities, operational services, and shared platform components. As the platform grows, responsibilities must remain clearly separated to prevent business logic from spreading across unrelated modules.

Without explicit service boundaries, architectural ownership becomes unclear, dependencies increase over time, and changes within one capability can unintentionally affect other parts of the platform. Such coupling reduces maintainability, complicates testing, and limits the platform's ability to evolve.

The architecture should define clear ownership for every major capability while ensuring that services communicate through well-defined contracts rather than implementation details.

---

## Options Considered

### Option A – Layer-Based Service Organisation

```text
controllers/
services/
repositories/
models/
```

#### Advantages

* Familiar application structure
* Easy to understand for small projects
* Minimal architectural planning

#### Disadvantages

* Business capabilities become distributed across multiple layers
* Ownership is difficult to identify
* Encourages tight coupling
* Poor scalability for large platforms

---

### Option B – Feature-Based Service Organisation

```text
tenant/
notification/
billing/
audit/
```

#### Advantages

* Aligns with business capabilities
* Easier feature ownership
* Better modularity than layered architectures

#### Disadvantages

* Difficult to distinguish reusable platform capabilities from deployable applications
* Shared concerns may become duplicated
* Service interactions become less explicit as the platform grows

---

### Option C – Domain-Oriented Service Boundaries

Separate deployable applications from reusable platform capabilities while defining explicit ownership, dependency rules, and communication contracts.

#### Advantages

* Strong architectural boundaries
* High cohesion and low coupling
* Clear ownership of responsibilities
* Supports independent evolution of platform capabilities
* Aligns with the Modular Monorepo strategy
* Simplifies future extraction into independently deployable services

#### Disadvantages

* Requires architectural governance
* Higher upfront design effort

---

## Evaluation

The repository strategy adopted in ARB-006-D01 and the domain-oriented repository structure established in ARB-006-D02 provide the foundation for organising the platform around architectural responsibilities rather than implementation technologies.

A domain-oriented service model extends this approach by assigning each capability a single, clearly defined owner and enforcing dependency rules between applications, platform modules, and shared packages. This reduces coupling, improves maintainability, and establishes a stable architectural model that can evolve as Notify Engine grows.

---

## Decision

Notify Engine V3 will adopt **Domain-Oriented Service Boundaries**.

Each service or module will own a single business capability and expose well-defined public interfaces. Internal implementation details remain private to the owning service, while communication between services occurs through published contracts and supported interfaces.

---

## Service Classification

Notify Engine V3 classifies services into three architectural categories:

### 1. Applications

Applications are independently deployable platform components that expose APIs, user interfaces, or external endpoints.

Applications orchestrate business workflows but should delegate reusable business capabilities to Platform Modules.

---

### 2. Platform Modules

Platform Modules implement reusable business capabilities shared across one or more applications.

Platform Modules are not independently deployable applications and should remain independent of presentation concerns.

---

### 3. Shared Packages

Shared Packages provide reusable libraries, contracts, configuration, utilities, validation, logging, and other cross-cutting concerns that may be consumed by both Applications and Platform Modules.

Shared Packages must remain free from business-specific logic.

---

## High-Level Dependency Model

The platform adopts a one-directional dependency model.

```text
Applications
      │
      ▼
Platform Modules
      │
      ▼
Shared Packages
```

Dependencies flow only downward.

Lower architectural layers must never depend on higher layers.

---

## Dependency Principles

* Applications may depend on Platform Modules and Shared Packages.
* Platform Modules may depend on Shared Packages.
* Shared Packages must not depend on Applications or Platform Modules.
* Services communicate through published interfaces rather than internal implementations.
* Infrastructure remains independent of business logic.

---



## Rationale

Separating the platform into Applications, Platform Modules, and Shared Packages establishes clear ownership boundaries while preserving architectural flexibility.

This model encourages modular development, simplifies testing, reduces coupling, and enables platform capabilities to evolve independently without affecting unrelated services. It also provides a stable architectural foundation for future scaling, service extraction, and deployment evolution.

---

## Review Trigger

This decision should be reviewed if the platform introduces additional architectural service categories, significantly changes its deployment model, or if operational, organisational, or regulatory requirements require redefining service ownership or dependency rules.


---

# Application Service Catalog

Applications are independently deployable platform components that expose APIs, user interfaces, or external endpoints. Each application owns a well-defined set of responsibilities and communicates with other applications through published interfaces.

Applications should orchestrate business workflows while delegating reusable business capabilities to Platform Modules.

---

## Control Plane

### Purpose

The Control Plane provides the administrative and management capabilities of the Notify Engine platform. It owns tenant lifecycle management, platform configuration, authentication, authorization, subscriptions, billing, and operational administration.

### Responsibilities

* Tenant lifecycle management
* User authentication and authorization
* API key management
* Tenant configuration
* Subscription management
* Billing integration
* Product catalogue
* Administrative APIs
* Platform governance

### Owns

* Tenant metadata
* User accounts
* API credentials
* Subscription information
* Billing configuration
* Platform configuration

### Does Not Own

* Event ingestion
* Notification processing
* Queue management
* Retry policies
* Message delivery

### Public Interfaces

* Administrative REST APIs
* Authentication endpoints
* Tenant management APIs
* Billing and subscription APIs

### Dependencies

* Platform Modules
* Shared Packages

---

## Data Plane

### Purpose

The Data Plane is responsible for processing notification events. It receives requests, validates payloads, routes events, coordinates processing, and ensures reliable message delivery.

### Responsibilities

* Event ingestion
* Request validation
* Event routing
* Queue coordination
* Notification processing
* Delivery orchestration
* Retry coordination
* Dead Letter Queue coordination
* Event replay
* Processing metrics

### Owns

* Event lifecycle
* Delivery workflow
* Processing state
* Delivery coordination

### Does Not Own

* Tenant lifecycle
* User management
* Billing
* Subscription management
* Administrative configuration

### Public Interfaces

* Event ingestion APIs
* Event status APIs
* Event history APIs
* Metrics APIs

### Dependencies

* Platform Modules
* Shared Packages

---

## Admin Portal

### Purpose

The Admin Portal provides the internal operational interface for platform administrators. It enables management of tenants, subscriptions, platform configuration, operational monitoring, and system administration.

### Responsibilities

* Platform administration
* Tenant administration
* Operational dashboards
* Billing administration
* Platform monitoring
* Support tooling

### Owns

* User interface only

Business logic remains within the Control Plane.

### Does Not Own

* Business rules
* Tenant management logic
* Notification processing
* Platform services

### Public Interfaces

* Web application
* Administrative dashboards

### Dependencies

* Control Plane APIs
* Shared Packages

---

## Developer Portal (Future)

### Purpose

The Developer Portal provides self-service capabilities for platform customers and integration developers.

### Responsibilities

* API documentation
* SDK distribution
* API key management
* Webhook testing
* Usage dashboards
* Developer onboarding

### Owns

* Developer experience
* Self-service workflows

### Does Not Own

* Authentication services
* Billing logic
* Notification processing
* Tenant lifecycle

### Public Interfaces

* Developer web application
* API documentation
* Interactive testing tools

### Dependencies

* Control Plane APIs
* Shared Packages

---

# Application Ownership Principles

Applications must adhere to the following architectural principles:

* Each application owns a clearly defined business responsibility.
* Applications communicate through published interfaces rather than internal implementation details.
* Business capabilities shared across multiple applications belong in Platform Modules.
* Cross-cutting concerns belong in Shared Packages.
* Applications should remain independently deployable and independently evolvable.

---

# Ownership Rules

Every business capability must have a single owning application.
Applications may orchestrate workflows but must not duplicate business logic owned by Platform Modules.
Shared Packages must never become the owner of business capabilities.
If ownership is unclear, the architecture should be reviewed before implementation proceeds.

---
# Application Responsibility Matrix

| Capability                 | Owning Application        |
| -------------------------- | ------------------------- |
| Tenant Management          | Control Plane             |
| Authentication             | Control Plane             |
| Authorization              | Control Plane             |
| API Key Management         | Control Plane             |
| Billing                    | Control Plane             |
| Subscription Management    | Control Plane             |
| Event Ingestion            | Data Plane                |
| Event Processing           | Data Plane                |
| Event Replay               | Data Plane                |
| Notification Delivery      | Data Plane                |
| Operational Administration | Admin Portal              |
| Developer Self-Service     | Developer Portal (Future) |

---

# Platform Module Catalog

Platform Modules encapsulate reusable business capabilities that may be consumed by one or more Applications. They contain business logic but do not expose user interfaces or operate as independently deployable applications.

Platform Modules promote reuse, reduce duplication, and establish clear ownership of platform capabilities.

---

## Identity Module

### Purpose

Provides authentication, authorization, identity validation, and access control services for the platform.

### Responsibilities

* Authentication
* Authorization
* Token validation
* Role management
* Permission evaluation

### Consumed By

* Control Plane
* Admin Portal
* Developer Portal

---

## Tenant Module

### Purpose

Manages tenant-specific configuration and platform isolation metadata.

### Responsibilities

* Tenant configuration
* Tenant metadata
* Plan allocation
* Feature flags
* Usage limits

### Consumed By

* Control Plane
* Data Plane

---

## Event Processing Module

### Purpose

Implements the event lifecycle from validation through successful delivery or failure handling.

### Responsibilities

* Event validation
* Processing workflow
* Retry policies
* Dead Letter Queue coordination
* Replay handling
* Idempotency enforcement

### Consumed By

* Data Plane

---

## Notification Module

### Purpose

Provides channel-independent notification delivery capabilities.

### Responsibilities

* Email delivery
* Webhook delivery
* Slack delivery
* Future channel integration
* Delivery abstraction

### Consumed By

* Data Plane

---

## Routing Module

### Purpose

Determines how events are routed to the appropriate delivery channel and processing workflow.

### Responsibilities

* Channel selection
* Delivery routing
* Rule evaluation
* Routing policies

### Consumed By

* Data Plane

---

## Billing Module

### Purpose

Provides billing and subscription calculation services.

### Responsibilities

* Usage calculation
* Invoice generation
* Subscription validation
* Billing policies

### Consumed By

* Control Plane

---

## Subscription Module

### Purpose

Manages subscription lifecycle and product entitlements.

### Responsibilities

* Plan validation
* Product entitlement
* Upgrade and downgrade rules
* Subscription lifecycle

### Consumed By

* Control Plane

---

## Audit Module

### Purpose

Captures platform activities for operational visibility and compliance.

### Responsibilities

* Audit event recording
* Change history
* Administrative activity logging
* Security audit trails

### Consumed By

* Control Plane
* Data Plane
* Admin Portal

---

## Observability Module

### Purpose

Provides telemetry, monitoring, metrics, and operational insight across the platform.

### Responsibilities

* Metrics
* Distributed tracing
* Health reporting
* Operational dashboards
* Performance monitoring

### Consumed By

* All Applications

---

## Scheduler Module

### Purpose

Coordinates scheduled and background platform activities.

### Responsibilities

* Scheduled jobs
* Retry scheduling
* Maintenance tasks
* Background workflows

### Consumed By

* Control Plane
* Data Plane

---

## Configuration Module

### Purpose

Provides centralized configuration management for platform components.

### Responsibilities

* Configuration loading
* Environment abstraction
* Feature toggles
* Runtime configuration

### Consumed By

* All Applications
* All Platform Modules

---

## Orchestration Module

### Purpose

Coordinates workflows involving multiple platform modules while preserving clear ownership boundaries.

### Responsibilities

* Workflow orchestration
* Cross-module coordination
* Long-running process management

### Consumed By

* Control Plane
* Data Plane

---

# Platform Module Principles

Platform Modules shall adhere to the following architectural principles:

* Each module owns exactly one business capability.
* Platform Modules remain independent of presentation concerns.
* Modules communicate through published contracts.
* Modules must avoid circular dependencies.
* Shared business logic belongs within Platform Modules rather than Applications.

---

# Platform Ownership Matrix

| Platform Capability     | Owning Module    |
| ----------------------- | ---------------- |
| Identity & Access       | Identity         |
| Tenant Configuration    | Tenant           |
| Event Lifecycle         | Event Processing |
| Notification Channels   | Notification     |
| Event Routing           | Routing          |
| Billing                 | Billing          |
| Subscription Management | Subscription     |
| Audit Logging           | Audit            |
| Metrics & Monitoring    | Observability    |
| Background Jobs         | Scheduler        |
| Configuration           | Configuration    |
| Workflow Coordination   | Orchestration    |

---

# Platform Module Classification

Platform Modules are classified into two architectural categories to distinguish business capabilities from cross-cutting platform services.

## Domain Modules

Domain Modules implement core business capabilities of the Notify Engine platform.

| Module           | Responsibility                                         |
| ---------------- | ------------------------------------------------------ |
| Identity         | Authentication, authorization and access control       |
| Tenant           | Tenant lifecycle, configuration and isolation metadata |
| Event Processing | Event lifecycle, retry, replay and idempotency         |
| Notification     | Channel abstraction and notification delivery          |
| Routing          | Event routing and delivery policies                    |
| Billing          | Usage calculation, invoicing and billing policies      |
| Subscription     | Product entitlements and subscription lifecycle        |

---

## Platform Infrastructure Modules

Platform Infrastructure Modules provide reusable operational capabilities shared across the platform.

| Module        | Responsibility                                |
| ------------- | --------------------------------------------- |
| Audit         | Audit trails and operational history          |
| Configuration | Runtime configuration and feature management  |
| Observability | Metrics, telemetry, health and monitoring     |
| Scheduler     | Background processing and scheduled workloads |
| Orchestration | Cross-module workflow coordination            |

---

# Shared Package Catalog

Shared Packages provide reusable libraries and cross-cutting capabilities consumed throughout the platform. They must remain independent of business-specific logic.

| Package       | Responsibility                                     |
| ------------- | -------------------------------------------------- |
| contracts     | Shared API contracts, DTOs and message schemas     |
| sdk           | Internal SDKs and reusable client libraries        |
| validation    | Validation framework and reusable validators       |
| configuration | Configuration helpers and environment abstractions |
| logging       | Standardised logging abstractions                  |
| telemetry     | Metrics, tracing and telemetry helpers             |
| errors        | Common exception hierarchy and error models        |
| utilities     | General-purpose utilities and helper functions     |
| testing       | Shared testing utilities, fixtures and mocks       |

---

# Architectural Governance Rules

The following governance rules apply across the Notify Engine platform.

## Ownership Rules

* Every business capability shall have a single owning Application or Platform Module.
* Ownership shall never be shared between multiple modules.
* Shared Packages must never become owners of business capabilities.

---

## Dependency Rules

* Applications may depend on Platform Modules and Shared Packages.
* Platform Modules may depend only on Shared Packages.
* Shared Packages must not depend on Applications or Platform Modules.
* Circular dependencies are prohibited.

---

## Communication Rules

* Services communicate through published interfaces only.
* Internal implementation details shall not be accessed across module boundaries.
* Platform Modules expose stable public contracts.
* Shared Packages expose reusable APIs without business-specific behaviour.

---

## Evolution Rules

* New platform capabilities shall be assigned to an existing owner whenever possible.
* New Platform Modules require Architecture Review Board approval.
* Changes to ownership boundaries require an ADR update.

---

# Platform Responsibility Matrix

The following matrix is the authoritative ownership reference for Notify Engine V3.

| Capability              | Owner                     |
| ----------------------- | ------------------------- |
| Tenant Lifecycle        | Control Plane             |
| User Authentication     | Identity Module           |
| Authorization           | Identity Module           |
| API Key Management      | Control Plane             |
| Tenant Configuration    | Tenant Module             |
| Event Ingestion         | Data Plane                |
| Event Processing        | Event Processing Module   |
| Event Routing           | Routing Module            |
| Notification Delivery   | Notification Module       |
| Retry Management        | Event Processing Module   |
| Dead Letter Queue       | Event Processing Module   |
| Event Replay            | Event Processing Module   |
| Billing                 | Billing Module            |
| Subscription Management | Subscription Module       |
| Audit Logging           | Audit Module              |
| Platform Monitoring     | Observability Module      |
| Scheduled Tasks         | Scheduler Module          |
| Workflow Coordination   | Orchestration Module      |
| Shared Contracts        | Shared Contracts Package  |
| Validation              | Shared Validation Package |
| Logging                 | Shared Logging Package    |
| Telemetry               | Shared Telemetry Package  |
| Testing Utilities       | Shared Testing Package    |

---

# Rationale

The adopted service boundary model separates deployable applications, reusable business capabilities and cross-cutting shared packages into clearly defined architectural layers.

This organisation establishes explicit ownership, prevents duplication of business logic, strengthens modularity and enables each capability to evolve independently. The dependency and governance rules reinforce long-term maintainability while preserving architectural consistency as the platform grows.

---

# Consequences

## Positive

* Clear ownership of every platform capability.
* High cohesion and low coupling.
* Improved maintainability and testability.
* Predictable dependency model.
* Easier onboarding for new contributors.
* Simplified future decomposition into independently deployable services.

## Negative

* Requires architectural governance.
* Contributors must understand ownership boundaries.
* New capabilities require deliberate placement within the service catalog.

---

# Review Trigger

This decision shall be reviewed if significant platform capabilities are introduced, if deployment architecture changes substantially, or if organisational, operational, security or regulatory requirements require redefining service ownership or dependency boundaries.

======================================================================================================================================================

## Architecture Review Board Outcome

======================================================================================================================================================

# Decision Summary (ARB-006-D03)

**Decision ID:** ARB-006-D03

**Status:** APPROVED

**Confidence:** High

**Review Date:** 28-Jun-2026

**Reviewed By:** Architecture Review Board

**Reference ADR:** ADR-003

**Next Decision:** Shared Packages & Cross-Cutting Concerns

