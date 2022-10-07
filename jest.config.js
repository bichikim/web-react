const path = require('path')
process.env.TZ = 'Europe/London'
// for wallaby runtime
module.exports = {
  collectCoverageFrom: [
    '<rootDir>/packages/*/src/**/*.{ts,tsx}',
    '<rootDir>/apps/*/src/**/*.{ts,tsx}',
    '!<rootDir>/**/*.d.ts',
    '!<rootDir>/**/*.stories.{ts,tsx}',
    '!<rootDir>/**/__tests__/*',
    '!<rootDir>/**/__stories__/*',
    '!<rootDir>/**/__mocks__/*',
    '!<rootDir>/**/types/**/*.{ts,tsx}',
  ],

  // maxWorkers: '70%',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'vue', 'json'],

  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/file.mock.ts',
    '\\.svg$': '<rootDir>/__mocks__/svg.mock.ts',
  },
  projects: [
    {
      displayName: 'unit-test',
      globals: {
        __DEV__: true,
      },
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

      // not working
      // snapshotSerializers: ['jest-stitches'],
      testEnvironment: 'jest-environment-jsdom',

      testEnvironmentOptions: {
        url: 'http://localhost/',
      },
      testMatch: [
        '!<rootDir>/**/*.e2e.ts',
        '<rootDir>/packages/*/src/**/__tests__/*.spec.{ts,tsx}',
        '<rootDir>/apps/*/src/**/__tests__/*.spec.{ts,tsx}',
      ],
      transformIgnorePatterns: ['/node_modules/'],
    },
    {
      displayName: 'storybook-test',
      globals: {
        __DEV__: true,
      },

      // not working
      // snapshotSerializers: ['jest-stitches'],
      testEnvironment: '@happy-dom/jest-environment',

      testEnvironmentOptions: {
        url: 'http://localhost/',
      },
      testMatch: ['<rootDir>/storybook.spec.ts'],
      transformIgnorePatterns: ['/node_modules/'],
    },
  ],

  setupFilesAfterEnv: [path.resolve(__dirname, 'jest.setup.ts')],

  // not working
  // snapshotSerializers: ['jest-stitches'],

  // testEnvironment: '@happy-dom/jest-environment',
  testEnvironment: 'jest-environment-node',

  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  testPathIgnorePatterns: [
    '\\.snap$',
    '/node_modules/',
    '(/__tests__/.*|(\\.|/)(test|spec))\\.d.ts$',
  ],

  // https://github.com/facebook/jest/issues/6766

  transform: {
    // '.+\\.(css|styl|less|sass|scss|jpg|jpeg|png|svg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    //   require.resolve('jest-transform-stub'),
    '^.+\\.jsx?$': require.resolve('babel-jest'),
    '^.+\\.tsx?$': require.resolve('babel-jest'),
  },

  transformIgnorePatterns: ['/node_modules/'],
}
