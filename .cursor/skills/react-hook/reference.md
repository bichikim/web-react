# React Hook Reference

## Implementation Rules

- Prefer named exports from each hook folder.
- Keep hook API small and typed.
- Avoid unnecessary dependencies and hidden side effects.
- Preserve backward compatibility when modifying existing hooks.

## Create vs Update

### Create
- Add a hook file in the project's hook location (for example `src/hooks/use-<name>.ts`).
- Add a test file near the hook or in the project's test location.
- Add export wiring only if the project uses a barrel export pattern.

### Update
- Keep existing public return shape unless change is requested.
- Update tests first or together with behavior changes.
- Add regression tests for bug fixes.

## Testing Conventions

- Use `renderHook` from the project's preferred testing library.
- Use `waitFor` only for async updates.
- Use '@testing-library/react' instead of '@testing-library/react-hooks'.
- Cover at least:
  - normal path
  - one edge case
  - changed behavior regression (for modifications)

## Validation

Run focused tests first (adapt command to project tooling):

```bash
pnpm vitest path/to/use-<name>.spec.ts
```

If project uses Jest or another runner, use the equivalent targeted test command.
