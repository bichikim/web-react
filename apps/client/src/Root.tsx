import {Outlet} from 'react-router-dom'
import {QueryProvider} from 'src/queries'

export const Root = () => {
  return (
    <>
      <QueryProvider>
        <Outlet />
      </QueryProvider>
    </>
  )
}

export default Root
