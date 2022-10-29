import {useMemo} from 'react.tmp'

const call = () => {
  // I know What I have been done
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMemo(() => true, [])
}

export const isInComponent = () => {
  try {
    return call()
  } catch {
    return false
  }
}
