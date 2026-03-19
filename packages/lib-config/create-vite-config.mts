import {defineConfig} from 'vite'
import {camelCase} from 'es-toolkit/compat'
import dts from 'vite-plugin-dts'
import path from 'node:path'

export interface Options {
  dependencies?: Record<string, string>
  name?: string
  root: string
}

export const createViteConfig = (options: Options) => {
  const {dependencies = {}, name = 'unknown', root} = options ?? {}
  const dependenciesKeys = Object.keys(dependencies)
  return defineConfig(() => {
    return {
      build: {
        lib: {
          entry: 'src/index.ts',
          name: camelCase(name),
        },
        outDir: 'dist',
        rollupOptions: {
          external: [...dependenciesKeys],
          output: [
            {
              entryFileNames: '[name].iife.js',
              format: 'iife' as const,
            },
            {
              entryFileNames: '[name].js',
              format: 'es' as const,
              preserveModules: true,
              preserveModulesRoot: 'src',
            },
            {
              entryFileNames: 'index.cjs',
              exports: 'named' as const,
              format: 'cjs' as const,
            },
          ],
        },
      },
      plugins: [
        dts({
          compilerOptions: {
            checkJs: false,
            declaration: true,
            declarationMap: false,
            emitDeclarationOnly: true,
            noEmit: false,
            noEmitOnError: true,
            preserveSymlinks: false,
            skipLibCheck: true,
          },
          entryRoot: './src',
          exclude: ['**/__tests__/*', '**/__stories__/*', '**/*.story.tsx', '**/*.spec.ts'],
          include: ['**/*.ts', '**/*.tsx'],
        }),
      ],
      resolve: {
        alias: {
          src: path.join(root, 'src'),
        },
      },
    }
  })
}
