import {BrowserRouter, Routes as BrowserRoutes, Route} from 'react-router-dom'
import {Root} from 'src/Root'
import {Main} from 'src/pages/main/Index'
import {OriginalPage} from 'src/pages/original'
import {HookStatePage} from 'src/pages/hook-state'
import {ZustandPage} from 'src/pages/zustand'
import {MainLayout} from 'src/layouts/main-layout/Index'
import ValtioPage from 'src/pages/valtio/Index'

export const Routes: FC = () => {
  return (
    <BrowserRouter>
      <BrowserRoutes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Main />} />
            <Route path="hook-state" element={<HookStatePage />} />
            <Route path="zustand" element={<ZustandPage />} />
            <Route path="original" element={<OriginalPage />} />
            <Route path="valitio" element={<ValtioPage />} />
          </Route>
        </Route>
      </BrowserRoutes>
    </BrowserRouter>
  )
}
