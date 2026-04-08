---
name: unit-test-module-mocking-with-actual-exports
description: Keep real exports and override only selected functions in Vitest.
---

# Module Mocking with Actual Exports

Keep the real module and override only the exports you need.

```ts
import { vi } from 'vitest'

vi.mock('./api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./api')>()
  return {
    ...actual,
    fetchUser: vi.fn().mockResolvedValue({ id: 1, name: 'test' }),
  }
})
```

Use `importOriginal` only inside the factory (it is not valid to call it elsewhere). Spread `actual` first, then override specific named exports or `default`.

