import {Dispatch, SetStateAction, useEffect, useRef} from 'react'
import isEqual from 'react-fast-compare'
import {useCustomState} from 'src/use-custom-state'
import {useHandle} from 'src/use-handle'
import {useOnce} from 'src/use-once'
import {toValue} from 'src/utils'

interface AsyncState<S, E = any> {
  data: S
  error?: E
}

/**
 * @experimental
 * @param initState
 * @param logic
 * @param immediate
 */
export const useAsync = <S>(
  initState: S | (() => S),
  logic: (signal: AbortSignal) => Promise<S> | S,
  immediate?: boolean,
): [AsyncState<S>, () => Promise<S>, Dispatch<SetStateAction<AsyncState<S>>>] => {
  const _immediate = useRef(immediate)
  const [state, setState] = useCustomState<AsyncState<S>>(() => {
    return {
      data: toValue(initState),
    }
  }, isEqual)

  const abort = useOnce(() => new AbortController())

  const run = useHandle(async () => {
    const {signal} = abort
    const data = await logic(signal)
    setState({
      data,
    })
    return data
  })

  useEffect(() => {
    if (_immediate.current) {
      run()
    }
  }, [run])

  return [state, run, setState]
}
