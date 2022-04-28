import react from '@vitejs/plugin-react'
import path from 'path'
import {ConfigEnv, UserConfig} from 'vite'
export type UserConfigFn = (env: ConfigEnv) => UserConfig
export const sharedConfig: UserConfigFn = (): UserConfig => {
  return {
    define: {
      __DEV__: '(process.env.NODE_ENV !== \'production\')',
    },
    optimizeDeps: {
      exclude: [],
      include: [],
    },

    plugins: [
      react(),
    ],

    resolve: {
      alias: {
        'src/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
  }
}
