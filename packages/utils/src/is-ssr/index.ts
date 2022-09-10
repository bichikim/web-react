export const createIsSSR = () => {
  const _isSSR = typeof window === 'undefined'
  return () => _isSSR
}

export const isSSR = createIsSSR()
