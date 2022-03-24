export type NotFunction = object | number | string | boolean | symbol | null | undefined
export type FunctionValue<T extends NotFunction> = T | (() => T)
export const functionValue = <T extends NotFunction>(value: FunctionValue<T>) => {
  return typeof value === 'function' ? value() : value
}
