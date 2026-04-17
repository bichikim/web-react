---
name: unit-test
description: Write and maintain unit tests with Vitest. Use when adding or updating unit tests, improving test coverage, or handling unavoidable coverage gaps with documented ignore comments.
---

# Unit Test

## Rules

1. Unit tests use Vitest.
2. Coverage target is 100%.
3. If coverage cannot be achieved in a realistic way, add an ignore comment and keep total coverage at 100%.
4. Every ignore comment must include a clear reason.
5. Always import test APIs (e.g., `vi`, `it`, `expect`, `describe`, `beforeEach`, `afterEach`) directly from `vitest`; do not rely on globals.

## Format

- Each test case uses `it('should ...', () => { ... })` (or `async` where needed). The first argument must read as a behavior statement starting with **should**.
- The description string must be written in **English**.

## Mocking

- `.cursor/skills/unit-test/mocking/SKILL.md`


