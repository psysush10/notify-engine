# Shared Packages & Cross-Cutting Concerns

## Objective

Define the architecture, ownership, and governance of Shared Packages and Cross-Cutting Concerns within Notify Engine V3. These components provide reusable capabilities that are consumed across Applications and Platform Modules while remaining independent of business-specific responsibilities.

The architecture should maximise reuse, maintain consistency, minimise duplication, and establish clear dependency rules for platform-wide capabilities.

---

## Decision 4 – Shared Packages & Cross-Cutting Concerns

### Problem Statement

Notify Engine V3 contains multiple Applications and Platform Modules that require common capabilities such as configuration management, logging, validation, telemetry, error handling, testing utilities, and shared contracts.

Without a well-defined shared layer, these capabilities become duplicated across services, resulting in inconsistent implementations, increased maintenance effort, and tighter coupling between modules.

The architecture should provide a reusable shared layer that centralises cross-cutting concerns while remaining independent of business logic and application-specific behaviour.

---

## Options Considered

### Option A – Duplicate Common Functionality

Each Application and Platform Module maintains its own implementation of common capabilities.

#### Advantages

* Minimal upfront planning
* Independent implementation

#### Disadvantages

* Code duplication
* Inconsistent behaviour
* Difficult maintenance
* Higher operational risk

---

### Option B – Framework-Based Shared Components

Rely primarily on framework-provided utilities with limited platform-specific abstraction.

#### Advantages

* Faster initial development
* Reduced custom implementation

#### Disadvantages

* Framework coupling
* Inconsistent abstractions
* Difficult future migration
* Limited platform governance

---

### Option C – Centralised Shared Packages

Provide reusable platform-owned packages for all cross-cutting concerns while keeping business logic within Applications and Platform Modules.

#### Advantages

* High reuse
* Consistent implementation
* Reduced duplication
* Strong governance
* Easier maintenance
* Supports long-term platform evolution

#### Disadvantages

* Requires governance
* Requires disciplined dependency management

---

## Evaluation

The repository strategy established in ARB-006-D01, the Top-Level Repository Structure defined in ARB-006-D02, and the Service Boundary model defined in ARB-006-D03 collectively establish clear ownership boundaries across the platform.

A dedicated Shared layer complements these decisions by centralising reusable capabilities without violating service ownership. This improves maintainability, simplifies testing, and ensures consistent implementation of cross-cutting concerns across the platform.

---

## Decision

Notify Engine V3 will adopt a **Centralised Shared Package Architecture**.

Shared Packages shall contain reusable platform capabilities that may be consumed by Applications and Platform Modules while remaining free from business-specific logic.

Cross-Cutting Concerns shall be implemented through Shared Packages wherever practical to maximise consistency and reduce duplication.

---

## Shared Packages

Shared Packages provide reusable code, contracts, utilities, and abstractions that support multiple architectural domains.

Shared Packages:

* are reusable
* are independently testable
* contain no business ownership
* expose stable public interfaces
* remain framework-neutral where practical

---

## Cross-Cutting Concerns

Cross-Cutting Concerns represent capabilities required throughout the platform regardless of business domain.

Examples include:

* Logging
* Configuration
* Validation
* Telemetry
* Error handling
* Testing utilities
* Shared contracts

These concerns should be implemented once and reused consistently across the platform rather than duplicated within individual Applications or Platform Modules.

---

## High-Level Dependency Model

               Applications
               /          \
              ▼            ▼
     Platform Modules   Shared Packages
              │
              ▼
        Infrastructure

Shared Packages remain the lowest architectural layer and shall not depend on higher-level modules.

---

## Dependency Rules

Shared Packages shall adhere to the following dependency rules:

* Shared Packages shall not depend on Applications.
* Shared Packages shall not depend on Platform Modules.
* Shared Packages may depend on other Shared Packages only where a clear layered dependency exists.
* Circular dependencies between Shared Packages are prohibited.
* Applications may consume Shared Packages directly.
* Platform Modules may consume Shared Packages directly.
* Business logic shall never be introduced into Shared Packages.

---

## Design Principles

Shared Packages shall adhere to the following principles:

* Reusable before configurable.
* Independent of business domains.
* Framework-agnostic where practical.
* Stable public APIs.
* Backward-compatible evolution.
* Comprehensive automated testing.
* Documentation-first approach.

---

## Review Trigger

