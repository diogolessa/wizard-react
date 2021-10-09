module.exports = {
  // Global variables to share accross test environment
  globals: {},
  collectCoverageFrom: [
    'lib/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
  coverageDirectory: '../coverage',
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 60,
      statements: 80,
      lines: 60,
    },
  },
  rootDir: 'src',
  modulePaths: ['src'],
  setupFilesAfterEnv: ['<rootDir>/../jest-setup.ts'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(scss|css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
}
