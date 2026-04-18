---
name: unit-test
description: Write and maintain unit tests with Vitest. Test titles MUST be English `it('should ...')` strings. Use when adding or updating unit tests, improving test coverage, or handling unavoidable coverage gaps with documented ignore comments.
---

# Unit Test

## Rules

1. Unit tests use Vitest.
2. Coverage target is 100%.
3. If coverage cannot be achieved in a realistic way, add an ignore comment and keep total coverage at 100%.
4. Every ignore comment must include a clear reason.
5. Always import test APIs (e.g., `vi`, `it`, `expect`, `describe`, `beforeEach`, `afterEach`) directly from `vitest`; do not rely on globals. **Do not** use Vitest’s `test(...)` alias — use **`it(...)` only** for individual test cases.

## Test titles (`it` descriptions)

**Non-negotiable:** Every `it(...)` title is a single English string that **starts with the word `should`** (lowercase `should` right after the opening quote). Use `it('should ...', () => { ... })` or `it('should ...', async () => { ... })`.

- **Do:** `it('should return false when the input is empty', ...)`
- **Do:** `it('should run the registered cleanup at most once even if the cleanup throws', ...)`
- **Don't:** `it('returns false when ...')` — missing `should`
- **Don't:** `it('Runs cleanup...')` — title case sentence without `should`
- **Don't:** `it('clears ref when...')` — verb-first fragment without `should`

Before you finish editing a spec file, **scan every `it(` and confirm** the first word inside the string is `should`. **Do not** introduce `test(` anywhere in the file.

Other strings (`describe` blocks, comments) may be English or match surrounding file style; the **`it` title rule is fixed**.

## Mocking

- `.cursor/skills/unit-test/mocking/SKILL.md`


