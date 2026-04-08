---
name: unit-test-mocking
description: Mocking patterns for Vitest unit tests. Read this only when mocking is required.
---

# Vitest Mocking

## Rules

- Prefer restoring or clearing mocks in lifecycle hooks when tests share mocked state: `vi.clearAllMocks()`, `vi.restoreAllMocks()`, or reset modules as needed for dynamic import patterns.

## References

- Module mocking: `./module-mocking/SKILL.md`
- Module mocking with Actual exports: `./module-mocking-with-actual-exports/SKILL.md`

