/* eslint-env node */
module.exports = {
  env: {
    test: {
      plugins: [
        'babel-plugin-transform-typescript-metadata',
        [
          '@babel/plugin-proposal-decorators',
          {
            legacy: true,
          },
        ],
        ['@babel/plugin-proposal-class-properties', {loose: true}],
        [
          'module-resolver',
          {
            alias: {
              src: './src',
            },
            cwd: 'packagejson',
            loglevel: 'info',
          },
        ],
      ],
      presets: [
        [
          '@babel/preset-react',
          {
            allExtensions: true,
            isTSX: true,
            runtime: 'automatic',
          },
        ],
        [
          '@babel/preset-env',
          {
            // for tree shaking
            targets: {
              node: true,
            },
          },
        ],
        [
          '@babel/preset-typescript',
          {
            allExtensions: true,
            isTSX: true,
          },
        ],
      ],
    },
  },
}
