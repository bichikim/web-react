import {kebabCase} from '@winter-love/lodash'
import {NavLink} from 'react-router-dom'

export interface NaviItemProps {
  name?: string
  to: string
}

export const NaviItem: FPC<NaviItemProps> = (props) => {
  const name = useMemo(() => {
    return props.name ?? kebabCase(props.to).replace('-', ' ')
  }, [props.name, props.to])

  return (
    <li>
      <NavLink to={props.to}>{name}</NavLink>
    </li>
  )
}
