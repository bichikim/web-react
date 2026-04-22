import type {Plugin} from 'vite'
import Prism from 'markdown-it-prism'
import LinkAttributes from 'markdown-it-link-attributes'

export async function createMarkdownPlugin(): Promise<Plugin | null> {
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
