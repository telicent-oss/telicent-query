module.exports = {
  testEnvironment: 'jsdom', // Simulate a browser environment
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest', // Use Babel for transforming JS/TSX
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Match Vite's `@` alias
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Jest setup file
  transformIgnorePatterns: ['node_modules/(?!axios)/'],

  collectCoverageFrom: ["**/*.{js,jsx,vue}", "!**/node_modules/**"], // Collect coverage only from JS, JSX, and Vue files, and ignore node_modules
  coverageReporters: [ "text", "text-summary"], // Generate text and text-summary coverage reports
};
