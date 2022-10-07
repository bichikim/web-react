import {useEffect, useState} from 'react'
import {useHandle} from 'src/use-handle'

export const useAsync = <S>(initState: S | (() => S), logic: () => Promise<S> | S) => {
  const [state, setState] = useState(initState)

  const run = useHandle(async (logic) => {
    const result = await logic()
    setState(result)
  })

  const retry = useHandle(() => {
    run(logic)
  })

  useEffect(() => {
    run(logic)
  }, [run, logic])

  return [state, retry]
}
