import {createSignals} from 'src/create'
import {isInComponent} from 'src/react/is-in-component'
import {useMemo, useRef} from 'react'

export const signals = createSignals({
  isInComponent,
  useMemo,
  useRef,
})

export const useSignals = signals
