import {NaviItem} from './NaviItem'

export const Navigation: FPC = () => {
  return (
    <nav>
      <ul>
        <NaviItem to="/" name="main" />
        <NaviItem to="valitio" />
        <NaviItem to="vue" />
      </ul>
    </nav>
  )
}
