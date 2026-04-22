import * as path from 'path'
import {defineConfig} from 'vite'
import icons from 'unplugin-icons/vite'
import {createIconifyCollection} from '@web-react/iconify-icons'
import {VitePWA as vitePWA} from 'vite-plugin-pwa'
import Prism from 'markdown-it-prism'
import LinkAttributes from 'markdown-it-link-attributes'
import vitePluginImp from 'vite-plugin-imp'
import * as dotenv from 'dotenv'
import react from '@vitejs/plugin-react'
import autoImport from 'unplugin-auto-import/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// eslint-disable-next-line import/no-named-as-default-member
dotenv.config()

const createMarkdownPlugin = async () => {
  try {
    const {default: markdown} = await import('vite-plugin-md')
    return markdown({
      headEnabled: true,
      markdownItSetup(md) {
        // https://prismjs.com/
        md.use(Prism)
        md.use(LinkAttributes, {
          attrs: {
            rel: 'noopener',
            target: '_blank',
          },
          pattern: /^https?:\/\//u,
        })
      },
      wrapperClasses: 'q-page q-mx-auto padding',
    })
  } catch (error) {
    console.warn('[vite] skip vite-plugin-md:', error)
    return null
  }
}

// eslint-disable-next-line max-lines-per-function
export default defineConfig(async () => {
  const markdownPlugin = await createMarkdownPlugin()

  return {
    build: {
      chunkSizeWarningLimit: 600,
      outDir: 'dist/spa',
    },
    define: {
      __DEV__: JSON.stringify('import.meta.env.DEV'),
      'process.env.NODE_ENV': JSON.stringify('import.meta.env.MODE'),
    },
    optimizeDeps: {
      exclude: ['vite'],
      include: [],
    },

    plugins: [
      react(),
      tsconfigPaths(),
      autoImport({
        imports: [
          //
          'react',
        ],
      }),
      vitePluginImp(),
      ...(markdownPlugin ? [markdownPlugin] : []),

      icons({
        autoInstall: true,
        compiler: 'jsx',
        customCollections: {
          app: createIconifyCollection(),
        },
        jsx: 'react',
      }),
      // https://github.com/antfu/vite-plugin-pwa
      vitePWA({
        includeAssets: ['favicon.svg', 'robots.txt', 'safari-pinned-tab.svg'],
        manifest: {
          icons: [
            {
              sizes: '192x192',
              src: '/pwa-192x192.png',
              type: 'image/png',
            },
            {
              sizes: '512x512',
              src: '/pwa-512x512.png',
              type: 'image/png',
            },
            {
              purpose: 'any maskable',
              sizes: '512x512',
              src: '/pwa-512x512.png',
              type: 'image/png',
            },
          ],
          name: 'Coong',
          // oxlint-disable-next-line camelcase
          // eslint-disable-next-line camelcase
          short_name: 'Coong',
          // oxlint-disable-next-line camelcase
          // eslint-disable-next-line camelcase
          theme_color: '#ffffff',
        },
        registerType: 'autoUpdate',
      }),
    ],

    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, '')}/`,
        'components/': `${path.resolve(__dirname, 'src/components')}/`,
        'layouts/': `${path.resolve(__dirname, 'src/layouts')}/`,
        'pages/': `${path.resolve(__dirname, 'src/pages')}/`,
        'src/': `${path.resolve(__dirname, 'src')}/`,
        'store/': `${path.resolve(__dirname, 'src/store')}/`,
      },
    },

    server: {
      // https: true,
      fs: {
        // allow: ['..', '../..'],
      },

      proxy: {
        '/server': {
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/server/u, ''),
          target: process.env.API_URL,
        },
        '/static': {
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/static/u, ''),
          target: 'http://localhost:3000',
        },
      },
    },
  }
})
