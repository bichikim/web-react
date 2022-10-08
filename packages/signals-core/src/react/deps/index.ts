import {createDeps} from 'src/create'
import {isInComponent} from 'src/react/is-in-component'
import {useMemo, useRef} from 'react'

export const deps = createDeps({
  isInComponent,
  useMemo,
  useRef,
})
