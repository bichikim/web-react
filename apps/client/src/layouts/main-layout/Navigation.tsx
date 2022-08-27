import {NaviItem} from './NaviItem'

export const Navigation: FPC = () => {
  return (
    <nav>
      <ul>
        <NaviItem to="/" name="main" />
        <NaviItem to="reactivity" />
        <NaviItem to="hook-state" />
        <NaviItem to="original" />
        <NaviItem to="solid" />
        <NaviItem to="zustand" />
      </ul>
    </nav>
  )
}
