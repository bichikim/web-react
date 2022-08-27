export type MaybeArray<T> = T | Array<T>

export type MaybePromise<T> = Promise<T> | T

export type PureObjectKey = string | number | symbol | any

// eslint-disable-next-line @typescript-eslint/ban-types
export type EmptyObject = {}

export type PureObject<Value = any> = Record<PureObjectKey, Value>

export type StringKeyObject<Value = any> = Record<string, Value>

export type NotFunction = object | number | string | boolean | symbol | null | undefined

export type AnyFunction<Arg = any, Result = any> = (...args: Arg[]) => Result

export type Tail<T extends Array<any>> = ((...t: T) => void) extends (
  h: any,
  ...rest: infer R
) => void
  ? R
  : never

export type Push<T extends Array<any>, E> = [...T, E]

export type Unshift<T extends Array<any>, E> = [E, ...T]

export type Concat<T1 extends Array<any>, T2 extends Array<any>> = [...T1, ...T2]
