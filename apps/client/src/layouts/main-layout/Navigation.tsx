import {NaviItem} from './NaviItem'

export const Navigation: FPC = () => {
  return (
    <nav>
      <ul>
        <NaviItem to="/" name="main" />
        <NaviItem to="hook-state" />
        <NaviItem to="original" />
        <NaviItem to="zustand" />
        <NaviItem to="valitio" />
      </ul>
    </nav>
  )
}
