export const isFunction = (value: any): value is (...args: any[]) => any => {
  return typeof value === 'function'
}

export const isArray = (value: unknown): value is readonly unknown[] => {
  return Array.isArray(value)
}
