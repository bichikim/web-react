module.exports = {
  stories: [
    '../packages/*/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../apps/*/src/**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],
  addons: [
    '@storybook/addon-links',
    // '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  babel: async (options) => {
    // monorepo alias resolving
    // noinspection SpellCheckingInspection
    options.plugins.push([
      'module-resolver',
      {
        alias: {
          src: './src',
        },
        cwd: 'packagejson',
        loglevel: 'info',
      },
    ])
    return {
      ...options,
    }
  },
  features: {
    interactionsDebugger: true,
  },
  core: {
    builder: 'webpack5'
  }
}
