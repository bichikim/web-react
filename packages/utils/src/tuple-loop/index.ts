import {AnyFunction} from 'src/types'

export type Iteratee1<Arg1, Result> = (arg1: Arg1, index: number) => Result
export type Iteratee2<Arg1, Arg2, Result> = (arg1: Arg1, arg2: Arg2, index: number) => Result
export type Iteratee3<Arg1, Arg2, Arg3, Result> = (
  arg1: Arg1,
  arg2: Arg2,
  arg3: Arg3,
  index: number,
) => Result
export type Iteratee4<Arg1, Arg2, Arg3, Arg4, Result> = (
  arg1: Arg1,
  arg2: Arg2,
  arg3: Arg3,
  arg4: Arg4,
  index: number,
) => Result

const getAll = (list: any[][], index: number): any[] => {
  return list.map((item) => item[index])
}

export type ArrayLoopFunction = <Arg, Result>(
  target: Arg[],
  iteratee: (item: Arg, index: number) => Result,
) => Result

export function tupleLoop<Arg1, Arg2, Arg3, Arg4, Result>(
  logic: ArrayLoopFunction,
  iteratee: Iteratee4<Arg1, Arg2, Arg3, Arg4, Result>,
  arg1: Arg1[],
  arg2: Arg2[],
  arg3: Arg3[],
  arg4: Arg4[],
): Result
export function tupleLoop<Arg1, Arg2, Arg3, Result>(
  logic: ArrayLoopFunction,
  iteratee: Iteratee3<Arg1, Arg2, Arg3, Result>,
  arg1: Arg1[],
  arg2: Arg2[],
  arg3: Arg3[],
): Result
export function tupleLoop<Arg1, Arg2, Result>(
  logic: ArrayLoopFunction,
  iteratee: Iteratee2<Arg1, Arg2, Result>,
  arg1: Arg1[],
  arg2: Arg2[],
): Result
export function tupleLoop<Arg1, Result>(
  logic: ArrayLoopFunction,
  iteratee: Iteratee1<Arg1, Result>,
  arg1: Arg1[],
): Result
export function tupleLoop(logic: ArrayLoopFunction, iteratee: AnyFunction, ...args: any[][]) {
  const [targetList, ...rest] = args

  return logic(targetList, (target, index) => {
    return iteratee(target, ...getAll(rest, index))
  })
}
