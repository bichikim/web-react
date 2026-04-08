---
name: unit-test-module-mocking
description: Basic Vitest module mocking pattern with vi.mock.
---

# Module Mocking

- Import the API from Vitest: `import { vi } from 'vitest'`

```ts
vi.mock('./some-module', () => ({
  namedExport: vi.fn(),
  default: { foo: vi.fn() },
}))
```

After the real import runs, use `vi.mocked(namedExport)` for typing, or assert with `expect(namedExport).toHaveBeenCalled()`.

