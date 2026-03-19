/**
 * 배열일 경우 배열의 아이탬 아닐경우 그 타입을 반환
 */
export type ArrayItemType<T> = T extends readonly (infer U)[] ? U : T

/**
 * 타입의 key 에 value 타입을 반환
 */
export type ValueType<T, Key extends keyof T> = T[Key]

/**
 * 타입이 Record, null 또는 undefined 일 경우 에도 Record<key> 타입을 반환
 */
export type ValueTypeWithNullable<T, Key extends keyof NonNullable<T>> = NonNullable<T>[Key]

/**
 * 타입이 함수라면 함수의 리턴 타입을 반환 아니라면 타입 반환
 */
export type ReturnTypeWithAny<T> = T extends (...args: any[]) => infer Return ? Return : T

export type ParametersWithAny<T> = T extends (...args: infer Args) => any ? Args : never

export interface FunctionWithCancel<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T>
  readonly cancel: () => void
}

export interface Size {
  height: number
  width: number
}

export interface Point {
  x: number
  y: number
}

export interface Point3D extends Point {
  z: number
}
