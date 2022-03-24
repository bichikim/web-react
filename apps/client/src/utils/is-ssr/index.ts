const _isSSR = typeof window === 'undefined'

export const isSSR = () => _isSSR
