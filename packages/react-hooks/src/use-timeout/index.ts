import {useCallback} from 'react'
import {useHandle} from 'src/use-handle'
import {useCleanUp} from 'src/use-clean-up'

const DEFAULT_WAIT = 200

/**
 * `wait` ms 후에 `callback`을 한 번 실행하는 실행 함수와, 대기 중인 타이머를 취소하는 `cleanUp`을 반환합니다.
 *
 * - 연속으로 실행 함수를 호출하면 이전 예약은 취소되고, **마지막 호출 시점**부터 `wait` ms 뒤에 `callback`이 한 번 실행됩니다(trailing).
 * - `useCleanUp`과 연동되어 컴포넌트 언마운트 시에도 대기 중인 타이머가 정리됩니다.
 * - `callback`은 `useHandle`로 감싸져 최신 참조를 유지하면서도 타이머 콜백에서 안정적으로 호출됩니다.
 * - `wait`는 **유한한 0 이상의 ms**를 넘겨야 합니다. 그 외 값은 `setTimeout`이 내부적으로 0ms에 가깝게 처리할 수 있습니다.
 *
 * @param callback 지연 후 호출할 함수. 실행 함수에 넘긴 인자가 그대로 전달됩니다.
 * @param wait 지연 시간(ms). 유한한 0 이상이어야 합니다. 기본값은 {@link DEFAULT_WAIT}.
 * @returns `[handleExecute, cleanUp]` — `handleExecute`는 타이머 예약(이전 예약 취소 포함), `cleanUp`은 현재 대기 중인 타이머만 즉시 취소합니다.
 */
export const useTimeout = (callback: (...args: any[]) => any, wait: number = DEFAULT_WAIT) => {
  const [cleanUp, updateCleanUp] = useCleanUp()
  const handleCallback = useHandle(callback)

  const handleExecute = useCallback(
    (...args) => {
      cleanUp()

      const timeoutId = setTimeout(() => {
        handleCallback(...args)
      }, wait)

      updateCleanUp(() => {
        clearTimeout(timeoutId)
      })
    },
    [wait, cleanUp, handleCallback, updateCleanUp],
  )

  return [handleExecute, cleanUp]
}
