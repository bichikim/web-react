import {Solid} from './componets/Solid'
import {Original} from './componets/Original'
import {PropsSyncText} from './componets/PropsSyncText'
import {Events} from './componets/Events'
import {DeepMemo} from './componets/DeepMemo'
import {Zustand} from './componets/Zustand'
import {HookState} from './componets/HookState'
import {Reactivity} from './componets/Reactivity'
import {SideSlide} from 'pages/side-slide'
import {BrowserRouter, NavLink, Route, Routes} from 'react-router-dom'
import {kebabCase} from '@winter-love/lodash'

const OriginalPage: FPC = () => {
  return (
    <main>
      <section>
        <h3>Original</h3>
        <h5>React hooks</h5>
        <Original />
      </section>
    </main>
  )
}

const DeepMemoPage: FPC = () => {
  return (
    <main>
      <section>
        <h3>DeepMemo</h3>
        <h5>DeepMemo hooks</h5>
        <DeepMemo />
      </section>
    </main>
  )
}

const PropsSyncTextPage: FPC = () => {
  return (
    <main>
      <section>
        <h3>PropsSyncText</h3>
        <h5>PropsSyncText hooks</h5>
        <PropsSyncText />
      </section>
    </main>
  )
}

const EventsPage: FPC = () => {
  return (
    <main>
      <section>
        <h3>Events</h3>
        <h5>Events hooks</h5>
        <Events />
      </section>
    </main>
  )
}

const ZustandPage: FPC = () => {
  return (
    <main>
      <section>
        <h3>Zustand</h3>
        <h5>Zustand hooks</h5>
        <Zustand />
      </section>
    </main>
  )
}

const HookStatePage: FPC = () => {
  return (
    <main>
      <section>
        <h3>HookState</h3>
        <h5>HookState state hooks</h5>
        <HookState />
      </section>
    </main>
  )
}

const SolidPage: FPC = () => {
  return (
    <main>
      <section>
        <h3>Solid</h3>
        <h5>Solid Js hooks</h5>
        <Solid />
      </section>
    </main>
  )
}

const ReactivityPage: FPC = () => {
  return (
    <main>
      <section>
        <h3>Reactivity</h3>
        <h5>Vue Reactivity Composition Api</h5>
        <Reactivity />
      </section>
    </main>
  )
}

export interface NavItemProps {
  name: string
  to?: string
}

export const NavItem: FPC<NavItemProps> = (props) => {
  const {name, to} = props
  return (
    <li>
      <NavLink to={to ?? `/${kebabCase(name)}`}>
        {name}
      </NavLink>
    </li>
  )
}

export const Root: FPC = () => {
  return (
    <BrowserRouter >
      <nav>
        <ul>
          <NavItem name="Reactivity"/>
          <NavItem name="Solid"/>
          <NavItem name="Original"/>
          <NavItem name="Zustand"/>
          <NavItem name="Events"/>
          <NavItem name="DeepMemo"/>
          <NavItem name="PropsSyncText"/>
          <NavItem name="HookState"/>
          <NavItem name="Original"/>
        </ul>
      </nav>
      <Routes>
        <Route element={<ReactivityPage />} path="/" />
        <Route element={<ReactivityPage />} path="/reactivity" />
        <Route element={<ZustandPage />} path="/zustand" />
        <Route element={<EventsPage />} path="/events" />
        <Route element={<DeepMemoPage />} path="/deep-memo" />
        <Route element={<PropsSyncTextPage />} path="/props-sync-text" />
        <Route element={<SolidPage />} path="/solid" />
        <Route element={<HookStatePage />} path="/hook-state" />
        <Route element={<OriginalPage />} path="/original" />
        <Route element={<SideSlide />} path="/side-slide" />
      </Routes>
    </BrowserRouter>
  )
}

export default Root
