import {defineConfig} from 'tsup'
import {replace} from 'esbuild-plugin-replace'

export default defineConfig({
  clean: true,
  entry: ['./src/index.ts'],
  external: ['react'],
  format: [
    'cjs',
    'esm',
    // 'iife'
  ],
  outDir: 'dist',
  sourcemap: true,
  splitting: false,
})
