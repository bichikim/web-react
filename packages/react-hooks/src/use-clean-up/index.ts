import {useCallback, useEffect, useRef} from 'react'

/**
 * ref에 정리 콜백을 보관하고, cleanUp 호출 시 한 번 실행한 뒤 비웁니다. update는 리렌더 없이 ref만 갱신합니다.
 * 언마운트 시에도 등록된 클린업을 실행합니다.
 * @param initCleanUp 마운트 시점부터 보관할 정리 함수(없으면 null) 이 값은 초기 값이기 때문에 rerender 시에 갱신 되지 않습니다
 * @returns [cleanUp, updateCleanUp] — cleanUp은 등록된 함수를 최대 한 번 실행, updateCleanUp은 등록 내용 교체
 */
export const useCleanUp = (
  initCleanUp: (() => void) | null = null,
): [() => void, (cleanUp: (() => void) | null) => void] => {
  const cleanUpRef = useRef<(() => void) | null>(initCleanUp)
  const updateCleanUp = useCallback(
    (cleanUp: (() => void) | null) => {
      cleanUpRef.current = cleanUp
    },
    [cleanUpRef],
  )

  const cleanUp = useCallback(() => {
    if (cleanUpRef.current !== null) {
      try {
        cleanUpRef.current()
      } finally {
        cleanUpRef.current = null
      }
    }
  }, [cleanUpRef])

  /**
   * 컴포넌트가 언마운트 될 때 정리 함수를 호출합니다
   */
  useEffect(() => {
    return () => {
      cleanUp()
    }
  }, [cleanUp])

  return [cleanUp, updateCleanUp]
}
