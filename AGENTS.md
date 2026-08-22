# AGENTS.md

This file provides repository-wide guidance for coding agents and automated contributors. More specific `AGENTS.md` files, when present in subdirectories, take precedence for files in their scope.

## Project context

This repository contains a centralized stock exchange organized as a Bun and Turborepo TypeScript monorepo. Its main domains are the HTTP backend, matching engine, WebSocket service, integration tests, and shared packages. Redis Streams are used for asynchronous communication between the backend and engine.

## Working guidelines

- Read the root `package.json`, `turbo.json`, and relevant workspace files before making changes.
- Preserve existing user changes and avoid unrelated refactors.
- Keep changes focused on the requested behavior and update documentation when a public contract changes.
- Prefer shared types and validation schemas for messages that cross application boundaries.
- Do not add dependencies unless the standard library or an existing dependency cannot reasonably solve the problem.
- Never commit secrets, generated credentials, local environment files, build output, or dependency directories.

## Architecture boundaries

- `apps/backend`: request validation, authentication, API orchestration, and communication with the engine.
- `apps/engine`: deterministic order matching, order-book state, and balance transitions.
- `apps/ws`: authenticated real-time connections, subscriptions, and event delivery.
- `apps/tests`: integration and end-to-end behavior spanning applications.
- `packages/common`: stable domain types, message contracts, and broadly shared utilities.
- `packages/db`: database schema and persistence access.
- `packages/ui`: reusable UI components.

Do not duplicate matching or balance mutation logic outside the engine. Keep transport concerns out of domain logic, and do not expose database-specific structures as public message contracts.

## Test-driven development

Use a red-green-refactor workflow for behavioral changes:

1. Add a focused test that demonstrates the missing or incorrect behavior.
2. Run it and confirm that it fails for the expected reason.
3. Implement the smallest change that makes it pass.
4. Refactor while keeping the test suite green.
5. Add integration coverage when behavior crosses a process or queue boundary.

Tests must be deterministic and isolated. Avoid arbitrary sleeps; use observable events, bounded polling, or controlled clocks. Cover rejection paths and invariants as well as successful flows.

## Exchange correctness

- Represent prices, quantities, fees, and balances with integers in documented minor units or a precise decimal type. Never use binary floating-point arithmetic for money.
- Validate order side, type, price, quantity, market, ownership, and available balance at the appropriate boundary.
- Preserve price-time priority and define deterministic tie-breaking behavior.
- Make balance reservations and releases explicit and test their invariants.
- Treat duplicate messages, retries, stale events, and partial failures as normal distributed-system conditions.
- Include stable identifiers and correlation IDs in asynchronous messages; use idempotent handlers where messages can be replayed.
- Do not silently discard malformed messages. Return or record structured errors without leaking sensitive data.

## Redis and WebSocket conventions

- Treat stream payloads as versioned external contracts, even when both producers and consumers live in this repository.
- Validate decoded messages before invoking domain logic.
- Acknowledge stream entries only after successful processing or an explicit failure policy.
- Keep request/response correlation and timeout behavior explicit.
- Apply authentication and authorization before accepting private WebSocket subscriptions.
- Plan for slow consumers, reconnects, duplicate delivery, and bounded buffering.

## Code style

- Use TypeScript with strict, narrow types; avoid `any` unless a boundary requires it and the value is immediately validated.
- Prefer small, pure functions for matching and accounting rules.
- Use clear domain names and explicit result types for expected failures.
- Keep modules cohesive and avoid circular dependencies between workspaces.
- Follow the repository's ESLint, Prettier, and TypeScript configurations.
- Comments should explain non-obvious invariants or tradeoffs, not restate the code.

## Commands and verification

Run commands from the repository root unless a workspace specifically requires otherwise:

```bash
bun install
bun test
bun run lint
bun run check-types
bun run build
bun run format
```

Use Turborepo filters for focused checks when appropriate:

```bash
bunx turbo run <task> --filter=<workspace>
```

Before handing off a change, report which checks were run and whether they passed. If a check cannot run because of missing services, configuration, or an unrelated existing failure, state that clearly and include the relevant error.

## Pull requests

- Keep commits and pull requests focused on one coherent change.
- Describe the behavior and motivation, not only the files modified.
- Include tests for behavior changes and migration notes for contract or schema changes.
- Highlight changes to monetary logic, matching rules, authentication, persistence, or message schemas for careful review.
