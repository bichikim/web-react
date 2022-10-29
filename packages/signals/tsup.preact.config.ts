import {defineConfig} from 'tsup'
import {replace} from 'esbuild-plugin-replace'

export default defineConfig({
  entry: ['./src/preact.ts'],
  esbuildPlugins: [
    replace({
      'react.tmp': 'preact',
      'signal.tmp': '@winter-love/signals-rebuild/preact',
    }),
  ],
  external: ['react', 'preact'],
  format: [
    'cjs',
    'esm',
    // 'iife'
  ],
  outDir: 'dist',
  sourcemap: true,
  splitting: false,
})