This decision should be reviewed if additional platform-wide capabilities are introduced, if dependency rules require revision, or if architectural changes significantly alter the role of Shared Packages within Notify Engine V3.


---

# Shared Package Catalog

The Shared Package Catalog defines the reusable platform assets that may be consumed by Applications and Platform Modules. Shared Packages implement common capabilities and architectural abstractions but never own business functionality.

---

## Contracts Package

### Purpose

Provides common API contracts, request and response models, event schemas, and data transfer objects shared across the platform.

### Responsibilities

* API contracts
* Event schemas
* Request models
* Response models
* Shared DTOs
* Contract versioning

### Consumed By

* Applications
* Platform Modules

### Must Not Contain

* Business logic
* Service implementations
* Persistence models

---

## SDK Package

### Purpose

Provides reusable client libraries and internal SDKs for interacting with platform services.

### Responsibilities

* Internal service clients
* API wrappers
* Authentication helpers
* Common client abstractions

### Consumed By

* Applications
* Platform Modules

### Must Not Contain

* Business workflows
* Platform ownership

---

## Validation Package

### Purpose

Provides reusable validation rules and validation framework abstractions.

### Responsibilities

* Request validation
* Schema validation
* Common validators
* Validation helpers

### Consumed By

* Applications
* Platform Modules

### Must Not Contain

* Business validation rules specific to a single service

---

## Configuration Package

### Purpose

Provides platform-wide configuration abstractions and environment management.

### Responsibilities

* Environment configuration
* Feature flags
* Configuration loading
* Configuration validation

### Consumed By

* Applications
* Platform Modules

### Must Not Contain

* Application-specific configuration

---

## Logging Package

### Purpose

Provides a standard logging abstraction used consistently throughout the platform.

### Responsibilities

* Structured logging
* Correlation identifiers
* Log formatting
* Logging interfaces

### Consumed By

* All platform components

### Must Not Contain

* Business log messages
* Monitoring dashboards

---

## Telemetry Package

### Purpose

Provides reusable telemetry abstractions for metrics, tracing, and operational monitoring.

### Responsibilities

* Metrics helpers
* Distributed tracing
* Telemetry interfaces
* Instrumentation support

### Consumed By

* All platform components

### Must Not Contain

* Business metrics
* Dashboard implementation

---

## Errors Package

### Purpose

Provides a common error model and exception hierarchy.

### Responsibilities

* Error definitions
* Exception hierarchy
* Error codes
* Error serialization

### Consumed By

* Applications
* Platform Modules

### Must Not Contain

* Service-specific exception handling

---

## Utilities Package

### Purpose

Provides reusable helper functions and platform utilities that do not belong to any business domain.

### Responsibilities

* Common helpers
* Date and time utilities
* Identifier generation
* General utilities

### Consumed By

* Applications
* Platform Modules

### Must Not Contain

* Business rules
* Domain-specific helpers

---

## Testing Package

### Purpose

Provides reusable testing assets for unit, integration, and system testing.

### Responsibilities

* Test fixtures
* Mock factories
* Shared assertions
* Testing utilities
* Test data builders

### Consumed By

* All test projects

### Must Not Contain

* Production code
* Environment-specific test logic

---

# Shared Package Ownership Principles

Shared Packages shall follow the following ownership rules:

* Shared Packages own reusable platform capabilities, not business capabilities.
* Every package shall have a clearly defined purpose.
* Package responsibilities shall remain stable over time.
* Functionality shall not be duplicated across packages.
* Business logic must remain within Applications or Platform Modules.

---

# Package Versioning

Shared Packages shall evolve using semantic versioning principles.

Breaking changes should be introduced only through major version increments.

Applications and Platform Modules should consume stable package versions to minimise deployment risk and maintain backward compatibility across the platform.

---

# Package Lifecycle

Each Shared Package shall progress through the following lifecycle:

* Proposal
* Architecture Review
* Implementation
* Platform Adoption
* Maintenance
* Deprecation (if applicable)

Package ownership shall remain clearly assigned throughout its lifecycle.

---

# Shared Package Responsibility Matrix

| Package       | Primary Responsibility       |
| ------------- | ---------------------------- |
| Contracts     | Shared contracts and schemas |
| SDK           | Internal client libraries    |
| Validation    | Validation framework         |
| Configuration | Configuration abstraction    |
| Logging       | Logging abstraction          |
| Telemetry     | Metrics and tracing          |
| Errors        | Error model                  |
| Utilities     | Common helper functions      |
| Testing       | Shared testing framework     |
