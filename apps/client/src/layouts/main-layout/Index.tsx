import {Outlet} from 'react-router-dom'
import {Navigation} from './Navigation'

export const MainLayout: FC = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  )
}
