import type {StorybookConfig} from '@storybook/react-vite'
import {monorepoAlias} from '@winter-love/vite-plugin-monorepo-alias'
import {fileURLToPath, URL} from 'node:url'
import {mergeConfig} from 'vite'

const config: StorybookConfig = {
  addons: ['@storybook/addon-links'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: [
    '../packages/*/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../apps/*/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  // react-docgen + TSX can be brittle; keep off unless needed.
  typescript: {
    reactDocgen: false,
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        monorepoAlias({
          alias: {
            DEFAULT: {
              src: 'src',
            },
          },
          root: fileURLToPath(new URL('../', import.meta.url)),
          separator: process.platform === 'win32' ? '\\' : '/',
          workspacePaths: [/\/apps\//u, /\/packages\//u],
        }) as any,
      ],
    })
  },
}

export default config
