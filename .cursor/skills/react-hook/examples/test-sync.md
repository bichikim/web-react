# Sync Test Template

```ts
import {renderHook} from '@testing-library/react'
import {useExample} from './use-example'

describe('useExample', () => {
  it('returns current value', () => {
    const {result, rerender} = renderHook(({value}) => useExample(value), {
      initialProps: {value: 1},
    })

    expect(result.current).toBe(1)

    rerender({value: 2})
    expect(result.current).toBe(2)
  })
})
```

Use `waitFor` only when behavior updates asynchronously.
