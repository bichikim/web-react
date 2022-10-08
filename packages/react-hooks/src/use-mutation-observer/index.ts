import {RefObject, useEffect} from 'react'
import {useCompareUpdate} from 'src/use-compare-update'
import {useHandle} from 'src/use-handle'

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
  const _options = useCompareUpdate(options)

  const mutated = useHandle((mutations: MutationRecord[]) => {
    callback?.(mutations)
  })

  useEffect(() => {
    const _target = target.current
    const observer = new MutationObserver(mutated)
    if (!_target) {
      return () => {
        // empty
      }
    }
    observer.observe(_target, _options)
    return () => {
      observer.disconnect()
    }
  }, [target, _options, mutated])
}
