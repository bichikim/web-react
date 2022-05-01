import {createRoot} from 'react-dom/client'
import {Root} from './Root'

const container = document.querySelector('#app')
if (container) {
  const root = createRoot(container)
  root.render(html`<${Root} />`)
} else {
  console.error('there is no container element')
}

