# Stock Exchange

A centralized exchange platform organized as a TypeScript monorepo. The system is designed around a matching engine that owns balances and order books, backend services that expose the exchange API, Redis Streams for communication between services, and a WebSocket service for real-time market and account updates.

## Architecture

The repository is organized with [Turborepo](https://turbo.build/repo) and [Bun](https://bun.sh/).

```text
apps/
  backend/   HTTP API and exchange-facing application logic
  engine/    Order matching, order books, and in-engine balances
  ws/        Real-time WebSocket updates
  tests/     Cross-service and end-to-end tests
packages/
  common/             Shared domain types and utilities
  db/                 Database access
  ui/                 Shared user-interface components
  eslint-config/      Shared lint configuration
  typescript-config/  Shared TypeScript configuration
```

Redis Streams provide asynchronous request and response queues between the backend and the engine. This separation keeps matching and balance mutations within the engine while allowing API and real-time services to communicate through explicit messages.

## Prerequisites

- [Bun](https://bun.sh/) 1.3 or newer
- Node.js 18 or newer for tooling compatibility
- Redis
- A PostgreSQL-compatible database

## Getting started

Clone the repository and install the workspace dependencies:

```bash
git clone <repository-url>
cd stock-exchange
bun install
```

Configure the environment variables required by the individual applications, then start the development tasks:

```bash
bun run dev
```

Turborepo filters can be used to run one workspace at a time:

```bash
bunx turbo run dev --filter=backend
bunx turbo run dev --filter=engine
bunx turbo run dev --filter=ws
```

## Common commands

```bash
bun run dev          # Run development tasks
bun run build        # Build all workspaces
bun run lint         # Lint all workspaces
bun run check-types  # Type-check all workspaces
bun run format       # Format TypeScript and Markdown files
bun test             # Run Bun tests
```

## Development principles

- Follow test-driven development: begin with a failing test, implement the smallest correct change, and refactor with the tests passing.
- Keep matching, order-book, and balance transitions deterministic and owned by the engine.
- Treat Redis messages as versioned contracts and validate data at service boundaries.
- Use integer quantities or a precise decimal representation for monetary values; do not use floating-point arithmetic for balances or prices.
- Preserve ordering, idempotency, and traceability across asynchronous workflows.
- Never commit credentials, private keys, or production environment values.

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository and create a focused branch from the default branch.
2. Add or update tests before changing behavior.
3. Keep changes small, scoped, and consistent with the existing workspace boundaries.
4. Run the relevant tests, lint checks, type checks, and build locally.
5. Open a pull request describing the problem, the approach, and how the change was verified.

Bug reports and feature proposals should include enough context to reproduce or evaluate the request. Security vulnerabilities should be reported privately to the maintainers rather than through a public issue.

By contributing, you agree that your contributions will be licensed under the MIT License.

## License

This project is licensed under the [MIT License](LICENSE).
