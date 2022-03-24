/* eslint-env node */
module.exports = {
  env: {
    test: {
      plugins: [
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
        ['@babel/preset-react', {
          isTSX: true,
        }],
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
          '@babel/preset-typescript', {
            allExtensions: true,
            isTSX: true,
          },
        ],
      ],
    },
  },
}
