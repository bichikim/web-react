import {kebabCase} from 'lodash'
import path from 'path'
import {externals} from 'rollup-plugin-node-externals'
import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'
import packageJson from './package.json'
import {sharedConfig} from './vite.shared'

const libraryName = kebabCase(packageJson.name)

export default defineConfig((configEnv) => {
  const config = sharedConfig(configEnv)
  config.plugins?.push(
    dts({
      insertTypesEntry: true,
    }),
  )
  return {
    ...config,
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        fileName: 'index',
        formats: ['es', 'umd'],
        name: libraryName,
      },
      rollupOptions: {
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
        plugins: [
          externals(),
        ],
      },
    },
  }
})
