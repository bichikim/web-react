import {toValue} from '@winter-love/js-utils'
import {useEffect, useState, useRef} from 'react'
import {useHandle} from 'src/use-handle'

interface AsyncState<S, E = any> {
  data: S
  error?: E
}

export const useAsync = <S>(
  initState: S | (() => S),
  logic: () => Promise<S> | S,
  immediate?: boolean,
): AsyncState<S> & {run: () => Promise<S>} => {
  const _immediate = useRef(immediate)
  const [state, setState] = useState<AsyncState<S>>(() => {
    return {
      data: toValue(initState),
    }
  })

  const run = useHandle(async () => {
    const data = await logic()
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

  return {...state, run}
}
