import {createRoot} from 'react-dom/client'
import {Routes} from './Routes'

const container = document.querySelector('#app')
if (container) {
  const root = createRoot(container)
  root.render(<Routes />)
} else {
  console.error('there is no container element')
}
