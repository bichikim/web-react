import * as modules from '../'

describe('react-hooks', () => {
  it('should export all', () => {
    expect(modules).toMatchInlineSnapshot(`
      {
        "composeRefs": [Function],
        "isRef": [Function],
        "useAsync": [Function],
        "useComposeRefs": [Function],
        "useCustomEffect": [Function],
        "useCustomLayoutEffect": [Function],
        "useCustomMemo": [Function],
        "useCustomState": [Function],
        "useDebounceState": [Function],
        "useDeepEffect": [Function],
        "useDeepMemo": [Function],
        "useElementResize": [Function],
        "useEvent": [Function],
        "useEventHandle": [Function],
        "useHandle": [Function],
        "useImmer": [Function],
        "useIntervalWheel": [Function],
        "useMutationObserver": [Function],
        "useOnce": [Function],
        "useRef": [Function],
        "useRefImmer": [Function],
        "useShow": [Function],
        "useSync": [Function],
        "useSyncSet": [Function],
        "useSyncState": [Function],
        "useSyncStorage": [Function],
        "useTimeout": [Function],
        "useToggle": [Function],
        "wrapImmediateStop": [Function],
        "wrapOnes": [Function],
        "wrapPrevent": [Function],
        "wrapStop": [Function],
      }
    `)
  })
})
