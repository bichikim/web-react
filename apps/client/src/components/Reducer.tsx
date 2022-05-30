import {Reducer, useReducer} from 'react'

interface ReducerState {
  age: number
}

type ReducerAction = {
  payload?: never
  type: 'increase'
} | {
  payload?: never
  type: 'decrease'
} | {
  payload: number
  type: 'set'
}

const reducerState: Reducer<ReducerState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case 'increase':
      return {age: state.age + 1}
    case 'decrease':
      return {age: state.age - 1}
    case 'set':
      return {age: action.payload}
    default:
      throw new Error('unexpected action type')
  }
}

export const ReducerComponent: FC = () => {
  const [state, dispatch] = useReducer(reducerState, {age: 0})

  return (
    <div>
      <div>{state.age}</div>
      <button onClick={() => dispatch({type: 'increase'})}>increase</button>
      <button onClick={() => dispatch({type: 'decrease'})}>decrease</button>
      <button onClick={() => dispatch({payload: 5, type: 'set'})}>set</button>
    </div>
  )
}
