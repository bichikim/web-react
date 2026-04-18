---
name: react-hook
description: Create or update custom React hooks with clear API design, TypeScript-friendly patterns, and test-first workflow. Use when the user asks to make/build/create/modify a custom hook, refactor hook logic, or add/update hook tests.
---

# React Hook

## Purpose

Create or update custom hooks with minimal API, predictable behavior, and matching tests.

## Naming Rules

- Folder name: `use-<kebab-name>` (example: `use-previous`)
- Hook symbol: `use<PascalName>` (example: `usePrevious`)
- Keep one primary hook export per folder.
- **`init` parameter prefix**: Use `init*` (for example `initCleanUp`, `initState`) for parameters that **are not refreshed on rerender**—only the first value applies unless the hook exposes a separate way to update it. Say so in JSDoc.

## Required Output

For create/update tasks, ensure:
1. Hook implementation file (for example `use-<name>.ts` or `index.ts` in a hook folder)
2. Hook test file (for example `*.spec.ts` or `*.spec.tsx`)
3. Export wiring updated if the project uses a central barrel file

## Workflow (Strict)

Use this checklist and complete in order:

```md
Task Progress:
- [ ] 1) Confirm behavior: input, output, edge cases
- [ ] 2) Implement or update hook with TypeScript types
- [ ] 3) Implement or update tests with Vitest + Testing Library
- [ ] 4) Update exports if the project requires it
- [ ] 5) Run targeted test and fix failures
- [ ] 6) Run lints for edited files
```

## Load Additional Files Only When Needed

- Detailed implementation rules: `reference.md`
- New hook template: `examples/create-new-hook.md`
- Existing hook update flow: `examples/update-existing-hook.md`
- Sync test template: `examples/test-sync.md`
- Barrel export snippet: `examples/export-barrel.md`

Read only the minimum file set needed for the current task.
