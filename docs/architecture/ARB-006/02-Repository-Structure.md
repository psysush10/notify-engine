# Repository Structure

## Objective

Define the top-level repository organization for Notify Engine V3 so that architectural responsibilities are clearly represented within the source tree, enabling independent evolution of platform capabilities while maintaining simplicity for development, operations, and long-term maintenance.

---

## Decision 2 – Top-Level Repository Structure

### Problem Statement

Notify Engine V3 consists of multiple architectural domains including deployable applications, platform services, shared libraries, infrastructure definitions, documentation, and operational assets. As the platform evolves into a cloud-native, multi-tenant SaaS solution, the repository must communicate these architectural boundaries clearly.

Without a well-defined top-level repository structure, implementation responsibilities can become inconsistent, platform capabilities may become tightly coupled, and long-term maintainability becomes increasingly difficult. The repository organization should reinforce the approved architecture, improve discoverability, and provide a scalable foundation for future development.

---

## Options Considered

### Option A – Layer-Based Repository Structure

```
controllers/
services/
repositories/
models/
config/
utils/
```

#### Advantages

* Familiar to most developers
* Simple for small applications
* Minimal initial setup

#### Disadvantages

* Business capabilities become scattered
* Weak architectural boundaries
* High coupling across layers
* Difficult to scale for large platforms

---

### Option B – Technology-Based Repository Structure

```
frontend/
backend/
database/
terraform/
scripts/
```

#### Advantages

* Easy to understand
* Clear separation of technology stacks

#### Disadvantages

* Organised around implementation technologies instead of platform capabilities
* Encourages cross-cutting dependencies
* Does not accurately represent the system architecture

---

### Option C – Domain-Oriented Repository Structure

```
apps/
platform/
shared/
infra/
docs/
tools/
scripts/
tests/
.github/
```

#### Advantages

* Mirrors the approved platform architecture
* Strong separation of architectural responsibilities
* Improves discoverability
* Encourages modular development
* Infrastructure and documentation become first-class assets
* Supports future repository decomposition if required

#### Disadvantages

* Requires architectural discipline
* Slight learning curve for new contributors

---

## Evaluation

The repository should reflect architectural responsibilities rather than implementation technologies. A domain-oriented structure aligns naturally with the Modular Monorepo strategy approved in ARB-006-D01 and reinforces the separation between Control Plane, Data Plane, Shared Platform Components, Infrastructure, and Documentation.

This approach improves maintainability, supports independent evolution of platform capabilities, and provides a stable organisational model that can scale as Notify Engine grows.

---

## Decision

Notify Engine V3 will adopt a **Domain-Oriented Top-Level Repository Structure**.

The repository root will be organised according to architectural responsibilities rather than technical layers or programming frameworks.

---

## Top-Level Repository Structure

```text
notify-engine/

├── apps/
├── platform/
├── shared/
├── infra/
├── docs/
├── tools/
├── scripts/
├── tests/
└── .github/
```

---

## Top-Level Directory Responsibilities

| Directory     | Responsibility                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **apps/**     | Deployable platform applications such as the Control Plane, Data Plane, Admin Portal, and future platform services.       |
| **platform/** | Core platform capabilities, domain services, orchestration components, and reusable business modules.                     |
| **shared/**   | Common libraries, SDKs, contracts, utilities, configuration packages, and reusable components shared across applications. |
| **infra/**    | Infrastructure as Code, Kubernetes manifests, Terraform configurations, deployment assets, and environment definitions.   |
| **docs/**     | Architecture documentation, ADRs, operational runbooks, API documentation, diagrams, and design artefacts.                |
| **tools/**    | Internal developer tooling, project generators, migration utilities, validation tools, and automation helpers.            |
| **scripts/**  | Build scripts, deployment automation, operational scripts, and maintenance utilities.                                     |
| **tests/**    | Cross-module integration tests, end-to-end tests, performance tests, and system validation suites.                        |
| **.github/**  | CI/CD workflows, repository governance, issue templates, pull request templates, and GitHub configuration.                |

---

## Rationale

The selected repository structure directly reflects the logical architecture of Notify Engine V3 rather than its implementation technologies. Each top-level directory represents a distinct architectural responsibility, making the repository easier to understand, navigate, and maintain.

By aligning the repository structure with the platform architecture, developers can more easily identify ownership boundaries, reduce unnecessary coupling, and evolve platform capabilities independently. This organisation also ensures that infrastructure definitions, documentation, and operational assets remain first-class citizens within the repository.

The selected repository structure applies the Repository Design Principles established in ARB-006-D01, particularly architectural alignment, separation of concerns, independent evolution, cloud agnosticism, Infrastructure as Code, documentation-first, testability, and production readiness.

The structure supports the current development model while providing a clear migration path towards repository decomposition should organisational or operational requirements evolve in the future.

---

## Consequences

### Positive

* Repository structure mirrors the approved platform architecture.
* Clear ownership boundaries between major platform capabilities.
* Improved discoverability and developer onboarding.
* Encourages modular implementation.
* Infrastructure as Code remains integrated with application development.
* Documentation evolves alongside implementation.
* Supports future repository decomposition if required.

### Negative

* Requires governance to maintain architectural boundaries.
* Contributors must understand repository organisation principles.
* Initial repository structure may appear larger than required for early implementation stages.

---

## Review Trigger

This decision should be reviewed if significant architectural changes introduce new platform domains, require additional top-level organisational units, or if organisational, operational, regulatory, or security requirements justify restructuring the repository.

======================================================================================================================================================

## Architecture Review Board Outcome

======================================================================================================================================================

# Decision Summary (ARB-006-D02)

**Decision ID:** ARB-006-D02

**Status:** APPROVED

**Confidence:** High

**Review Date:** 27-Jun-2026

**Reviewed By:** Architecture Review Board

**Reference ADR:** ADR-002

**Next Decision:** Service Boundaries

=======================================================================================================================================================