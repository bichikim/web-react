export const isPartialUndefined = (...args: any[]) => {
  return args.some((item) => typeof item === 'undefined')
}
