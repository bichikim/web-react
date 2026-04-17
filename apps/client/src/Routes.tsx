import {BrowserRouter, Routes as BrowserRoutes, Route} from 'react-router-dom'
import {Root} from 'src/Root'
import {MainLayout} from 'src/layouts/main-layout/Index'
import {VuePage} from 'src/pages/vue'
import ValtioPage from 'src/pages/valtio/Index'

export const Routes: FC = () => {
  return (
    <BrowserRouter>
      <BrowserRoutes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="valitio" element={<ValtioPage />} />
            <Route path="vue" element={<VuePage />} />
          </Route>
        </Route>
      </BrowserRoutes>
    </BrowserRouter>
  )
}
