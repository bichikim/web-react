import {defineConfig, mergeConfig, type UserConfig} from 'vite'
import {camelCase} from 'es-toolkit/compat'
import dts from 'vite-plugin-dts'
import path from 'node:path'

/** Vite/Rolldown이 브라우저용 스텁으로 치환하면 `path`/`fs` 등이 깨지므로 항상 런타임 require로 남깁니다. */
const NODE_BUILTIN_EXTERNALS: Array<string | RegExp> = [
  /^node:/u,
  /** `node:fs` 외에도 의존성에서 bare import 하는 경우가 많음 */
  `fs`,
  `path`,
]

export interface Options {
  dependencies?: Record<string, string>
  name?: string
  /** true면 IIFE 출력을 빼고 ESM+CJS만 둡니다(Node 전용 라이브러리). */
  nodeOnly?: boolean
  root: string
}

export const createViteConfig = (options: Options) => {
  const {dependencies = {}, name = 'unknown', nodeOnly = false, root} = options ?? {}
  const dependenciesKeys = Object.keys(dependencies)

  const rollupOutputs = nodeOnly
    ? [
        {
          entryFileNames: `index.js`,
          format: `es` as const,
          inlineDynamicImports: true,
        },
        {
          entryFileNames: `index.cjs`,
          exports: `named` as const,
          format: `cjs` as const,
        },
      ]
    : [
        {
          entryFileNames: '[name].iife.js',
          format: 'iife' as const,
          name: camelCase(name),
        },
        {
          entryFileNames: '[name].js',
          format: 'es' as const,
          name: camelCase(name),
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
        {
          entryFileNames: 'index.cjs',
          exports: 'named' as const,
          format: 'cjs' as const,
        },
      ]

  const getBaseUserConfig = (): UserConfig => ({
    build: {
      lib: {
        entry: 'src/index.ts',
        name: camelCase(name),
      },
      outDir: 'dist',
      rolldownOptions: {
        external: [...dependenciesKeys, ...NODE_BUILTIN_EXTERNALS],
        output: rollupOutputs,
      },
      rollupOptions: {
        external: [...dependenciesKeys, ...NODE_BUILTIN_EXTERNALS],
        output: rollupOutputs,
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
  })

  return (
    overrides?: UserConfig | ((base: UserConfig) => UserConfig),
  ): ReturnType<typeof defineConfig> => {
    const base = getBaseUserConfig()
    const merged =
      overrides === undefined
        ? base
        : typeof overrides === `function`
          ? mergeConfig(base, overrides(base))
          : mergeConfig(base, overrides)

    return defineConfig(merged)
  }
}
