import {RefObject, useEffect, useMemo} from 'react'
import {useHandle} from 'src/use-handle'
import {useDeepMemo} from 'src/use-deep-memo'

/**
 * MutationObserver 기능의 hook 입니다
 * @param target
 * @param options
 * @param callback
 */
export const useMutationObserver = (
  target: RefObject<HTMLElement>,
  options: MutationObserverInit,
  callback?: (record: MutationRecord[]) => any,
) => {
  const _options = useDeepMemo(() => options, [options])

  const mutated = useHandle((mutations: MutationRecord[]) => {
    callback?.(mutations)
  })

  const observer = useMemo(() => new MutationObserver(mutated), [mutated])

  useEffect(() => {
    const _target = target.current
    if (_target) {
      observer.observe(_target, _options)
    }
    return () => {
      observer.disconnect()
    }
  }, [target, _options, observer])
}
