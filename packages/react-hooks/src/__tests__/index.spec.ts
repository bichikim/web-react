import * as modules from '../'

describe('react-hooks', () => {
  it('should export all', () => {
    expect(modules).toMatchInlineSnapshot(`
      {
        "useAsyncFastCompare": [Function],
        "useCompareUpdate": [Function],
        "useCustomEffect": [Function],
        "useCustomLayoutEffect": [Function],
        "useCustomMemo": [Function],
        "useCustomState": [Function],
        "useDebounceState": [Function],
        "useDeepEffect": [Function],
        "useDeepMemo": [Function],
        "useEvent": [Function],
        "useHandle": [Function],
        "useImmer": [Function],
        "useIntervalWheel": [Function],
        "useMutationObserver": [Function],
        "useRefImmer": [Function],
        "useShow": [Function],
        "useSignal": [Function],
        "useSyncState": [Function],
        "useTimeout": [Function],
        "wrapImmediateStop": [Function],
        "wrapOnes": [Function],
        "wrapPrevent": [Function],
        "wrapStop": [Function],
      }
    `)
  })
})
