module.exports = {
  testEnvironment: 'jsdom', // Simulate a browser environment
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest', // Use Babel for transforming JS/TSX
  },
  moduleNameMapper: {
    '^config/(.*)$': '<rootDir>/src/config/$1',
    '^@/(.*)$': '<rootDir>/src/$1', // Match Vite's `@` alias
    '^components$': '<rootDir>/src/components/index.js', // Match Vite's `@` alias
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^lib$': '<rootDir>/src/lib/index.js', // Match Vite's `@` alias
    '^lib/(.*)$': '<rootDir>/src/lib/$1',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Jest setup file
  transformIgnorePatterns: ['node_modules/(?!axios)/'],
  prettierPath: '<rootDir>/node_modules/prettier2',
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'text-summary'],

  // Collect coverage only from JS, JSX, and Vue files, and ignore node_modules
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
    '!src/vite-env.d.ts',
    '!src/setupTests.js',
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
};
