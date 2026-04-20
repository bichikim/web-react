import {defineConfig} from 'vitest/config'
import {monorepoAlias} from '@winter-love/vite-plugin-monorepo-alias'
import {fileURLToPath, URL} from 'node:url'

export default defineConfig({
  plugins: [
    monorepoAlias({
      alias: {
        DEFAULT: {
          src: 'src',
        },
      },

      root: fileURLToPath(new URL('./', import.meta.url)),
      separator: process.platform === 'win32' ? '\\' : '/',
      workspacePaths: [/\/apps\//u, /\/packages\//u],
    }) as any,
  ],
  resolve: {
    alias: {
      // 테스트들을 모두 수정 한다면 삭제 해야함
      '@testing-library/react-hooks': '@testing-library/react',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['packages/**/*.{test,spec}.{ts,tsx,js,jsx}', 'apps/**/*.{test,spec}.{ts,tsx,js,jsx}'],
    setupFiles: ['./vitest.setup.ts'],
  },
})
