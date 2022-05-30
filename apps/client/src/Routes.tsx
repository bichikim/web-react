import {BrowserRouter, Routes as BrowserRoutes, Route} from 'react-router-dom'
import {Root} from 'src/Root'
import {Main} from 'src/pages/main/Index'
import {EventsPage} from 'pages/events'
import {SolidPage} from 'pages/solid'
import {OriginalPage} from 'pages/original'
import {PropsSyncTextPage} from 'pages/props-sync-text'
import {ReactivityPage} from 'pages/reactivity'
import {DeepMemoPage} from 'pages/deep-memo'
import {HookStatePage} from 'pages/hook-state'
import {ZustandPage} from 'pages/zustand'
import {MainLayout} from 'layouts/main-layout/Index'

export const Routes: FC = () => {
  return (
    <BrowserRouter>
      <BrowserRoutes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<MainLayout />} >
            <Route index element={<Main />} />
            <Route path="reactivity" element={<ReactivityPage />} />
            <Route path="hook-state" element={<HookStatePage />} />
            <Route path="zustand" element={<ZustandPage />} />
            <Route path="deep-memo" element={<DeepMemoPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="props-sync-text" element={<PropsSyncTextPage />} />
            <Route path="original" element={<OriginalPage />} />
            <Route path="solid" element={<SolidPage />} />
          </Route>
        </Route>
      </BrowserRoutes>
    </BrowserRouter>
  )
}
