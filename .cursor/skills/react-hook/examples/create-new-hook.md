# Create New Hook Example

## Hook Template

```ts
import {useMemo} from 'react'

export function useExample<T>(value: T): T {
  return useMemo(() => value, [value])
}
```

## Minimal Checklist

1. Add hook implementation.
2. Wire export only if barrel pattern exists.
