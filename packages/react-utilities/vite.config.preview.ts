import {defineConfig} from 'vite'
import {sharedConfig} from './vite.shared'

export default defineConfig((configEnv) => {
  return {
    ...sharedConfig(configEnv),
  }
})
