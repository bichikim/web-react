import {defineConfig} from 'tsup'
import {replace} from 'esbuild-plugin-replace'

export default defineConfig({
  clean: true,
  entry: ['./src/react.ts'],
  esbuildPlugins: [
    replace({
      'react.tmp': 'react',
      'signal.tmp': '@winter-love/signals-rebuild/react',
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
